import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WeatherProvider } from "@/contexts/weather-context";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AnimatedClouds } from "@/components/background/animated-clouds";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minh Nguyen | Computer Science Student & Software Engineer",
  description: "Computer Science student at Northeastern University with experience in full-stack development, cybersecurity, and warehouse automation. Based in Boston, MA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <WeatherProvider>
            <AnimatedClouds />
            <ScrollToTop />
            <Header />
            <main className="min-h-screen relative z-10">
              {children}
            </main>
          </WeatherProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
