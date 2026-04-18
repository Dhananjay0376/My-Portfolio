import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AskSolutionBuilder } from "@/components/chat/AskSolutionBuilder";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AmbientCanvas } from "@/components/layout/AmbientCanvas";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { CustomCursor } from "@/components/layout/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Solution Builder | Architectural Mastery",
    template: "%s | Solution Builder",
  },
  description: "I engineer high-performance systems and cinematic digital experiences that redefine the boundaries of the web.",
  keywords: ["Full-stack Developer", "Next.js 15", "Architect", "AI Systems", "WebGL"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.com",
    siteName: "Solution Builder Portfolio",
    title: "Solution Builder | Architectural Mastery",
    description: "Engineering high-performance systems and cinematic digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solution Builder | Architectural Mastery",
    description: "Engineering high-performance systems and cinematic digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <AmbientCanvas />
            <FloatingNav />
            <CustomCursor />
            <ScrollProgress />
            {children}
            <AskSolutionBuilder />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
