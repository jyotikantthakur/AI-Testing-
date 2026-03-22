import Link from 'next/link';

const RECENT_ACTIVITY = [
  { id: 1, company: 'Google', role: 'Senior Frontend Engineer', status: 'Interview', statusColor: 'bg-red-500/10 text-red-400', icon: '🎯', time: '2h ago' },
  { id: 2, company: 'Stripe', role: 'Full Stack Developer', status: 'Applied', statusColor: 'bg-amber-500/10 text-amber-400', icon: '📄', time: '5h ago' },
  { id: 3, company: 'Meta', role: 'React Native Dev', status: 'Feedback Received', statusColor: 'bg-pink-500/10 text-pink-400', icon: '💬', time: '1d ago' },
  { id: 4, company: 'Netflix', role: 'UI Engineer', status: 'HR Contacted', statusColor: 'bg-rose-500/10 text-rose-300', icon: '📧', time: '1d ago' },
  { id: 5, company: 'Razorpay', role: 'Backend Engineer', status: 'Offer!', statusColor: 'bg-emerald-500/10 text-emerald-400', icon: '🎉', time: '2d ago' },
];

const AI_INSIGHTS = [
  { label: 'Resume Match Score', value: '87%', trend: '↑ 4% this week', color: 'text-emerald-400', bg: 'from-emerald-600/20 to-emerald-900/10' },
  { label: 'Response Rate', value: '34%', trend: 'Above average', color: 'text-amber-400', bg: 'from-amber-600/20 to-amber-900/10' },
  { label: 'Avg. Days to Hear Back', value: '6.2', trend: '↓ 1.5 days faster', color: 'text-rose-400', bg: 'from-rose-600/20 to-rose-900/10' },
];

