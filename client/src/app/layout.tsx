import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ChatAssistant from '@/components/ChatAssistant';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agentic Job Tracker',
  description: 'AI-powered job application tracker and assistant',
  manifest: '/manifest.json',
  themeColor: '#030712',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 flex min-h-screen relative overflow-hidden`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto w-full h-screen">
          {children}
        </main>

        {/* Global Chat Agent */}
        <ChatAssistant />
      </body>
    </html>
  );
}
