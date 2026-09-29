import { getPhotos, getVideos, getSoftwareProjects } from '@/lib/drive';
import { getSkillsData } from '@/lib/skills';
import PortfolioHome from '@/components/PortfolioHome';

// 1 Hour ISR (Incremental Static Regeneration)
export const revalidate = 3600;

export default async function Home() {
  // Concurrently fetch all drive data server-side
  const [photos, videos, projects] = await Promise.all([
    getPhotos(),
    getVideos(),
    getSoftwareProjects(),
  ]);

  const skillsData = getSkillsData();

  return (
    <PortfolioHome
      photos={photos}
      videos={videos}
      projects={projects}
      skillsData={skillsData}
    />
  );
}
