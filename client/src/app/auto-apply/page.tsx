'use client';
import { useState } from 'react';

const BOTS = [
    { id: 1, name: 'LinkedIn Easy Apply Bot', platform: 'LinkedIn', status: 'Running', applied: 47, successRate: '38%', icon: '🔵', lastRun: '12 min ago', target: 'Frontend roles in India' },
    { id: 2, name: 'Naukri Auto-Fill Bot', platform: 'Naukri', status: 'Paused', applied: 23, successRate: '25%', icon: '🟠', lastRun: '3h ago', target: 'Full Stack roles, 5-15 LPA' },
    { id: 3, name: 'Wellfound Startup Bot', platform: 'Wellfound', status: 'Running', applied: 31, successRate: '42%', icon: '🟢', lastRun: '28 min ago', target: 'Startup SDE roles, Remote' },
    { id: 4, name: 'Indeed Quick Apply', platform: 'Indeed', status: 'Stopped', applied: 12, successRate: '20%', icon: '🟣', lastRun: '2 days ago', target: 'QA/Testing roles globally' },
];

const RECENT_APPLIES = [
    { company: 'Flipkart', role: 'SDE-2 Frontend', platform: 'LinkedIn', time: '5 min ago', status: 'Sent' },
    { company: 'Zoho', role: 'Full Stack Dev', platform: 'Naukri', time: '12 min ago', status: 'Sent' },
    { company: 'Atlassian', role: 'React Developer', platform: 'LinkedIn', time: '18 min ago', status: 'Sent' },
    { company: 'Freshworks', role: 'Software Engineer', platform: 'Wellfound', time: '25 min ago', status: 'Sent' },
    { company: 'PhonePe', role: 'Frontend Engineer', platform: 'LinkedIn', time: '32 min ago', status: 'Sent' },
    { company: 'Swiggy', role: 'SDE-1', platform: 'Naukri', time: '45 min ago', status: 'Failed' },
    { company: 'Meesho', role: 'UI Developer', platform: 'Wellfound', time: '1h ago', status: 'Sent' },
    { company: 'Dream11', role: 'React Native Dev', platform: 'LinkedIn', time: '1h ago', status: 'Sent' },
];

const FILTERS = [
    { label: 'Job Title Keywords', value: 'Frontend, Full Stack, React, SDE' },
    { label: 'Location Preference', value: 'Remote, Bangalore, Hybrid' },
    { label: 'Salary Range', value: '₹8 LPA - ₹30 LPA' },
    { label: 'Experience Level', value: '1-5 years' },
    { label: 'Company Size', value: 'Startup, Mid-size, Enterprise' },
    { label: 'Excluded Companies', value: 'None set' },
];

export default function AutoApplyPage() {
    const [globalEnabled, setGlobalEnabled] = useState(true);
    const totalApplied = BOTS.reduce((sum, b) => sum + b.applied, 0);
    const runningBots = BOTS.filter(b => b.status === 'Running').length;

    const getStatusStyle = (s: string) => {
        if (s === 'Running') return 'bg-emerald-100 text-emerald-600';
        if (s === 'Paused') return 'bg-amber-100 text-amber-600';
        return 'bg-zinc-200 text-zinc-500';
    };

    return (
        <div className="p-8 bg-zinc-100 min-h-screen">
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-zinc-900 mb-1 tracking-tight flex items-center gap-3">
                            🤖 Auto-Apply Bots
                        </h1>
                        <p className="text-zinc-500 font-medium">AI bots that auto-apply to matching jobs across multiple platforms.</p>
                    </div>
                    <button
                        onClick={() => setGlobalEnabled(!globalEnabled)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${globalEnabled ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-rose-500/25' : 'bg-zinc-300 text-zinc-600'}`}
                    >
                        {globalEnabled ? '⚡ Bots Active' : '⏸ Bots Paused'}
                    </button>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Total Auto-Applied</h3>
                    <div className="text-4xl font-black text-zinc-900">{totalApplied}</div>
                    <p className="text-xs text-emerald-500 font-bold mt-2">↑ 18 today</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Bots Running</h3>
                    <div className="text-4xl font-black text-emerald-600">{runningBots}</div>
                    <p className="text-xs text-emerald-500 font-bold mt-2">Out of {BOTS.length} configured</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Avg. Success Rate</h3>
                    <div className="text-4xl font-black text-amber-600">31%</div>
                    <p className="text-xs text-amber-500 font-bold mt-2">Callbacks from auto-apps</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Time Saved</h3>
                    <div className="text-4xl font-black text-blue-600">14h</div>
                    <p className="text-xs text-blue-500 font-bold mt-2">This week alone</p>
                </div>
            </div>

            {/* Bots */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <h2 className="text-lg font-black text-zinc-900 mb-5">Configured Bots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {BOTS.map((bot) => (
                        <div key={bot.id} className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-rose-200 hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{bot.icon}</span>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 text-sm">{bot.name}</h4>
                                        <p className="text-[10px] text-zinc-400 font-medium">{bot.platform} · Last run: {bot.lastRun}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${getStatusStyle(bot.status)}`}>
                                    {bot.status === 'Running' ? '● ' : ''}{bot.status}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium mb-3">🎯 Target: {bot.target}</p>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-zinc-600">{bot.applied} applications sent</span>
                                <span className="text-xs font-bold text-emerald-600">{bot.successRate} callback rate</span>
                            </div>
                            <div className="w-full bg-zinc-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full" style={{ width: bot.successRate }} />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 py-2 bg-zinc-200 hover:bg-zinc-300 rounded-lg font-bold text-xs text-zinc-600 transition-colors">
                                    {bot.status === 'Running' ? '⏸ Pause' : '▶ Resume'}
                                </button>
                                <button className="flex-1 py-2 bg-zinc-200 hover:bg-zinc-300 rounded-lg font-bold text-xs text-zinc-600 transition-colors">⚙ Configure</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Live Feed */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-lg font-black text-zinc-900">Live Apply Feed</h2>
                    </div>
                    <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
                        {RECENT_APPLIES.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm ${item.status === 'Failed' ? 'bg-rose-500' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                                    {item.status === 'Failed' ? '✗' : '✓'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-zinc-800">{item.role}</h4>
                                    <p className="text-[10px] text-zinc-400 font-medium">{item.company} · via {item.platform}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'Failed' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{item.status}</span>
                                    <p className="text-[9px] text-zinc-400 mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Filters */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <h2 className="text-lg font-black text-zinc-900 mb-5">Bot Filters & Preferences</h2>
                    <div className="space-y-3">
                        {FILTERS.map((f, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                                <span className="text-sm font-bold text-zinc-600">{f.label}</span>
                                <span className="text-xs font-medium text-zinc-400 bg-zinc-200 px-3 py-1 rounded-lg">{f.value}</span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-5 w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white rounded-xl font-bold text-sm transition-all shadow-sm">
                        ✏️ Edit Filters
                    </button>
                </section>
            </div>

            {/* AI Tip */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <p className="text-sm text-zinc-600 font-medium">
                        💡 <strong className="text-zinc-800">AI Tip:</strong> Your LinkedIn bot has the <strong>highest callback rate (38%)</strong> for frontend roles. Consider increasing its daily limit from 15 to 25 applications for maximum results!
                    </p>
                </div>
            </section>
        </div>
    );
}
