import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/contexts/ThemeContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerStack",
  description: "Created by Ashish Verma",
  openGraph: {
    title: "CareerStack",
    description: "Created by Ashish Verma",
    url: "https://careerstack.vercel.app",
    siteName: "CareerStack",
    images: [
      {
        url: "https://careerstack.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CareerStack Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerStack",
    description: "Created by Ashish Verma",
    images: ["https://careerstack.vercel.app/og-image.png"],
    creator: "@ashishverma_",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      nocache: true,
    },
  },
  keywords: [
    "career",
    "job search",
    "resume builder",
    "cover letter",
    "interview preparation",
    "career advice",
    "job application",
    "career development",
    "job opportunities",
    "career resources",
    "job search tips",
    "resume tips",
    "cover letter tips",
    "interview tips",
    "career coaching",
    "job market",
    "career growth",
    "job search strategies",
    "career planning",
    "job search platform",
    "career tools",
    "job search website",
    "career stack",
  ],
  alternates: {
    canonical: "https://careerstack.vercel.app",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/atom.xml",
      "application/json": "/api/og",
      "application/ld+json": "/api/og",
    },
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
           <SessionProvider>  
         

      <div className="bg-white text-black dark:bg-zinc-900 dark:text-white min-h-screen">
         
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

    
    <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </SessionProvider>
    
      </body>
    </html>
  );
}
