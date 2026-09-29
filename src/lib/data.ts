import { PhotoItem, VideoItem, ProjectItem, ServiceItem, GearItem } from '@/types';

// Curated high-aesthetic fallback photos representing 10 years of professional craft
export const FALLBACK_PHOTOS: PhotoItem[] = [
  {
    id: 'ph-1',
    title: 'The Royal Heritage Vows',
    category: 'Weddings',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'Udaipur Palace, Rajasthan',
    year: '2024',
    camera: 'Sony FX3',
    lens: 'Sony FE 50mm f/1.2 GM',
    focalLength: '50mm',
    aperture: 'f/1.4',
    iso: '160',
    shutterSpeed: '1/1000s',
    caption: 'Sunset ceremonial rituals captured during golden hour with natural rim lighting.',
  },
  {
    id: 'ph-2',
    title: 'Midnight Porsche GT3 RS in Tokyo Rain',
    category: 'Automotive',
    url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'Shibuya Crossing, Tokyo',
    year: '2024',
    camera: 'Sony A7IV',
    lens: 'Sony FE 24-70mm f/2.8 GM II',
    focalLength: '35mm',
    aperture: 'f/2.8',
    iso: '800',
    shutterSpeed: '1/160s',
    caption: 'Long exposure wet tarmac reflections with neon street lamps illuminating aerodynamic carbon wings.',
  },
  {
    id: 'ph-3',
    title: 'Echoes of the Neon Arena',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'Sunburn Arena, Goa',
    year: '2023',
    camera: 'Sony FX3',
    lens: 'Sony FE 16-35mm f/2.8 GM',
    focalLength: '18mm',
    aperture: 'f/2.8',
    iso: '2500',
    shutterSpeed: '1/320s',
    caption: 'Peak drop pyrotechnics and laser grid sweeping through an audience of 15,000.',
  },
  {
    id: 'ph-4',
    title: 'Silhouettes in Tuscan Lavender',
    category: 'Weddings',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 1750,
    location: 'Val d’Orcia, Italy',
    year: '2023',
    camera: 'Sony A7IV',
    lens: 'Sony FE 85mm f/1.4 GM',
    focalLength: '85mm',
    aperture: 'f/1.8',
    iso: '100',
    shutterSpeed: '1/2000s',
    caption: 'Intimate pre-wedding portrait framing the couple against rolling cypress hills.',
  },
  {
    id: 'ph-5',
    title: 'Matte Black R35 GTR Rolling Shot',
    category: 'Automotive',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'Dubai Marina Highway',
    year: '2024',
    camera: 'Sony FX3',
    lens: 'Sony FE 35mm f/1.4 GM',
    focalLength: '35mm',
    aperture: 'f/4.0',
    iso: '100',
    shutterSpeed: '1/40s',
    caption: 'Dynamic vehicle tracking rig shot showing wheel spin blur at 90 km/h.',
  },
  {
    id: 'ph-6',
    title: 'Candid Haldi Joy & Marigold Shower',
    category: 'Weddings',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'Bengaluru, India',
    year: '2024',
    camera: 'Sony A7IV',
    lens: 'Sony FE 35mm f/1.4 GM',
    focalLength: '35mm',
    aperture: 'f/2.0',
    iso: '320',
    shutterSpeed: '1/1250s',
    caption: 'Explosion of turmeric yellow, authentic laughter, and frozen floral droplets.',
  },
  {
    id: 'ph-7',
    title: 'Monochrome Gaze & Chiaroscuro',
    category: 'Portraits',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 1750,
    location: 'Studio Technics, Chennai',
    year: '2024',
    camera: 'Sony A7IV',
    lens: 'Sony FE 85mm f/1.4 GM',
    focalLength: '85mm',
    aperture: 'f/1.4',
    iso: '100',
    shutterSpeed: '1/500s',
    caption: 'Rembrandt lighting profile focused on raw emotive reflection.',
  },
  {
    id: 'ph-8',
    title: 'Superleggera Carbon Diffuser Detail',
    category: 'Automotive',
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'Monza Circuit, Italy',
    year: '2023',
    camera: 'Sony A7IV',
    lens: 'Sony FE 90mm f/2.8 Macro G OSS',
    focalLength: '90mm',
    aperture: 'f/2.8',
    iso: '200',
    shutterSpeed: '1/800s',
    caption: 'Precision carbon weave texture and titanium exhaust blue heat gradient.',
  },
  {
    id: 'ph-9',
    title: 'Tech Summit Keynote Spotlight',
    category: 'Events',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 933,
    location: 'International Tech Expo',
    year: '2024',
    camera: 'Sony FX3',
    lens: 'Sony FE 70-200mm f/2.8 GM OSS II',
    focalLength: '135mm',
    aperture: 'f/2.8',
    iso: '1600',
    shutterSpeed: '1/400s',
    caption: 'Audience immersion and speaker silhouette in a cavernous presentation hall.',
  },
  {
    id: 'ph-10',
    title: 'Vintage Vogue Editorial',
    category: 'Editorial',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    width: 1400,
    height: 1750,
    location: 'Fort Kochi, Kerala',
    year: '2023',
    camera: 'Sony A7IV',
    lens: 'Sony FE 50mm f/1.2 GM',
    focalLength: '50mm',
    aperture: 'f/1.8',
    iso: '125',
    shutterSpeed: '1/1600s',
    caption: 'Textured linen drape styling with organic daylight bounce.',
  }
];

