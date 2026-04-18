import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AskSolutionBuilder } from "@/components/chat/AskSolutionBuilder";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Solution Builder | Premium Full-Stack Portfolio",
    template: "%s | Solution Builder",
  },
  description: "I turn complex ideas into production-ready web apps, real-time systems, and AI-powered tools. Exploring the intersection of design and high-performance engineering.",
  keywords: ["Full-stack Developer", "Next.js 15", "React Three Fiber", "AI Solution Builder", "Greater Noida Developer"],
  authors: [{ name: "Solution Builder" }],
  creator: "Solution Builder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.com",
    siteName: "Solution Builder Portfolio",
    title: "Solution Builder | Premium Full-Stack Portfolio",
    description: "I turn complex ideas into production-ready web apps, real-time systems, and AI-powered tools.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solution Builder Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solution Builder | Premium Full-Stack Portfolio",
    description: "I turn complex ideas into production-ready web apps, real-time systems, and AI-powered tools.",
    images: ["/og-image.png"],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <AskSolutionBuilder />
        </ThemeProvider>
      </body>
    </html>
  );
}
