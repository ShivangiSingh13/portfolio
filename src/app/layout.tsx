import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Shivangi Singh | Full-Stack, AI/ML & Data Science Portfolio",
  description:
    "Portfolio of Shivangi Singh, a B.Tech CSE student building full-stack, AI/ML, and data science projects.",
  keywords: [
    "Shivangi Singh",
    "Portfolio",
    "Full-Stack Developer",
    "AI/ML",
    "Data Science",
    "MERN",
    "B.Tech CSE",
  ],
  openGraph: {
    title: "Shivangi Singh | Full-Stack, AI/ML & Data Science Portfolio",
    description:
      "Explore projects, skills, certifications, and coding profiles across full-stack development, AI/ML, and data science.",
    url: "/",
    siteName: "Shivangi Singh Portfolio",
    images: [
      {
        url: "/shivangi-profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Shivangi Singh Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivangi Singh | Full-Stack, AI/ML & Data Science Portfolio",
    description:
      "Explore projects, skills, certifications, and coding profiles across full-stack development, AI/ML, and data science.",
    images: ["/shivangi-profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${sora.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