// Curated fallback video reels showcasing Instagram Reels embed capability
export const FALLBACK_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Advaith & Meera // Royal Palace Wedding Film',
    category: 'Weddings',
    reelUrl: 'https://www.instagram.com/reel/C8qX_9qI4a2/',
    embedUrl: 'https://www.instagram.com/reel/C8qX_9qI4a2/embed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    duration: '2:45',
    year: '2024',
    location: 'Jaipur, India',
    client: 'Private Commission',
    description: 'Cinematic 4K S-Log3 wedding teaser graded in DaVinci Resolve with custom film emulation LUTs.',
    isFeatured: true,
  },
  {
    id: 'vid-2',
    title: 'Porsche 911 GT3 RS: Aerodynamic Velocity',
    category: 'Automotive',
    reelUrl: 'https://www.instagram.com/reel/C7oM_01B3vP/',
    embedUrl: 'https://www.instagram.com/reel/C7oM_01B3vP/embed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    duration: '0:58',
    year: '2024',
    location: 'Bicocca Test Track',
    client: 'AutoStyle Magazine',
    description: 'High-speed tracking gimbal footage combined with FPV drone fly-throughs and sound-designed exhaust notes.',
    isFeatured: false,
  },
  {
    id: 'vid-3',
    title: 'Sunburn Arena 2024: Aftermovie Teaser',
    category: 'Events',
    reelUrl: 'https://www.instagram.com/reel/C5iK_77xJkM/',
    embedUrl: 'https://www.instagram.com/reel/C5iK_77xJkM/embed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    duration: '1:15',
    year: '2024',
    location: 'Goa',
    client: 'Sunburn Festival',
    description: 'Electric atmosphere cut to rhythm with speed ramps, optical flow transitions, and reactive typography.',
    isFeatured: false,
  },
  {
    id: 'vid-4',
    title: 'BMW M4 Competition // Urban Night Crawl',
    category: 'Automotive',
    reelUrl: 'https://www.instagram.com/reel/C6yN_5pxOpT/',
    embedUrl: 'https://www.instagram.com/reel/C6yN_5pxOpT/embed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
    duration: '0:45',
    year: '2023',
    location: 'Hyderabad Express',
    client: 'M Performance Club',
    description: 'Low-light anamorphic lens flare simulation, harsh neon contrasts, and turbo spool Foley sound design.',
    isFeatured: false,
  },
  {
    id: 'vid-5',
    title: 'Rhythm of Heritage: South Indian Bridal Symphony',
    category: 'Weddings',
    reelUrl: 'https://www.instagram.com/reel/C4zQ_33vAbC/',
    embedUrl: 'https://www.instagram.com/reel/C4zQ_33vAbC/embed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    duration: '1:50',
    year: '2023',
    location: 'Madurai, Tamil Nadu',
    client: 'Private Couple',
    description: 'Slow-motion 120fps temple rituals, silk saree textures, and gold jewelry macro detailing.',
    isFeatured: false,
  },
  {
    id: 'vid-6',
    title: 'Cyberpunk Tokyo: Visual Rhythm Re-Edit',
    category: 'Edits',
    reelUrl: 'https://www.instagram.com/reel/C3wE_99mKlJ/',
    embedUrl: 'https://www.instagram.com/reel/C3wE_99mKlJ/embed',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=85',
    duration: '0:35',
    year: '2024',
    location: 'Personal Project',
    client: 'Mr Techniques Lab',
    description: 'Experimental pacing edit featuring glitch shaders, datamoshing artifacts, and multi-track spatial audio.',
    isFeatured: false,
  }
];

