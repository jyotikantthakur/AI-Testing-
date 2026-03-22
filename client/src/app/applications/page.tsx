'use client';
import { useState, useEffect } from 'react';
import { Star, Folder, Phone, Target, Search, Plus, Download, Upload, Settings, MapPin, FileText, IndianRupee, Code, MessageSquare, CheckCircle, XCircle, Mail } from 'lucide-react';
import Link from 'next/link';

// Sunset Ruby Theme Palette
const COLUMNS = [
    { id: 'Wishlist', label: 'WISHLIST', icon: Star, color: 'text-yellow-500', border: 'border-yellow-500/50' },
    { id: 'Applied', label: 'APPLIED', icon: Folder, color: 'text-amber-400', border: 'border-amber-500/50' },
    { id: 'TechUpdate', label: 'TECH UPDATE', icon: Code, color: 'text-orange-400', border: 'border-orange-500/50' },
    { id: 'HREmail', label: 'HR EMAIL', icon: Mail, color: 'text-rose-300', border: 'border-rose-400/50' },
    { id: 'Follow-up', label: 'FOLLOW-UP', icon: Phone, color: 'text-rose-400', border: 'border-rose-500/50' },
    { id: 'InterviewPrep', label: 'INTERVIEW PREP', icon: Target, color: 'text-red-400', border: 'border-red-500/50' },
    { id: 'Feedback', label: 'FEEDBACK', icon: MessageSquare, color: 'text-pink-400', border: 'border-pink-500/50' },
    { id: 'Offer', label: 'OFFER', icon: CheckCircle, color: 'text-emerald-400', border: 'border-emerald-500/50' },
    { id: 'Rejected', label: 'REJECTED', icon: XCircle, color: 'text-zinc-500', border: 'border-zinc-500/50' },
];

interface Application {
    id: string;
    companyName: string;
    jobTitle: string;
    status: string;
    location?: string | null;
    salaryRange?: string | null;
    platform?: string | null;
    resumeTag?: string | null;
    hrEmail?: string | null;
    technology?: string | null;
    feedback?: string | null;
    appliedDate: string;
}

