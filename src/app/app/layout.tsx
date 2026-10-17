import React from "react";
import { AppSidebar } from "@/components/app/AppSidebar";

export default function StudentAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#111111] text-neutral-900 dark:text-white flex flex-col lg:flex-row transition-colors">
      {/* Persistent Sidebar */}
      <AppSidebar />

      {/* Main App Content Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
