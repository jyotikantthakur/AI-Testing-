'use client';

const COACHES = [
    { id: 1, name: 'Pramod Sir', org: 'Testing Academy', website: 'testingacademy.com', speciality: 'Manual & Automation Testing, SDET', avatar: '👨‍🏫', rating: '4.9', sessions: '500+', status: 'Available' },
    { id: 2, name: 'Naveen AutomationLabs', org: 'AutomationLabs', website: 'automationlabs.in', speciality: 'Selenium, Java, API Testing', avatar: '🧑‍💻', rating: '4.8', sessions: '300+', status: 'Available' },
    { id: 3, name: 'Mukesh Otwani', org: 'Learn Testing', website: 'learntesting.com', speciality: 'Manual Testing, Agile, Jira', avatar: '👨‍💼', rating: '4.7', sessions: '250+', status: 'Busy' },
];

const PREP_TRACKS = [
    { id: 1, title: 'DSA & Problem Solving', icon: '🧠', topics: 12, completed: 5, color: 'from-rose-500 to-orange-500' },
    { id: 2, title: 'System Design', icon: '🏗️', topics: 8, completed: 2, color: 'from-amber-500 to-yellow-500' },
    { id: 3, title: 'Behavioral & HR Round', icon: '🗣️', topics: 10, completed: 7, color: 'from-emerald-500 to-teal-500' },
    { id: 4, title: 'Testing & QA Concepts', icon: '🧪', topics: 15, completed: 4, color: 'from-blue-500 to-indigo-500' },
    { id: 5, title: 'Frontend Deep Dive', icon: '⚛️', topics: 10, completed: 6, color: 'from-purple-500 to-fuchsia-500' },
    { id: 6, title: 'Backend & APIs', icon: '🔌', topics: 9, completed: 3, color: 'from-cyan-500 to-sky-500' },
];

const MOCK_INTERVIEWS = [
    { id: 1, type: 'Technical Round', company: 'Google', date: 'Tomorrow, 2 PM', difficulty: 'Hard', status: 'Scheduled' },
    { id: 2, type: 'HR Behavioral', company: 'Stripe', date: 'Mar 25, 11 AM', difficulty: 'Medium', status: 'Scheduled' },
    { id: 3, type: 'System Design', company: 'Netflix', date: 'Mar 24, 4 PM', difficulty: 'Hard', status: 'Scheduled' },
    { id: 4, type: 'Testing Concepts', company: 'Razorpay', date: 'Completed', difficulty: 'Medium', status: 'Done' },
];

const COMMON_QUESTIONS = [
    { q: 'Tell me about yourself', category: 'HR', difficulty: 'Easy' },
    { q: 'Explain the difference between unit and integration testing', category: 'Testing', difficulty: 'Medium' },
    { q: 'Design a URL shortener', category: 'System Design', difficulty: 'Hard' },
    { q: 'What is your greatest weakness?', category: 'HR', difficulty: 'Easy' },
    { q: 'Implement a debounce function in JavaScript', category: 'Frontend', difficulty: 'Medium' },
    { q: 'Explain REST vs GraphQL', category: 'Backend', difficulty: 'Medium' },
    { q: 'How would you test a login page?', category: 'Testing', difficulty: 'Easy' },
    { q: 'Design an e-commerce cart system', category: 'System Design', difficulty: 'Hard' },
];

export default function InterviewPrepPage() {
    const getDiffBadge = (d: string) => {
        if (d === 'Easy') return 'bg-emerald-100 text-emerald-600';
        if (d === 'Medium') return 'bg-amber-100 text-amber-600';
        return 'bg-rose-100 text-rose-600';
    };

    return (
        <div className="p-8 bg-zinc-100 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-zinc-900 mb-1 tracking-tight flex items-center gap-3">
                    🎤 Interview Prep Coach
                </h1>
                <p className="text-zinc-500 font-medium">AI-assisted interview preparation with expert coaches and mock sessions.</p>
            </header>

            {/* Expert Coaches */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-black text-zinc-900">Expert Coaches & Mentors</h2>
                        <p className="text-xs text-zinc-400 font-bold">Connect with industry professionals for 1-on-1 guidance</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {COACHES.map((coach) => (
                        <div key={coach.id} className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-amber-300 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-md">
                                    {coach.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900">{coach.name}</h4>
                                    <a href={`https://${coach.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-rose-500 hover:text-rose-400 font-bold underline underline-offset-2">
                                        {coach.website}
                                    </a>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium mb-3">{coach.speciality}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">⭐ {coach.rating}</span>
                                    <span className="text-[10px] font-bold text-zinc-400">{coach.sessions} sessions</span>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${coach.status === 'Available' ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-200 text-zinc-500'}`}>
                                    {coach.status}
                                </span>
                            </div>
                            <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white rounded-lg font-bold text-sm transition-all shadow-sm">
                                Book Session
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Prep Tracks */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <h2 className="text-lg font-black text-zinc-900 mb-5">Preparation Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PREP_TRACKS.map((track) => (
                        <div key={track.id} className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:shadow-md transition-all cursor-pointer">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{track.icon}</span>
                                <h4 className="font-bold text-zinc-800 text-sm">{track.title}</h4>
                            </div>
                            <div className="w-full bg-zinc-200 rounded-full h-2.5 mb-2">
                                <div className={`bg-gradient-to-r ${track.color} h-2.5 rounded-full`} style={{ width: `${(track.completed / track.topics) * 100}%` }} />
                            </div>
                            <p className="text-[10px] text-zinc-400 font-bold">{track.completed}/{track.topics} topics covered</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Mock Interviews */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <h2 className="text-lg font-black text-zinc-900 mb-5">Mock Interviews</h2>
                    <div className="space-y-3">
                        {MOCK_INTERVIEWS.map((m) => (
                            <div key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${m.status === 'Done' ? 'bg-emerald-50 border-emerald-200' : 'bg-zinc-50 border-zinc-100 hover:border-rose-200'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md ${m.status === 'Done' ? 'bg-emerald-500' : 'bg-gradient-to-br from-rose-500 to-orange-500'}`}>
                                    {m.status === 'Done' ? '✅' : '🎙️'}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-zinc-900 text-sm">{m.type}</h4>
                                    <p className="text-xs text-zinc-400 font-medium">{m.company} · {m.date}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getDiffBadge(m.difficulty)}`}>{m.difficulty}</span>
                            </div>
                        ))}
                        <button className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-bold text-sm text-zinc-500 transition-colors border border-zinc-200">+ Schedule Mock Interview</button>
                    </div>
                </section>

                {/* Common Questions */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
                    <h2 className="text-lg font-black text-zinc-900 mb-5">Top Interview Questions</h2>
                    <div className="space-y-2.5">
                        {COMMON_QUESTIONS.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-amber-200 transition-all cursor-pointer">
                                <span className="text-xs font-black text-zinc-300 w-6">{i + 1}.</span>
                                <p className="flex-1 text-sm font-medium text-zinc-700">{item.q}</p>
                                <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{item.category}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getDiffBadge(item.difficulty)}`}>{item.difficulty}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* AI Tip */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
                <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                    <p className="text-sm text-zinc-600 font-medium">
                        💡 <strong className="text-zinc-800">AI Tip:</strong> Contact <strong>Pramod Sir at testingacademy.com</strong> for expert coaching in manual & automation testing — his students have a <strong className="text-emerald-600">92% placement rate</strong> in QA/SDET roles!
                    </p>
                </div>
            </section>
        </div>
    );
}