// Curated software projects by Mohammed Shajith (AI/ML Student & Full-Stack Developer)
export const FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    slug: 'cine-lens-ai',
    name: 'CineLens AI — Neural Color Matcher',
    pitch: 'Deep learning pipeline that transfers Hollywood 35mm film stock color palettes to digital RAW clips.',
    description: 'An AI-powered computer vision tool built for cinematographers and colorists. Employs a neural style transfer and 3D LUT regression network to analyze reference frames (Kodak 5219, Fuji 8543) and match lighting, skin-tone isolation, and grain distribution across camera bodies (Sony S-Log3, Arri LogC).',
    category: 'AI/ML & Vision',
    tags: ['PyTorch', 'OpenCV', 'FastAPI', 'Next.js', 'DaVinci Resolve API', 'WebGL'],
    screenshots: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://cinelens-ai-demo.vercel.app',
    githubUrl: 'https://github.com/mrtechniques/cinelens-ai',
    status: 'PRODUCTION',
    language: 'Python / TypeScript',
    updatedYear: '2024',
    metrics: [
      { label: 'Latency', value: '42ms' },
      { label: 'LUT Accuracy', value: '99.4%' },
      { label: 'Color Gamut', value: 'ACEScc' }
    ]
  },
  {
    id: 'proj-2',
    slug: 'apex-track-telemetry',
    name: 'ApexVision — Automotive Telemetry & Object Tracker',
    pitch: 'Real-time vehicle detection, velocity estimation, and track telemetry overlay for racing cameras.',
    description: 'Trained on custom annotated racetrack datasets using YOLOv8 and ByteTrack. Detects racing apex angles, drift yaw rates, and vehicle trajectories from drone/trackside cameras, dynamically generating broadcast-ready HUD telemetry overlays.',
    category: 'AI/ML & Vision',
    tags: ['YOLOv8', 'Python', 'OpenCV', 'TensorRT', 'Streamlit', 'Docker'],
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://apexvision-telemetry.streamlit.app',
    githubUrl: 'https://github.com/mrtechniques/apex-vision-tracker',
    status: 'RESEARCH',
    language: 'Python',
    updatedYear: '2024',
    metrics: [
      { label: 'Inference', value: '60 FPS' },
      { label: 'mAP@50', value: '94.2%' },
      { label: 'Tracking IDs', value: 'Zero Switch' }
    ]
  },
  {
    id: 'proj-3',
    slug: 'drive-vault-cms',
    name: 'DriveVault — Serverless Media Engine',
    pitch: 'High-speed media portfolio CMS leveraging Google Drive API with automatic image optimization & ISR.',
    description: 'An open-source media delivery architecture designed for high-resolution creators. Syncs directly with Google Drive folders, automatically extracts metadata, generates WebP blur placeholders, and handles edge revalidation without expensive third-party storage fees.',
    category: 'Full Stack Web',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Google Drive v3', 'Vercel Edge'],
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    liveUrl: 'https://drivevault-demo.vercel.app',
    githubUrl: 'https://github.com/mrtechniques/drivevault-cms',
    status: 'PRODUCTION',
    language: 'TypeScript',
    updatedYear: '2024',
    metrics: [
      { label: 'PageSpeed', value: '99/100' },
      { label: 'Edge Cache', value: '1hr ISR' },
      { label: 'Cost', value: '$0/mo' }
    ]
  },
  {
    id: 'proj-4',
    slug: 'neuro-culling-suite',
    name: 'NeuroCull — Wedding Photo AI Assistant',
    pitch: 'Automated 10,000+ RAW wedding shoot curation using face sharpness and smile detection.',
    description: 'Culling 8,000-12,000 photos from a 3-day wedding used to take 20 hours. NeuroCull clusters burst sequences, detects closed eyes, verifies tack-sharp eye focus at 100% crop, and ranks the best emotional expressions automatically.',
    category: 'Creative Automation',
    tags: ['PyTorch', 'MediaPipe', 'Electron', 'React', 'LibRaw', 'C++'],
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com/mrtechniques/neuro-cull-assistant',
    status: 'PROTOTYPE',
    language: 'Python / C++',
    updatedYear: '2024',
    metrics: [
      { label: 'Time Saved', value: '75%' },
      { label: 'Throughput', value: '350 RAW/min' }
    ]
  }
];

