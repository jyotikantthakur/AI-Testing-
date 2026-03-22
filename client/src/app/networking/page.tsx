'use client';
import { useState } from 'react';

const CONNECTIONS = [
    { id: 1, name: 'Priya Sharma', role: 'Engineering Manager', company: 'Google', platform: 'LinkedIn', status: 'Warm', lastContact: '2 days ago', avatar: '🙋‍♀️', notes: 'Referred me to frontend team' },
    { id: 2, name: 'Alex Chen', role: 'Senior Recruiter', company: 'Stripe', platform: 'Email', status: 'Active', lastContact: '1 day ago', avatar: '👨‍💼', notes: 'Scheduling final round' },
    { id: 3, name: 'Rahul Verma', role: 'Tech Lead', company: 'Razorpay', platform: 'Twitter/X', status: 'New', lastContact: '5 days ago', avatar: '👨‍💻', notes: 'Met at a meetup, interested in my portfolio' },
    { id: 4, name: 'Sarah Johnson', role: 'VP Engineering', company: 'Netflix', platform: 'LinkedIn', status: 'Cold', lastContact: '3 weeks ago', avatar: '👩‍💻', notes: 'Connected but no response yet' },
    { id: 5, name: 'Vikram Patel', role: 'CTO', company: 'Startup XYZ', platform: 'Referral', status: 'Warm', lastContact: '4 days ago', avatar: '🧑‍💼', notes: 'Friend of a friend, open to chat' },
    { id: 6, name: 'Emily Davis', role: 'HR Director', company: 'Meta', platform: 'Email', status: 'Active', lastContact: 'Today', avatar: '👩‍🦰', notes: 'Sent interview prep resources' },
];

const SUGGESTED_ACTIONS = [
    { type: 'follow-up', icon: '📧', title: 'Follow up with Sarah Johnson', subtitle: 'Netflix — No reply in 3 weeks', urgency: 'HIGH' },
    { type: 'connect', icon: '🤝', title: 'Connect with 2 new engineers at Stripe', subtitle: 'AI found 2 mutual connections', urgency: 'MEDIUM' },
    { type: 'thank', icon: '🙏', title: 'Send thank-you to Priya Sharma', subtitle: 'Google referral completed yesterday', urgency: 'HIGH' },
    { type: 'engage', icon: '💬', title: 'Comment on Rahul\'s latest post', subtitle: 'He posted about React performance tips', urgency: 'LOW' },
    { type: 'reach', icon: '🎯', title: 'Reach out to Amazon hiring manager', subtitle: 'Found via 2nd-degree LinkedIn connection', urgency: 'MEDIUM' },
];

const TEMPLATES = [
    { id: 1, name: 'Cold Outreach', desc: 'First-time message to hiring managers', icon: '❄️' },
    { id: 2, name: 'Follow-Up', desc: 'Polite nudge after no response', icon: '🔄' },
    { id: 3, name: 'Thank You', desc: 'Post-interview or referral gratitude', icon: '🙏' },
    { id: 4, name: 'Referral Ask', desc: 'Request from mutual connections', icon: '🤝' },
    { id: 5, name: 'Informational Chat', desc: 'Coffee chat request to learn about a role', icon: '☕' },
];

export default function NetworkingPage() {
    const [filter, setFilter] = useState('All');

    const getStatusBadge = (s: string) => {
        if (s === 'Active') return 'bg-emerald-100 text-emerald-600';
        if (s === 'Warm') return 'bg-amber-100 text-amber-600';
        if (s === 'New') return 'bg-blue-100 text-blue-600';
        return 'bg-zinc-200 text-zinc-500';
    };

    const getUrgencyBadge = (u: string) => {
        if (u === 'HIGH') return 'bg-rose-100 text-rose-600 border-rose-200';
        if (u === 'MEDIUM') return 'bg-amber-100 text-amber-600 border-amber-200';
        return 'bg-zinc-100 text-zinc-500 border-zinc-200';
    };

    const filteredConnections = filter === 'All' ? CONNECTIONS : CONNECTIONS.filter(c => c.status === filter);

    return (
        <div className="p-8 bg-zinc-100 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-zinc-900 mb-1 tracking-tight flex items-center gap-3">
                    🤝 Networking Agent
                </h1>
                <p className="text-zinc-500 font-medium">AI-powered relationship tracker to grow your professional network strategically.</p>
            </header>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Total Connections</h3>
                    <div className="text-4xl font-black text-zinc-900">{CONNECTIONS.length}</div>
                    <p className="text-xs text-emerald-500 font-bold mt-2">↑ 3 new this week</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Active Chats</h3>
                    <div className="text-4xl font-black text-emerald-600">{CONNECTIONS.filter(c => c.status === 'Active').length}</div>
                    <p className="text-xs text-emerald-500 font-bold mt-2">Ongoing conversations</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-red-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Needs Follow-up</h3>
                    <div className="text-4xl font-black text-rose-600">{CONNECTIONS.filter(c => c.status === 'Cold').length}</div>
                    <p className="text-xs text-rose-500 font-bold mt-2">Going cold — act now!</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Referral Rate</h3>
                    <div className="text-4xl font-black text-blue-600">33%</div>
                    <p className="text-xs text-blue-500 font-bold mt-2">2 out of 6 referred you</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Connections List */}
                <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-black text-zinc-900">Your Network</h2>
                        <div className="flex gap-2">
                            {['All', 'Active', 'Warm', 'New', 'Cold'].map((f) => (
                                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-rose-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredConnections.map((person) => (
                            <div key={person.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-amber-200 transition-all hover:shadow-sm">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-md">
                                    {person.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-zinc-900">{person.name}</h4>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadge(person.status)}`}>{person.status}</span>
                                    </div>
                                    <p className="text-xs text-zinc-400 font-medium">{person.role} · {person.company}</p>
                                    <p className="text-[10px] text-zinc-400 italic mt-0.5">"{person.notes}"</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{person.platform}</span>
                                    <span className="text-[10px] text-zinc-400">{person.lastContact}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Suggested Actions */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs shadow-md">🤖</div>
                        <h2 className="text-lg font-black text-zinc-900">AI Suggestions</h2>
                    </div>

                    <div className="space-y-3">
                        {SUGGESTED_ACTIONS.map((action, i) => (
                            <div key={i} className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-rose-200 transition-all cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <span className="text-lg">{action.icon}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="text-sm font-bold text-zinc-800">{action.title}</h4>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 font-medium">{action.subtitle}</p>
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${getUrgencyBadge(action.urgency)}`}>
                                        {action.urgency}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Message Templates */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <h2 className="text-lg font-black text-zinc-900 mb-5">AI Message Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {TEMPLATES.map((t) => (
                        <div key={t.id} className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer text-center">
                            <div className="text-3xl mb-2">{t.icon}</div>
                            <h4 className="font-bold text-zinc-800 text-sm mb-1">{t.name}</h4>
                            <p className="text-[10px] text-zinc-400 font-medium">{t.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <p className="text-sm text-zinc-600 font-medium">
                        💡 <strong className="text-zinc-800">AI Tip:</strong> Candidates who follow up within <strong>3 days</strong> are <strong className="text-emerald-600">40% more likely</strong> to get a response. Sarah Johnson hasn&apos;t replied — send a nudge now!
                    </p>
                </div>
            </section>
        </div>
    );
}
