import { PhotoItem, VideoItem, ProjectItem } from '@/types';
import { FALLBACK_PHOTOS, FALLBACK_VIDEOS, FALLBACK_PROJECTS } from './data';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webContentLink?: string;
  thumbnailLink?: string;
  modifiedTime?: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
    cameraMake?: string;
    cameraModel?: string;
    focalLength?: number;
    aperture?: number;
    isoSpeed?: number;
    exposureTime?: number;
  };
}

const DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Revalidation interval: 3600s (1 hour ISR)
export const REVALIDATE_TIME = 3600;

async function fetchFromDriveApi(endpoint: string): Promise<any> {
  if (!DRIVE_API_KEY) {
    throw new Error('GOOGLE_DRIVE_API_KEY is not configured');
  }

  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `https://www.googleapis.com/drive/v3/${endpoint}${separator}key=${DRIVE_API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error(`Google Drive API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchDriveFileContent(fileId: string): Promise<string> {
  if (!DRIVE_API_KEY) {
    throw new Error('GOOGLE_DRIVE_API_KEY is not configured');
  }

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${DRIVE_API_KEY}`;
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_TIME },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Drive file content: ${res.status}`);
  }

  return res.text();
}

async function listFolderChildren(folderId: string): Promise<DriveFile[]> {
  const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const fields = encodeURIComponent('files(id, name, mimeType, thumbnailLink, imageMediaMetadata, modifiedTime)');
  const data = await fetchFromDriveApi(`files?q=${query}&fields=${fields}&pageSize=100`);
  return data.files || [];
}

/**
 * Fetch and assemble all photos from Google Drive Portfolio/Photos/{Weddings, Events, Automotive}
 * Falls back gracefully to FALLBACK_PHOTOS if Drive is unreachable.
 */
export async function getPhotos(): Promise<PhotoItem[]> {
  if (!DRIVE_API_KEY || !ROOT_FOLDER_ID) {
    return FALLBACK_PHOTOS;
  }

  try {
    const rootChildren = await listFolderChildren(ROOT_FOLDER_ID);
    const photosFolder = rootChildren.find(
      (f) => f.mimeType === 'application/vnd.google-apps.folder' && f.name.toLowerCase() === 'photos'
    );

    if (!photosFolder) {
      console.warn('[Google Drive] "Photos" folder not found under root folder. Using fallback data.');
      return FALLBACK_PHOTOS;
    }

    const categoryFolders = await listFolderChildren(photosFolder.id);
    const photos: PhotoItem[] = [];

    for (const folder of categoryFolders) {
      if (folder.mimeType !== 'application/vnd.google-apps.folder') continue;

      const categoryName = folder.name; // Weddings, Events, Automotive, Portraits, Editorial
      const files = await listFolderChildren(folder.id);

      for (const file of files) {
        if (!file.mimeType.startsWith('image/')) continue;

        // Drive direct image proxy URL
        const imageUrl = `https://lh3.googleusercontent.com/d/${file.id}=s1600`;
        const meta = file.imageMediaMetadata;

        const categoryMapped = (['Weddings', 'Events', 'Automotive', 'Portraits', 'Editorial'].includes(categoryName)
          ? categoryName
          : 'Events') as PhotoItem['category'];

        photos.push({
          id: file.id,
          url: imageUrl,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          category: categoryMapped,
          width: meta?.width || 1400,
          height: meta?.height || 933,
          camera: meta?.cameraModel || 'Sony FX3 / A7IV',
          focalLength: meta?.focalLength ? `${meta.focalLength}mm` : undefined,
          aperture: meta?.aperture ? `f/${meta.aperture}` : undefined,
          iso: meta?.isoSpeed ? `ISO ${meta.isoSpeed}` : undefined,
          year: file.modifiedTime ? new Date(file.modifiedTime).getFullYear().toString() : '2024',
          caption: `Captured on location with ${meta?.cameraModel || 'Sony Cinema'}.`,
        });
      }
    }

    return photos.length > 0 ? photos : FALLBACK_PHOTOS;
  } catch (error) {
    console.warn('[Google Drive] Error fetching photos:', error);
    return FALLBACK_PHOTOS;
  }
}

/**
 * Fetch videos from Portfolio/Videos/videos.txt (Category | https://www.instagram.com/reel/XXXX/)
 * Falls back gracefully to FALLBACK_VIDEOS.
 */
