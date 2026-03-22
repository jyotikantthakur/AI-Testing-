'use client';
import { useState } from 'react';

const YOUR_SKILLS = [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'Next.js', level: 82, category: 'Frontend' },
    { name: 'TypeScript', level: 78, category: 'Language' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Python', level: 60, category: 'Language' },
    { name: 'Tailwind CSS', level: 88, category: 'Frontend' },
    { name: 'PostgreSQL', level: 55, category: 'Database' },
    { name: 'Docker', level: 30, category: 'DevOps' },
    { name: 'AWS', level: 25, category: 'Cloud' },
    { name: 'System Design', level: 40, category: 'Concepts' },
];

const JOB_DEMANDS = [
    { skill: 'React', demand: 94, yourLevel: 90, status: 'strong' },
    { skill: 'TypeScript', demand: 89, yourLevel: 78, status: 'improve' },
    { skill: 'Node.js', demand: 82, yourLevel: 75, status: 'improve' },
    { skill: 'Docker', demand: 78, yourLevel: 30, status: 'missing' },
    { skill: 'AWS', demand: 75, yourLevel: 25, status: 'missing' },
    { skill: 'System Design', demand: 88, yourLevel: 40, status: 'missing' },
    { skill: 'GraphQL', demand: 65, yourLevel: 0, status: 'missing' },
    { skill: 'CI/CD', demand: 70, yourLevel: 15, status: 'missing' },
    { skill: 'Redis', demand: 55, yourLevel: 10, status: 'missing' },
    { skill: 'Kubernetes', demand: 60, yourLevel: 5, status: 'missing' },
];

const LEARNING_PATH = [
    { skill: 'System Design', priority: 'HIGH', reason: '12 of your saved jobs require it', time: '4 weeks', course: 'Grokking System Design - Educative' },
    { skill: 'Docker', priority: 'HIGH', reason: '10 jobs list Docker as required', time: '2 weeks', course: 'Docker Mastery - Udemy' },
    { skill: 'AWS', priority: 'MEDIUM', reason: '9 jobs prefer AWS experience', time: '6 weeks', course: 'AWS Certified Cloud - Coursera' },
    { skill: 'GraphQL', priority: 'MEDIUM', reason: '7 jobs mention GraphQL', time: '1 week', course: 'GraphQL Crash Course - YouTube' },
    { skill: 'Kubernetes', priority: 'LOW', reason: 'Growing demand in 4 target companies', time: '3 weeks', course: 'K8s for Developers - KodeKloud' },
];