// Services offered by Mohammed Shajith
export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Cinematic Wedding Films',
    category: 'creative',
    tagline: 'Emotional, narrative-driven 4K wedding films with Hollywood color grading.',
    description: 'Full-day coverage using dual Sony cinema bodies, audio masters, drone panoramas, and customized music scoring. Edited with emotional cadence that makes you re-live the tears and euphoria.',
    deliverables: [
      '4K Cinematic Teaser (60-90s Reel)',
      '10-15 Min Feature Film Documentary',
      'Full Multi-Cam Rituals & Speeches',
      'DaVinci Resolve Aces Color Master',
      'Custom USB Vault & Cloud Drive'
    ],
    turnaround: '3 to 4 Weeks',
    accent: 'gold',
    popular: true,
  },
  {
    id: 'srv-2',
    title: 'Automotive & Commercial Films',
    category: 'creative',
    tagline: 'Adrenaline-pumping rolling shots, brand storytelling, and trackside action.',
    description: 'Dynamic automotive videography with dedicated camera-car chasing rigs, FPV drones, and sound design that amplifies every throttle roar and turbo flutter.',
    deliverables: [
      'Commercial Promo (16:9 4K + 9:16 Vertical)',
      'Rolling Rig Photography & Motion Stills',
      'High-Speed Tracking & Drone Perspectives',
      'Custom Sound Design & Foley Mixing'
    ],
    turnaround: '7 to 10 Days',
    accent: 'red',
  },
  {
    id: 'srv-3',
    title: 'High-Impact Event Coverage',
    category: 'creative',
    tagline: 'Music festivals, private galas, corporate summits, and cultural shows.',
    description: 'Fast-turnaround event photography and aftermovie production. We capture electric crowd reactions, VIP moments, stage lighting, and keynote speeches with broadcast crispness.',
    deliverables: [
      'Same-Day / Next-Day Social Media Highlights',
      'Full 4K Cinematic Aftermovie',
      'Color-Corrected High-Res Photo Gallery',
      'Full Rights for Commercial PR'
    ],
    turnaround: '48 Hours (Express available)',
    accent: 'red',
  },
  {
    id: 'srv-4',
    title: 'Modern Web Apps & Creator Portfolios',
    category: 'software',
    tagline: 'Ultra-fast Next.js platforms crafted with cinematic aesthetics and 60fps animations.',
    description: 'Custom digital experiences built with Next.js App Router, Tailwind CSS, TypeScript, and serverless architectures. Optimized for Lighthouse 95+ performance, SEO rankings, and instant mobile load.',
    deliverables: [
      'Full-Stack Next.js 15 Web Application',
      'Automated Drive or CMS Integration',
      'Framer Motion & Fluid Micro-Interactions',
      'Global Vercel CDN Edge Deployment',
      'Technical SEO & Open Graph Setup'
    ],
    turnaround: '10 to 14 Days',
    accent: 'blue',
    popular: true,
  },
  {
    id: 'srv-5',
    title: 'Custom AI/ML & Computer Vision Prototypes',
    category: 'software',
    tagline: 'Neural models, image processing engines, and intelligent web agents.',
    description: 'Harness deep learning, object tracking, and automated image pipelines to solve proprietary business problems. Built with PyTorch, OpenCV, and FastAPI edge APIs.',
    deliverables: [
      'Trained & Quantized ML Models',
      'FastAPI REST Microservice & Docker Image',
      'Interactive Streamlit / React Web Demo',
      'Documentation & Architecture Blueprint'
    ],
    turnaround: '2 to 3 Weeks',
    accent: 'blue',
  }
];