export async function getVideos(): Promise<VideoItem[]> {
  if (!DRIVE_API_KEY || !ROOT_FOLDER_ID) {
    return FALLBACK_VIDEOS;
  }

  try {
    const rootChildren = await listFolderChildren(ROOT_FOLDER_ID);
    const videosFolder = rootChildren.find(
      (f) => f.mimeType === 'application/vnd.google-apps.folder' && f.name.toLowerCase() === 'videos'
    );

    if (!videosFolder) {
      return FALLBACK_VIDEOS;
    }

    const videoFiles = await listFolderChildren(videosFolder.id);
    const textFile = videoFiles.find((f) => f.name.toLowerCase() === 'videos.txt');

    if (!textFile) {
      return FALLBACK_VIDEOS;
    }

    const rawContent = await fetchDriveFileContent(textFile.id);
    const lines = rawContent.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));

    const videos: VideoItem[] = [];

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      // Format: Category | https://www.instagram.com/reel/XXXX/ [| Title]
      const parts = line.split('|').map((p) => p.trim());
      if (parts.length < 2) continue;

      const rawCategory = parts[0];
      const reelUrl = parts[1];
      const customTitle = parts[2];

      const category = (['Weddings', 'Events', 'Automotive', 'Edits'].includes(rawCategory)
        ? rawCategory
        : 'Weddings') as VideoItem['category'];

      // Extract Instagram Reel Code if present
      const match = reelUrl.match(/reel\/([A-Za-z0-9_-]+)/);
      const reelCode = match ? match[1] : `reel-${index}`;
      const embedUrl = `https://www.instagram.com/reel/${reelCode}/embed`;

      videos.push({
        id: `reel-${reelCode}`,
        title: customTitle || `${category} Reel #${index + 1}`,
        category,
        reelUrl,
        embedUrl,
        thumbnailUrl: `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85`,
        year: '2024',
        isFeatured: index === 0,
      });
    }

    return videos.length > 0 ? videos : FALLBACK_VIDEOS;
  } catch (error) {
    console.warn('[Google Drive] Error fetching videos.txt:', error);
    return FALLBACK_VIDEOS;
  }
}

/**
 * Fetch Software projects from Portfolio/Software/{project-name}
 * Reads info.txt and screenshot images.
 * Also enriches with GitHub API if available.
 */
export async function getSoftwareProjects(): Promise<ProjectItem[]> {
  if (!DRIVE_API_KEY || !ROOT_FOLDER_ID) {
    return FALLBACK_PROJECTS;
  }

  try {
    const rootChildren = await listFolderChildren(ROOT_FOLDER_ID);
    const softwareFolder = rootChildren.find(
      (f) => f.mimeType === 'application/vnd.google-apps.folder' && f.name.toLowerCase() === 'software'
    );

    if (!softwareFolder) {
      return FALLBACK_PROJECTS;
    }

    const projectFolders = await listFolderChildren(softwareFolder.id);
    const projects: ProjectItem[] = [];

    for (const folder of projectFolders) {
      if (folder.mimeType !== 'application/vnd.google-apps.folder') continue;

      const projectFiles = await listFolderChildren(folder.id);
      const infoFile = projectFiles.find((f) => f.name.toLowerCase() === 'info.txt');
      const imageFiles = projectFiles.filter((f) => f.mimeType.startsWith('image/'));

      const screenshots = imageFiles.map((img) => `https://lh3.googleusercontent.com/d/${img.id}=s1600`);

      let name = folder.name.replace(/[-_]/g, ' ');
      let description = 'Full-stack software and machine learning application.';
      let pitch = 'High-performance AI/ML and web architecture.';
      let githubUrl: string | undefined;
      let liveUrl: string | undefined;
      let tags: string[] = ['Next.js', 'TypeScript', 'AI/ML'];
      let status: ProjectItem['status'] = 'PRODUCTION';

      if (infoFile) {
        try {
          const content = await fetchDriveFileContent(infoFile.id);
          const lines = content.split('\n');

          for (const line of lines) {
            const [key, ...val] = line.split(':');
            if (!key || val.length === 0) continue;
            const keyClean = key.trim().toLowerCase();
            const valClean = val.join(':').trim();

            if (keyClean === 'name') name = valClean;
            if (keyClean === 'pitch') pitch = valClean;
            if (keyClean === 'description') description = valClean;
            if (keyClean === 'github') githubUrl = valClean;
            if (keyClean === 'live' || keyClean === 'demo' || keyClean === 'deployment') liveUrl = valClean;
            if (keyClean === 'tags') tags = valClean.split(',').map((t) => t.trim());
            if (keyClean === 'status') status = valClean.toUpperCase() as ProjectItem['status'];
          }
        } catch (e) {
          console.warn(`[Google Drive] Error parsing info.txt for ${folder.name}:`, e);
        }
      }

      // If GitHub link is available, optionally fetch repo language and stars
      let repoStars: number | undefined;
      let repoLanguage: string | undefined;

      if (githubUrl && githubUrl.includes('github.com')) {
        try {
          const repoPath = githubUrl.split('github.com/')[1]?.replace(/\/$/, '');
          if (repoPath) {
            const ghRes = await fetch(`https://api.github.com/repos/${repoPath}`, {
              headers: GITHUB_TOKEN
                ? {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    'User-Agent': 'MrTechniquesPortfolio',
                  }
                : { 'User-Agent': 'MrTechniquesPortfolio' },
              next: { revalidate: REVALIDATE_TIME },
            });
            if (ghRes.ok) {
              const ghData = await ghRes.json();
              repoStars = ghData.stargazers_count;
              repoLanguage = ghData.language;
            }
          }
        } catch {
          // Ignore GitHub API errors
        }
      }

      projects.push({
        id: folder.id,
        slug: folder.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name,
        pitch,
        description,
        tags,
        category: 'AI/ML & Vision',
        screenshots: screenshots.length > 0 ? screenshots : [
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
        ],
        liveUrl,
        githubUrl,
        status,
        stars: repoStars,
        language: repoLanguage || tags[0],
        updatedYear: '2024',
      });
    }

    return projects.length > 0 ? projects : FALLBACK_PROJECTS;
  } catch (error) {
    console.warn('[Google Drive] Error fetching software projects:', error);
    return FALLBACK_PROJECTS;
  }
}