export default function ApplicationsPage() {
    const [apps, setApps] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newApp, setNewApp] = useState({
        companyName: '', jobTitle: '', status: 'Wishlist', location: '', salaryRange: '', platform: 'Direct Match', resumeTag: 'Resume.pdf',
        hrEmail: '', technology: '', feedback: ''
    });

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/applications?userId=guest');
            const data = await res.json();

            const mappedData = data.map((a: any) => ({
                ...a,
                status: ['Bookmarked'].includes(a.status) ? 'Wishlist' : a.status,
                platform: a.location?.toLowerCase().includes('remote') ? 'Global' : (a.platform || 'Direct Match'),
                salaryRange: a.salaryRange || 'TBD',
                location: a.location || 'Not Specified',
                resumeTag: a.resumeTag || 'Resume.pdf',
                hrEmail: a.hrEmail || 'No HR Contact',
                technology: a.technology || 'Full Stack',
                feedback: a.feedback || 'Awaiting response'
            }));

            setApps(mappedData);
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newApp, userId: 'guest', location: newApp.platform })
            });
            const created = await res.json();
            setApps([{ ...created, ...newApp }, ...apps]);
            setIsModalOpen(false);
            setNewApp({ companyName: '', jobTitle: '', status: 'Wishlist', location: '', salaryRange: '', platform: 'Direct Match', resumeTag: 'Resume.pdf', hrEmail: '', technology: '', feedback: '' });
        } catch (error) {
            console.error('Failed to add app', error);
        }
    };

    const handleDragStart = (e: React.DragEvent, id: string) => { e.dataTransfer.setData('appId', id); };
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };
    const handleDrop = async (e: React.DragEvent, newStatus: string) => {
        e.preventDefault();
        const appId = e.dataTransfer.getData('appId');
        setApps(apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
        try {
            await fetch(`http://localhost:3001/api/applications/${appId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
        } catch (error) {
            console.error('Failed to update status', error);
            fetchApps();
        }
    };

    const getTimeAgo = (dateString: string) => {
        const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 3600 * 24));
        if (days === 0) return 'Today';
        if (days < 30) return `${days}d ago`;
        return `${Math.floor(days / 30)}mo ago`;
    }

    const totalActive = apps.length > 0 ? apps.filter(a => a.status !== 'Rejected' && a.status !== 'Offer').length : 38;
    const totalInterviews = apps.length > 0 ? apps.filter(a => a.status === 'InterviewPrep').length : 11;
    const totalOffers = apps.length > 0 ? apps.filter(a => a.status === 'Offer').length : 12;
    const totalRejected = apps.length > 0 ? apps.filter(a => a.status === 'Rejected').length : 10;
    const totalCount = apps.length > 0 ? apps.length : 71;

    if (isLoading) return <div className="p-8 h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">Loading your AI Dashboard...</div>;

    return (
        <div className="flex flex-col h-screen bg-zinc-950">
            {/* Top Bar with new Sunset Ruby theme */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50 flex-shrink-0 backdrop-blur-lg">
                <div className="flex items-center space-x-6">
                    <div>
                        <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2 tracking-wide">
                            <div className="w-8 h-8 rounded-lg outline outline-2 outline-rose-500/50 bg-rose-950/50 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                <CheckCircle className="w-4 h-4 text-rose-400" />
                            </div>
                            Career Board
                        </h1>
                        <p className="text-xs text-zinc-400 font-medium ml-10">{totalCount} total tracking</p>
                    </div>

                    <div className="flex items-center gap-3 scale-95 origin-left ml-6">
                        <div className="px-3.5 py-1.5 rounded-lg bg-orange-950/40 text-orange-400 text-xs font-bold border border-orange-500/30 tracking-wide backdrop-blur-md">
                            {totalActive} Active
                        </div>
                        <div className="px-3.5 py-1.5 rounded-lg bg-rose-950/40 text-rose-400 text-xs font-bold border border-rose-500/30 tracking-wide backdrop-blur-md">
                            {totalInterviews} Interviews
                        </div>
                        <div className="px-3.5 py-1.5 rounded-lg bg-amber-950/40 text-amber-400 text-xs font-bold border border-amber-500/30 tracking-wide backdrop-blur-md">
                            {totalOffers} Offers
                        </div>
                        <div className="px-3.5 py-1.5 rounded-lg bg-zinc-800/40 text-zinc-400 text-xs font-bold border border-zinc-500/30 tracking-wide backdrop-blur-md">
                            {totalRejected} Rejected
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search entries..." className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 w-64 focus:outline-none focus:border-rose-500/70 transition-all shadow-inner" />
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                        <Plus className="w-4 h-4" /> Add Record
                    </button>
                    <div className="flex items-center gap-2 text-zinc-400 ml-2">
                        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
                        <Link href="/resume" className="p-2 hover:bg-zinc-800 rounded-lg text-rose-400 transition-colors" title="Upload AI Resume"><Upload className="w-4 h-4" /></Link>
                        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><Settings className="w-4 h-4" /></button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-x-auto overflow-y-hidden bg-zinc-950 p-6 pt-4">
                    <div className="flex h-full gap-5">
                        {COLUMNS.map((col) => {
                            const colApps = apps.filter(a => a.status === col.id);
                            return (
                                <div
                                    key={col.id}
                                    className="flex flex-col flex-none w-[360px] bg-zinc-900/40 rounded-2xl overflow-hidden border border-zinc-800/80 relative shadow-xl backdrop-blur-sm"
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, col.id)}
                                >
                                    <div className="p-4 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/80 z-10 sticky top-0">
                                        <div className="flex items-center gap-2">
                                            <col.icon className={`w-4 h-4 ${col.color}`} />
                                            <h2 className={`font-black tracking-widest text-xs uppercase ${col.color}`}>{col.label}</h2>
                                            <span className="ml-2 flex items-center justify-center w-6 h-6 rounded bg-zinc-800/80 text-xs font-bold text-zinc-300 border border-zinc-700/50">
                                                {colApps.length}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 pb-8 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                                        {colApps.map((app) => (
                                            <div
                                                key={app.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, app.id)}
                                                className="group bg-zinc-900 p-5 rounded-xl cursor-grab active:cursor-grabbing border border-zinc-800 hover:border-rose-500/40 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_4px_20px_rgba(244,63,94,0.1)]"
                                            >
                                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-80 
                                                    ${col.id === 'Wishlist' ? 'from-yellow-400 to-amber-500' : ''}
                                                    ${col.id === 'Applied' ? 'from-amber-400 to-orange-500' : ''}
                                                    ${col.id === 'TechUpdate' ? 'from-orange-400 to-rose-500' : ''}
                                                    ${col.id === 'HREmail' ? 'from-rose-300 to-rose-400' : ''}
                                                    ${col.id === 'Follow-up' ? 'from-rose-400 to-red-500' : ''}
                                                    ${col.id === 'InterviewPrep' ? 'from-red-400 to-pink-500' : ''}
                                                    ${col.id === 'Feedback' ? 'from-pink-400 to-fuchsia-500' : ''}
                                                    ${col.id === 'Offer' ? 'from-emerald-400 to-green-500' : ''}
                                                    ${col.id === 'Rejected' ? 'from-zinc-500 to-zinc-700' : ''}
                                                `} />

                                                <div className="flex items-center justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/80 border border-zinc-700">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${col.id === 'Wishlist' ? 'bg-yellow-500' : 'bg-orange-500'}`} />
                                                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">{app.platform}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold bg-zinc-800/50 px-2 py-1 rounded border border-zinc-700/50">
                                                        <MapPin className="w-3 h-3 text-zinc-500" />
                                                        {app.location || 'Remote'}
                                                    </div>
                                                </div>

                                                <h4 className="font-bold text-zinc-100 text-lg leading-tight mb-1">{app.companyName}</h4>
                                                <p className="text-sm font-semibold text-rose-400 mb-4">{app.jobTitle}</p>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-zinc-800/40 p-1.5 rounded-md border border-zinc-800">
                                                        <Code className="w-3.5 h-3.5 text-orange-400 ml-1" />
                                                        <span className="truncate">{app.technology}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-zinc-800/40 p-1.5 rounded-md border border-zinc-800">
                                                        <MessageSquare className="w-3.5 h-3.5 text-rose-400 ml-1" />
                                                        <span className="truncate">{app.hrEmail}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-xs text-orange-300 font-semibold shadow-inner">
                                                        <FileText className="w-3.5 h-3.5" />
                                                        {app.resumeTag}
                                                    </div>
                                                    <div className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-950/20 border border-emerald-900/50 rounded text-xs text-emerald-400 font-bold shadow-inner flex-1">
                                                        <IndianRupee className="w-3.5 h-3.5" />
                                                        {app.salaryRange}
                                                    </div>
                                                </div>

                                                {app.status === 'Feedback' && (
                                                    <div className="mb-4 text-xs italic text-rose-300/80 bg-rose-950/20 p-2 rounded border border-rose-900/30">
                                                        "{app.feedback}"
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-center mt-2 pt-3 border-t border-zinc-800 text-xs text-zinc-500 font-bold">
                                                    <span className="bg-zinc-800/80 px-2 py-1 rounded">{getTimeAgo(app.appliedDate)}</span>
                                                    <button className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 transition-colors">
                                                        <Settings className="w-3 h-3" /> Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {colApps.length === 0 && (
                                            <div className="h-28 border border-dashed border-zinc-800 bg-zinc-900/50 rounded-xl flex items-center justify-center text-zinc-600 text-sm font-bold uppercase tracking-widest">
                                                Drop here
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Add Application Modal (Sunset Theme) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center z-[100]">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl relative overflow-hidden">
                        <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 absolute top-0 left-0" />
                        <div className="p-8">
                            <h2 className="text-2xl font-black text-zinc-100 mb-6 flex items-center gap-2">
                                <Plus className="w-6 h-6 text-rose-500" />
                                Add New Record
                            </h2>

                            <form onSubmit={handleAddApplication} className="space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Company</label>
                                        <input required value={newApp.companyName} onChange={e => setNewApp({ ...newApp, companyName: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="E.g. Stripe" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Role</label>
                                        <input required value={newApp.jobTitle} onChange={e => setNewApp({ ...newApp, jobTitle: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="E.g. Senior Dev" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Platform / Origin</label>
                                        <select value={newApp.platform} onChange={e => setNewApp({ ...newApp, platform: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold appearance-none">
                                            <option>LinkedIn</option><option>Wellfound</option><option>Direct Match</option><option>Referral</option><option>Recruiter</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Status Block</label>
                                        <select value={newApp.status} onChange={e => setNewApp({ ...newApp, status: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold appearance-none">
                                            {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">HR Email / Contact</label>
                                        <input value={newApp.hrEmail} onChange={e => setNewApp({ ...newApp, hrEmail: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="hr@company.com..." />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Tech Stack Required</label>
                                        <input value={newApp.technology} onChange={e => setNewApp({ ...newApp, technology: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="React, Node.js..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Location</label>
                                        <input value={newApp.location} onChange={e => setNewApp({ ...newApp, location: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="Remote, NYC..." />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Salary Estimate</label>
                                        <input value={newApp.salaryRange} onChange={e => setNewApp({ ...newApp, salaryRange: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="₹20-25 LPA" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-2">Initial Feedback / Notes</label>
                                    <input value={newApp.feedback} onChange={e => setNewApp({ ...newApp, feedback: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all font-bold" placeholder="Need to prepare for system design..." />
                                </div>

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-zinc-800/80">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-zinc-400 font-bold hover:text-white hover:bg-zinc-800 rounded-lg transition-colors tracking-wide">Cancel</button>
                                    <button type="submit" className="px-8 py-3 bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white rounded-lg font-bold transition-all shadow-lg shadow-rose-500/25 tracking-wide flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Save Record
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