export default function DashboardPage() {
  const mockDailyTarget = 5;
  const mockAppliedToday = 3;

  return (
    <div className="p-8 bg-zinc-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 mb-1 tracking-tight">Welcome back, Guest! 👋</h1>
        <p className="text-zinc-500 font-medium">Here&apos;s your AI-powered job search command center.</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
          <h3 className="text-zinc-500 font-bold text-sm mb-1">Today&apos;s Mission</h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-zinc-900">{mockAppliedToday}</span>
            <span className="text-zinc-400 mb-1 font-semibold">/ {mockDailyTarget}</span>
          </div>
          <div className="w-full bg-zinc-200 rounded-full h-2.5 mt-4">
            <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-2.5 rounded-full transition-all" style={{ width: `${(mockAppliedToday / mockDailyTarget) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
          <h3 className="text-zinc-500 font-bold text-sm mb-1">Active Pipeline</h3>
          <div className="text-4xl font-black text-zinc-900">38</div>
          <p className="text-sm text-emerald-500 mt-2 font-bold">↑ 5 this week</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-500" />
          <h3 className="text-zinc-500 font-bold text-sm mb-1">Interviews Lined Up</h3>
          <div className="text-4xl font-black text-zinc-900">11</div>
          <p className="text-sm text-rose-500 mt-2 font-bold">Next: Tomorrow 2PM</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
          <h3 className="text-zinc-500 font-bold text-sm mb-1">Offers Received</h3>
          <div className="text-4xl font-black text-zinc-900">12</div>
          <p className="text-sm text-emerald-500 mt-2 font-bold">🔥 3 pending decisions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-black text-zinc-900">Recent Activity</h2>
            <Link href="/applications" className="text-sm text-rose-500 hover:text-rose-400 font-bold">View Board →</Link>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-rose-200 transition-all hover:shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-lg shadow-md">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-zinc-900">{item.role}</h4>
                  <p className="text-sm text-zinc-400 font-medium">{item.company}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.statusColor}`}>{item.status}</span>
                  <span className="text-[10px] text-zinc-400 font-bold">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Actions */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
          <h2 className="text-xl font-black text-zinc-900 mb-5">Next Actions</h2>
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 text-rose-600 mb-3">
            <p className="flex gap-2 font-bold text-sm">
              <span>🔔</span>
              <span>Daily reminder at <strong>09:00 AM</strong></span>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-600 mb-4">
            <p className="flex gap-2 font-bold text-sm">
              <span>📱</span>
              <span>SMS alerts sent to your <strong>mobile number</strong></span>
            </p>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer hover:bg-zinc-100 transition-colors">
              <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-rose-500 focus:ring-rose-500 accent-rose-500" />
              <span className="text-zinc-700 font-medium">Follow up with Google recruiter</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer hover:bg-zinc-100 transition-colors">
              <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-rose-500 focus:ring-rose-500 accent-rose-500" />
              <span className="text-zinc-700 font-medium">Prepare system design for Stripe</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer hover:bg-zinc-100 transition-colors">
              <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-rose-500 focus:ring-rose-500 accent-rose-500" />
              <span className="text-zinc-700 font-medium">Update resume for backend roles</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 cursor-pointer hover:bg-zinc-100 transition-colors">
              <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-rose-500 focus:ring-rose-500 accent-rose-500" />
              <span className="text-zinc-700 font-medium">Send thank-you note to Netflix HR</span>
            </label>
          </div>
        </section>
      </div>

      {/* AI Insights — Unique Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-sm shadow-md">🤖</div>
          <div>
            <h2 className="text-xl font-black text-zinc-900">AI Agent Insights</h2>
            <p className="text-xs text-zinc-400 font-bold">Powered by your Agentic Job AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AI_INSIGHTS.map((insight, i) => (
            <div key={i} className={`rounded-xl p-5 bg-gradient-to-br ${insight.bg} border border-zinc-200 relative overflow-hidden`}>
              <h4 className="text-zinc-500 font-bold text-sm mb-1">{insight.label}</h4>
              <div className={`text-3xl font-black ${insight.color}`}>{insight.value}</div>
              <p className="text-xs text-zinc-400 font-bold mt-2">{insight.trend}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
          <p className="text-sm text-zinc-600 font-medium">
            💡 <strong className="text-zinc-800">AI Tip:</strong> Your applications to <strong>fintech companies</strong> have a <strong className="text-emerald-600">52% higher</strong> callback rate. Consider targeting more roles in this sector!
          </p>
        </div>
      </section>

      {/* Connected Accounts & Quick Integrations */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-zinc-900">Quick Integrations</h2>
            <p className="text-xs text-zinc-400 font-bold">Connect your accounts to supercharge your job search</p>
          </div>
          <button className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-sm font-bold rounded-lg transition-colors border border-zinc-200">+ Add More</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* GitHub */}
          <div className="group p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 text-sm">GitHub</h4>
                <p className="text-[10px] text-zinc-400 font-bold">Sync repos & contributions</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Connected</span>
              <span className="text-[10px] text-zinc-400">@your-github</span>
            </div>
          </div>

          {/* Gmail / Email */}
          <div className="group p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-rose-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 text-sm">Gmail</h4>
                <p className="text-[10px] text-zinc-400 font-bold">Track HR replies & emails</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Connected</span>
              <span className="text-[10px] text-zinc-400">3 new today</span>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="group p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 text-sm">LinkedIn</h4>
                <p className="text-[10px] text-zinc-400 font-bold">Import jobs & connections</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">Setup →</span>
              <span className="text-[10px] text-zinc-400">Click to link</span>
            </div>
          </div>

          {/* Portfolio */}
          <div className="group p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 text-sm">Portfolio</h4>
                <p className="text-[10px] text-zinc-400 font-bold">Auto-sync your projects</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">Setup →</span>
              <span className="text-[10px] text-zinc-400">Add URL</span>
            </div>
          </div>

          {/* Mobile / SMS Notifications */}
          <div className="group p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 text-sm">Mobile SMS</h4>
                <p className="text-[10px] text-zinc-400 font-bold">Interview & deadline alerts</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">Setup →</span>
              <span className="text-[10px] text-zinc-400">Add number</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
