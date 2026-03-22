'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Briefcase, FileText, Bot,
    MessageSquare, Users, BarChart2, Settings, Target
} from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-zinc-950 h-screen border-r border-zinc-800/60 flex flex-col flex-shrink-0 font-medium overflow-y-auto custom-scrollbar">

            {/* Logo Area */}
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-lg shadow-rose-500/20 px-2">
                        <span className="text-white font-bold text-lg">🤖</span>
                    </div>
                    <div>
                        <h1 className="text-zinc-100 font-bold text-lg tracking-wide leading-tight">Agentic Job AI</h1>
                        <p className="text-xs text-rose-400 font-semibold">AI Tracker</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-8 mt-4">

                {/* TRACKING */}
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3 ml-2">Job Tracking</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/" className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${pathname === '/' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20 shadow-md inset-shadow' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> <span className="text-sm">Dashboard</span></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/applications" className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${pathname === '/applications' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20 shadow-md inset-shadow' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> <span className="text-sm">Active Pipeline</span></div>
                                <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">Live</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* AI TOOLS SECTION */}
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3 ml-2">AI Assistants</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link href="/resume" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${pathname === '/resume' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-orange-500" /> <span className="text-sm">Smart Resumes</span></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/interview-prep" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${pathname === '/interview-prep' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><MessageSquare className="w-4 h-4 text-amber-500" /> <span className="text-sm">Interview Prep Coach</span></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/auto-apply" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${pathname === '/auto-apply' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><Bot className="w-4 h-4 text-rose-400" /> <span className="text-sm">Auto-Apply Bots</span></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/skill-gap" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${pathname === '/skill-gap' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><Target className="w-4 h-4 text-red-500" /> <span className="text-sm">Skill Gap Analyzer</span></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/networking" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${pathname === '/networking' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><Users className="w-4 h-4 text-amber-400" /> <span className="text-sm">Networking Agent</span></div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/mock-interview" className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${pathname === '/mock-interview' ? 'bg-zinc-900 text-rose-400 border border-rose-500/20' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}>
                                <div className="flex items-center gap-3"><Target className="w-4 h-4 text-pink-500" /> <span className="text-sm">Mock Interview</span></div>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">New</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* SYSTEM SECTION */}
                <div>
                    <h3 className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3 ml-2">System</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all">
                                <BarChart2 className="w-4 h-4" /> <span className="text-sm">Analytics</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all">
                                <Settings className="w-4 h-4" /> <span className="text-sm">Agent Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>

            <div className="p-4 border-t border-zinc-800/60 text-xs text-zinc-500 text-center">
                Agentic Job Tracker v1.0
            </div>
        </aside>
    );
}
