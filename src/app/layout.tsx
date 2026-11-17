import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/common/CustomCursor";
import FilmGrainOverlay from "@/components/common/FilmGrainOverlay";
import { ThemeProvider } from "@/context/ThemeContext";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mrtechniques.vercel.app"),
  title: {
    default: "Mohammed Shajith (Mr Techniques) | Filmmaker, Photographer & AI/ML Engineer",
    template: "%s | Mohammed Shajith • Mr Techniques",
  },
  description:
    "10 years behind the lens and in the code terminal. Portfolio of Mohammed Shajith (Mr Techniques) — Wedding & Automotive Cinematographer, Commercial Photographer, and AI&ML Software Developer.",
  keywords: [
    "Mohammed Shajith",
    "Mr Techniques",
    "Cinematographer",
    "Wedding Films",
    "Automotive Photography",
    "AI ML Developer",
    "Next.js Developer",
    "Creative Director",
    "Video Editor",
    "DaVinci Resolve Colorist",
    "Full Stack Developer",
  ],
  authors: [{ name: "Mohammed Shajith", url: "https://instagram.com/mr_techniques" }],
  creator: "Mohammed Shajith",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mrtechniques.vercel.app",
    title: "Mohammed Shajith (Mr Techniques) — Moments captured. Products built.",
    description:
      "10 years of visual storytelling across cinema, weddings, and automotive, fused with modern AI/ML software engineering.",
    siteName: "Mohammed Shajith • Mr Techniques",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Shajith (Mr Techniques) Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Shajith (Mr Techniques) — Filmmaker & AI/ML Engineer",
    description: "Moments captured. Products built. 10 years behind the lens & in the terminal.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Person & ProfessionalService
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Shajith",
    alternateName: "Mr Techniques",
    url: "https://mrtechniques.vercel.app",
    jobTitle: ["Cinematographer", "Photographer", "Software Engineer", "AI/ML Researcher"],
    sameAs: [
      "https://instagram.com/mr_techniques",
      "https://github.com/mrtechniques",
    ],
    knowsAbout: [
      "Cinematography",
      "Color Grading",
      "Wedding Filmmaking",
      "Automotive Photography",
      "Deep Learning",
      "Computer Vision",
      "Next.js",
      "TypeScript",
      "Python",
    ],
    description:
      "Filmmaker, Photographer, and AI/ML Engineer with a decade of expertise behind the lens.",
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#08080b] text-[#f4f4f7] selection:bg-cyan-500/30 selection:text-white antialiased">
        <ThemeProvider>
          <FilmGrainOverlay />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