export default function SkillGapPage() {
    const [newSkill, setNewSkill] = useState('');
    const hireabilityScore = 62;

    const getBarColor = (status: string) => {
        if (status === 'strong') return 'bg-emerald-500';
        if (status === 'improve') return 'bg-amber-500';
        return 'bg-rose-500';
    };

    const getPriorityBadge = (p: string) => {
        if (p === 'HIGH') return 'bg-rose-100 text-rose-600 border-rose-200';
        if (p === 'MEDIUM') return 'bg-amber-100 text-amber-600 border-amber-200';
        return 'bg-zinc-100 text-zinc-500 border-zinc-200';
    };

    return (
        <div className="p-8 bg-zinc-100 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-zinc-900 mb-1 tracking-tight flex items-center gap-3">
                    🎯 Skill Gap Analyzer
                </h1>
                <p className="text-zinc-500 font-medium">AI-powered analysis of your skills vs. market demand from your saved jobs.</p>
            </header>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Hire-ability Score</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black text-zinc-900">{hireabilityScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 rounded-full h-3 mt-3">
                        <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-3 rounded-full transition-all" style={{ width: `${hireabilityScore}%` }} />
                    </div>
                    <p className="text-xs text-zinc-400 font-bold mt-2">Based on 38 tracked jobs</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Strong Skills</h3>
                    <div className="text-4xl font-black text-emerald-600">{JOB_DEMANDS.filter(j => j.status === 'strong').length}</div>
                    <p className="text-xs text-emerald-500 font-bold mt-2">Market-ready</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Needs Improvement</h3>
                    <div className="text-4xl font-black text-amber-600">{JOB_DEMANDS.filter(j => j.status === 'improve').length}</div>
                    <p className="text-xs text-amber-500 font-bold mt-2">Almost there</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-red-600" />
                    <h3 className="text-zinc-500 font-bold text-sm mb-1">Missing Skills</h3>
                    <div className="text-4xl font-black text-rose-600">{JOB_DEMANDS.filter(j => j.status === 'missing').length}</div>
                    <p className="text-xs text-rose-500 font-bold mt-2">Start learning</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Your Skills */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-black text-zinc-900">Your Skill Profile</h2>
                        <span className="text-xs font-bold text-zinc-400">{YOUR_SKILLS.length} skills</span>
                    </div>
                    <div className="space-y-3 mb-5">
                        {YOUR_SKILLS.map((skill) => (
                            <div key={skill.name} className="flex items-center gap-3">
                                <span className="text-sm font-bold text-zinc-700 w-28 truncate">{skill.name}</span>
                                <div className="flex-1 bg-zinc-100 rounded-full h-3 relative">
                                    <div
                                        className={`h-3 rounded-full transition-all ${skill.level >= 70 ? 'bg-emerald-500' : skill.level >= 40 ? 'bg-amber-500' : 'bg-rose-400'}`}
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-zinc-500 w-10 text-right">{skill.level}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill..."
                            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm text-zinc-800 font-bold focus:outline-none focus:border-rose-400"
                        />
                        <button className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg font-bold text-sm shadow-sm">Add</button>
                    </div>
                </section>

                {/* Gap Heatmap */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <h2 className="text-lg font-black text-zinc-900 mb-5">Gap Heatmap — You vs. Market</h2>
                    <div className="space-y-3">
                        {JOB_DEMANDS.map((item) => (
                            <div key={item.skill} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                                <div className={`w-2.5 h-2.5 rounded-full ${getBarColor(item.status)}`} />
                                <span className="text-sm font-bold text-zinc-700 w-28">{item.skill}</span>
                                <div className="flex-1 flex items-center gap-2">
                                    <div className="flex-1 bg-zinc-200 rounded-full h-2 relative">
                                        <div className="bg-zinc-400 h-2 rounded-full absolute top-0 left-0" style={{ width: `${item.demand}%` }} />
                                        <div className={`${getBarColor(item.status)} h-2 rounded-full absolute top-0 left-0`} style={{ width: `${item.yourLevel}%` }} />
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="text-[10px] font-black text-zinc-400">{item.yourLevel}%</span>
                                    <span className="text-[10px] text-zinc-300">/</span>
                                    <span className="text-[10px] font-black text-zinc-500">{item.demand}%</span>
                                </div>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.status === 'strong' ? 'bg-emerald-100 text-emerald-600' :
                                        item.status === 'improve' ? 'bg-amber-100 text-amber-600' :
                                            'bg-rose-100 text-rose-600'
                                    }`}>
                                    {item.status === 'strong' ? '✅ Strong' : item.status === 'improve' ? '⚠️ Improve' : '❌ Gap'}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* AI Learning Path */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-sm shadow-md">🤖</div>
                    <div>
                        <h2 className="text-lg font-black text-zinc-900">AI Priority Learning Path</h2>
                        <p className="text-xs text-zinc-400 font-bold">Ranked by impact on your hire-ability score</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {LEARNING_PATH.map((item, i) => (
                        <div key={item.skill} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-rose-200 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-zinc-200 flex items-center justify-center text-sm font-black text-zinc-600">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-zinc-900">{item.skill}</h4>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                                        {item.priority}
                                    </span>
                                </div>
                                <p className="text-xs text-zinc-400 font-medium">{item.reason}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-zinc-600">{item.course}</p>
                                <p className="text-[10px] text-zinc-400 font-bold">⏱ {item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <p className="text-sm text-zinc-600 font-medium">
                        💡 <strong className="text-zinc-800">AI Tip:</strong> Learning <strong>System Design</strong> and <strong>Docker</strong> would boost your hire-ability score to <strong className="text-emerald-600">81%</strong> — covering 22 more job requirements!
                    </p>
                </div>
            </section>
        </div>
    );
}
