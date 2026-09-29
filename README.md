# Mohammed Shajith (Mr Techniques) // Personal Portfolio

> **"Moments captured. Products built."**  
> A mobile-first, dark cinematic portfolio for Mohammed Shajith — Cinematographer, Photographer, Video Editor (10 years behind the lens) and BE Artificial Intelligence & Machine Learning Student.

Deploy-ready for [Vercel](https://vercel.com). Built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Google Drive API v3**.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router with 1-hour ISR)
- **Styling**: Tailwind CSS v4 (Cinematic Dark Theme, Glassmorphism, Custom CRT/Film Grain)
- **Animations**: Framer Motion (Camera shutter intro, aperture blade iris, spring cursors, layout transitions)
- **Typography**: `Syne` (display headings), `Inter` (body), `JetBrains Mono` (technical labels & telemetry)
- **Icons**: Lucide React + custom SVG brand icons
- **Data Integrations**:
  - Google Drive API v3 (Server-side only with 1-hour ISR revalidation)
  - GitHub API (Repo stats, stars, languages)
  - Local Skills Dataset (`data/skills.json`)
  - Rich fallback dataset (`src/lib/data.ts`) ensures the website **never breaks** even without API credentials.

---

## 🎨 Design System & Sections

1. **Camera Shutter Intro Loader**:
   - 6-blade aperture iris animation with "10 Years Behind The Lens" badge, sound/flash transition, and skip support (`ESC`).
2. **Hero Section**:
   - Pamidor-style skill list (`Director of Photography • Colorist • Drone Pilot • AI/ML Engineer`).
   - Two-panel split linking to **Creative (Gold)** and **Code (Cyan)**.
3. **Films (`01`)**:
   - Featured cinema player on top with letterbox frame and play trigger.
   - Filter tabs: `All`, `Weddings`, `Events`, `Automotive`, `Edits`.
   - Lazy-loaded Instagram Reel embeds with fast initial thumbnails.
4. **Photos (`02`)**:
   - Masonry layout with category filter tabs.
   - Full-screen lightbox with arrow keys navigation, touch swipe for mobile, and complete EXIF metadata (camera, lens, ISO, aperture, shutter speed).
5. **Software Dossier (`03`)**:
   - Sibaldesign-style numbered dossier cards (`SYS_01`, `SYS_02`).
   - Live demo links, GitHub links, telemetry metrics (FPS, Latency, Accuracy).
6. **Technical Arsenal (`04`)**:
   - Interactive 6-point SVG radar chart.
   - Category tabs (`Languages`, `Frameworks`, `AI/ML`, `Tools`, `Creative Tools`).
   - Two-column skill list where hovering/tapping any row dynamically illuminates and focuses that dimension on the radar.
7. **About & Gear Dossier (`05`)**:
   - Narrative of an AI/ML student who shoots and builds.
   - Equipment dossier: Sony FX3, A7IV, G-Master lenses, DJI RS3 Pro, Mavic 3 Cine, M3 Max rig.
8. **Services (`06`)**:
   - Wedding Films, Automotive Shoots, Event Coverage, Web Apps, AI/ML Prototypes.
   - Deliverables checklist and instant WhatsApp inquiry.
9. **Contact & Transmissions (`07`)**:
   - Primary WhatsApp button, copyable email, Instagram profile link.
   - Commission inquiry form with category dropdown.
10. **Navigation**:
    - Sticky slim top nav on desktop.
    - Mobile bottom floating tab bar with active indicator.

---

## 🛠️ Environment Variables Setup

Create a `.env.local` file (template provided in `.env.example`):

```bash
# Google Drive API v3 (Server-side only, do NOT expose to client)
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key_here
GOOGLE_DRIVE_ROOT_FOLDER_ID=your_portfolio_folder_id_here

# Optional: GitHub Personal Access Token (for higher API rate limits)
GITHUB_TOKEN=your_github_token_here

# Contact & Social Links
CONTACT_EMAIL=techniquesmr@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_INSTAGRAM_HANDLE=mr_techniques
NEXT_PUBLIC_SITE_URL=https://mrtechniques.vercel.app
```

> **Note:** If `GOOGLE_DRIVE_API_KEY` or `GOOGLE_DRIVE_ROOT_FOLDER_ID` is left empty, the site automatically uses high-fidelity curated fallback media so development and deployment run smoothly without configuration.

---

## 📂 How to Manage Content

### 1. Adding Photos via Google Drive
In your Google Drive root folder:
- Create folder `Photos`
- Inside `Photos`, create subfolders: `Weddings`, `Events`, `Automotive`, `Portraits`, `Editorial`
- Upload your high-resolution images (`.jpg`, `.png`, `.webp`)
- Next.js fetches them via Drive API v3, extracts EXIF dimensions, and revalidates every hour (ISR).

### 2. Adding Videos via Google Drive
- Inside your root folder, create a folder named `Videos`.
- Inside `Videos`, create a text file named `videos.txt`.
- Add one entry per line formatted as:
  ```text
  Category | https://www.instagram.com/reel/CODE/ [| Optional Title]
  ```
  Example:
  ```text
  Weddings | https://www.instagram.com/reel/C8qX_9qI4a2/ | Royal Palace Wedding Teaser
  Automotive | https://www.instagram.com/reel/C7oM_01B3vP/ | Porsche GT3 RS Velocity
  Events | https://www.instagram.com/reel/C5iK_77xJkM/ | Sunburn Festival Aftermovie
  Edits | https://www.instagram.com/reel/C3wE_99mKlJ/ | Cyberpunk Tokyo Rhythm
  ```

### 3. Adding Software Projects via Google Drive
- Create folder `Software` in your root folder.
- For each project, create a subfolder (e.g. `Portfolio/Software/cinelens-ai/`).
- Inside each folder, place:
  - Screenshot images (`screenshot-1.png`, etc.)
  - A file named `info.txt` with:
    ```text
    Name: CineLens AI — Neural Color Matcher
    Pitch: Deep learning pipeline that transfers Hollywood 35mm film stock color palettes to digital RAW clips.
    Description: Detailed architectural description...
    Category: AI/ML & Vision
    Tags: PyTorch, OpenCV, Next.js, FastAPI
    Status: PRODUCTION
    GitHub: https://github.com/mrtechniques/cinelens-ai
    Live: https://cinelens-ai-demo.vercel.app
    ```

### 4. Updating Skills & Radar Chart
- Edit `data/skills.json` directly.
- Add or modify skills with: `name`, `category`, `icon`, `level`, `radarKey` (`frontend`, `backend`, `aiml`, `vision`, `cinema`, `post`), `experience`, and `tags`.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle (Turbopack)
npm run build

# Start production server
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to view your portfolio.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In Project Settings > Environment Variables, add:
   - `GOOGLE_DRIVE_API_KEY`
   - `GOOGLE_DRIVE_ROOT_FOLDER_ID`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_INSTAGRAM_HANDLE`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Click **Deploy**. Vercel will build the App Router static bundle with 1-hour ISR revalidation.

---

© 2024 Mohammed Shajith (Mr Techniques). All rights reserved.