// Equipment dossier ("Behind the Craft")
export const GEAR_DOSSIER: GearItem[] = [
  {
    category: 'Camera Bodies',
    description: 'Full-frame dual ISO cinema sensors capable of 15+ stops dynamic range in S-Log3.',
    items: [
      { name: 'Sony FX3 Cinema Line', details: 'Full-frame 4K 120p, 10-bit 4:2:2, Active Cooling', badge: 'Primary Cinema' },
      { name: 'Sony A7IV', details: '33MP Hybrid BSI Sensor, 10-bit S-Cinetone, Dual Slots', badge: 'Primary Stills & B-Cam' }
    ]
  },
  {
    category: 'Glass & Optics (G-Master)',
    description: 'Ultra-sharp f/1.2 & f/1.4 primes combined with versatile f/2.8 zoom reach.',
    items: [
      { name: 'Sony FE 50mm f/1.2 GM', details: 'Extreme low-light bokeh, tack-sharp wide open', badge: 'Portraits & Vows' },
      { name: 'Sony FE 24-70mm f/2.8 GM II', details: 'Super fast dual XD linear autofocus, lightweight', badge: 'Run & Gun' },
      { name: 'Sony FE 35mm f/1.4 GM', details: 'Documentary environmental storytelling favorite', badge: 'Automotive & Street' },
      { name: 'Sony FE 70-200mm f/2.8 GM OSS II', details: 'Internal zoom, stunning compression and reach', badge: 'Ceremonies & Track' }
    ]
  },
  {
    category: 'Stabilization & Aerial',
    description: 'Rock-solid gimbal tracking and FAA/DGCA compliant aerial perspectives.',
    items: [
      { name: 'DJI RS 3 Pro Gimbal', details: 'Carbon fiber arms, automated axis locks, LiDAR focus support', badge: 'Smooth Tracking' },
      { name: 'DJI Mavic 3 Pro Cine', details: 'Triple camera system, Apple ProRes, 43min flight time', badge: 'Aerial Vista' },
      { name: 'Custom 5-inch FPV Quad', details: 'GoPro Bones mounted, high-speed chase capability', badge: 'High Velocity' }
    ]
  },
  {
    category: 'Lighting & Studio Audio',
    description: 'Broadcast 32-bit float audio backup and wireless bi-color cinema lights.',
    items: [
      { name: 'Aputure Amaran 200x Bi-Color', details: 'Bowens mount, wireless Sidus Link mesh control', badge: 'Key Lighting' },
      { name: 'Røde Wireless PRO', details: '32-bit float onboard recording, timecode sync', badge: 'Zero Clipping Audio' },
      { name: 'Sennheiser MKE 600', details: 'Pro shotgun mic with supercardioid pickup', badge: 'Ambient Foley' }
    ]
  },
  {
    category: 'Computing & Neural Rig',
    description: 'High-speed hardware for 4K 10-bit multi-cam scrub and neural network training.',
    items: [
      { name: 'MacBook Pro M3 Max', details: '16-core CPU, 40-core GPU, 64GB Unified Memory', badge: 'On-Location Grading' },
      { name: 'Custom Deep Learning Workstation', details: 'AMD Ryzen 9, NVIDIA RTX 4090 24GB, 64GB DDR5', badge: 'Model Training & VFX' }
    ]
  }
];
