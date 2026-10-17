import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { CelebrationModal } from "@/components/ui/CelebrationModal";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vezei.com"),
  title: "VEZEI — One App. Every Exam. Your Path to Success.",
  description:
    "AI-powered competitive examination preparation & gamified learning platform. Prepare for CAT, GATE, GMAT, GRE, JEE, NEET, and global exams with personalized adaptive practice, AI tutor, and active streaks.",
  keywords: [
    "VEZEI",
    "EdTech",
    "CAT prep",
    "GATE computer science",
    "GMAT focus",
    "AI tutor",
    "gamified exam prep",
    "competitive exams",
    "mock tests",
  ],
  authors: [{ name: "VEZEI Learning Technologies" }],
  openGraph: {
    title: "VEZEI — One App. Every Exam. Your Path to Success.",
    description: "Your exams. Your rules. Your victory. Turn preparation into progress with AI-guided practice.",
    url: "https://vezei.com",
    siteName: "VEZEI",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "VEZEI Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo-mark.jpeg",
    apple: "/logo-mark.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('vezei_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'light' || (!saved && !prefersDark)) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#C8FF3D] selection:text-[#111111]">
        <AppProvider>
          <LanguageProvider>
            {children}
            <CelebrationModal />
          </LanguageProvider>
        </AppProvider>
      </body>
    </html>
  );
}
