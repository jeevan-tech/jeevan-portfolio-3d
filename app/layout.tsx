import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jeevan Sai Santosh Baliji - Technical Manager Portfolio",
  description: "Premium 3D portfolio showcasing full-stack development, AI integration, and technical leadership experience. Interactive WebGL experience built with React Three Fiber.",
  keywords: ["Technical Manager", "Full Stack Developer", "DevOps", "AI Integration", "React", "Three.js", "WebGL", "Portfolio"],
  authors: [{ name: "Jeevan Sai Santosh Baliji" }],
  creator: "Jeevan Sai Santosh Baliji",
  openGraph: {
    type: "website",
    title: "Jeevan Sai Santosh Baliji - Technical Manager",
    description: "Interactive 3D Portfolio - Technical Manager & Full Stack Developer",
    siteName: "Jeevan Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased overflow-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
