'use client';
import { useState } from 'react';

const INTERVIEW_SETS = [
    {
        id: 'frontend',
        title: 'Frontend Developer',
        icon: '⚛️',
        questions: [
            { q: 'What is the Virtual DOM in React and how does it improve performance?', topic: 'React' },
            { q: 'Explain the difference between useEffect and useLayoutEffect.', topic: 'React Hooks' },
            { q: 'How would you optimize a React app that renders 10,000 list items?', topic: 'Performance' },
            { q: 'What is the difference between CSS Grid and Flexbox? When would you use each?', topic: 'CSS' },
            { q: 'Explain event delegation in JavaScript with an example.', topic: 'JavaScript' },
        ]
    },
    {
        id: 'backend',
        title: 'Backend Developer',
        icon: '🔌',
        questions: [
            { q: 'Explain the difference between SQL and NoSQL databases. When would you choose each?', topic: 'Database' },
            { q: 'What is middleware in Express.js? Give a real-world example.', topic: 'Node.js' },
            { q: 'How would you design a rate limiter for an API?', topic: 'System Design' },
            { q: 'What are database indexes? How do they improve query performance?', topic: 'Database' },
            { q: 'Explain the concept of microservices vs monolithic architecture.', topic: 'Architecture' },
        ]
    },
    {
        id: 'testing',
        title: 'QA / Testing (SDET)',
        icon: '🧪',
        questions: [
            { q: 'What is the difference between smoke testing and regression testing?', topic: 'Testing Types' },
            { q: 'How would you write a test plan for a login page?', topic: 'Test Planning' },
            { q: 'Explain the Page Object Model (POM) in Selenium.', topic: 'Automation' },
            { q: 'What is API testing? How would you test a REST API endpoint?', topic: 'API Testing' },
            { q: 'Describe your approach to finding and reporting bugs effectively.', topic: 'Bug Reporting' },
        ]
    },
    {
        id: 'hr',
        title: 'HR / Behavioral',
        icon: '🗣️',
        questions: [
            { q: 'Tell me about yourself and your career journey so far.', topic: 'Introduction' },
            { q: 'Describe a time you had a conflict with a teammate. How did you resolve it?', topic: 'Teamwork' },
            { q: 'Why do you want to leave your current job?', topic: 'Motivation' },
            { q: 'Where do you see yourself in 5 years?', topic: 'Goals' },
            { q: 'What is your greatest weakness and how are you working on it?', topic: 'Self-awareness' },
        ]
    },
];

const AI_FEEDBACK: Record<string, { score: number; strengths: string[]; improvements: string[]; tip: string }> = {
    'frontend': { score: 7.5, strengths: ['Strong React fundamentals', 'Good grasp of hooks lifecycle', 'Clear CSS layout understanding'], improvements: ['Practice performance optimization patterns', 'Learn Web Workers for heavy computation'], tip: 'Focus on real-world optimization — interviewers love hearing about actual bottlenecks you solved.' },
    'backend': { score: 6.8, strengths: ['Solid database knowledge', 'Good understanding of REST APIs'], improvements: ['Deep dive into system design patterns', 'Learn caching strategies (Redis)', 'Practice designing scalable systems'], tip: 'System design rounds are the toughest — practice sketching architectures on a whiteboard daily.' },
    'testing': { score: 8.2, strengths: ['Excellent test planning approach', 'Strong automation framework knowledge', 'Good bug reporting skills'], improvements: ['Learn more about CI/CD pipeline integration', 'Practice performance testing tools'], tip: 'Pramod Sir at testingacademy.com can help you ace SDET interviews — highly recommended!' },
    'hr': { score: 7.0, strengths: ['Confident introduction', 'Honest self-awareness'], improvements: ['Use STAR method more consistently', 'Prepare specific metrics/numbers for achievements', 'Practice salary negotiation scenarios'], tip: 'Always quantify your achievements — "improved load time by 40%" beats "made the app faster".' },
};

export default function MockInterviewPage() {
    const [selectedSet, setSelectedSet] = useState<string | null>(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const activeSet = INTERVIEW_SETS.find(s => s.id === selectedSet);
    const feedback = selectedSet ? AI_FEEDBACK[selectedSet] : null;

    const handleSubmitAnswer = () => {
        const newAnswers = [...answers, currentAnswer];
        setAnswers(newAnswers);
        setCurrentAnswer('');

        if (activeSet && currentQ < activeSet.questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleReset = () => {
        setSelectedSet(null);
        setCurrentQ(0);
        setAnswers([]);
        setCurrentAnswer('');
        setShowResult(false);
    };

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-emerald-500';
        if (score >= 6) return 'text-amber-500';
        return 'text-rose-500';
    };

    const getScoreBar = (score: number) => {
        if (score >= 8) return 'from-emerald-500 to-green-500';
        if (score >= 6) return 'from-amber-500 to-yellow-500';
        return 'from-rose-500 to-red-600';
    };

    // SELECT INTERVIEW TYPE
    if (!selectedSet) {
        return (
            <div className="p-8 bg-zinc-100 min-h-screen">
                <header className="mb-8">
                    <h1 className="text-3xl font-black text-zinc-900 mb-1 tracking-tight">🎙️ Mock Interview Simulator</h1>
                    <p className="text-zinc-500 font-medium">Take a realistic mock interview and get AI-powered feedback with a score out of 10.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    {INTERVIEW_SETS.map((set) => (
                        <button
                            key={set.id}
                            onClick={() => setSelectedSet(set.id)}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200 hover:border-rose-300 hover:shadow-lg transition-all text-left group"
                        >
                            <div className="text-5xl mb-4">{set.icon}</div>
                            <h3 className="text-xl font-black text-zinc-900 mb-2 group-hover:text-rose-500 transition-colors">{set.title}</h3>
                            <p className="text-sm text-zinc-400 font-medium mb-4">{set.questions.length} questions · ~15 minutes</p>
                            <div className="flex flex-wrap gap-2">
                                {set.questions.map((q, i) => (
                                    <span key={i} className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{q.topic}</span>
                                ))}
                            </div>
                            <div className="mt-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold text-sm text-center shadow-sm group-hover:shadow-rose-500/25 transition-all">
                                Start Interview →
                            </div>
                        </button>
                    ))}
                </div>

                {/* Past Results */}
                <section className="mt-10 max-w-4xl">
                    <h2 className="text-lg font-black text-zinc-900 mb-4">Past Interview Scores</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {Object.entries(AI_FEEDBACK).map(([key, fb]) => {
                            const set = INTERVIEW_SETS.find(s => s.id === key);
                            return (
                                <div key={key} className="bg-white rounded-xl p-5 shadow-sm border border-zinc-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">{set?.icon}</span>
                                        <span className="text-sm font-bold text-zinc-700">{set?.title}</span>
                                    </div>
                                    <div className={`text-3xl font-black ${getScoreColor(fb.score)}`}>{fb.score}<span className="text-lg text-zinc-400">/10</span></div>
                                    <div className="w-full bg-zinc-200 rounded-full h-2 mt-2">
                                        <div className={`bg-gradient-to-r ${getScoreBar(fb.score)} h-2 rounded-full`} style={{ width: `${fb.score * 10}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        );
    }

    // SHOW RESULTS
    if (showResult && feedback && activeSet) {
        return (
            <div className="p-8 bg-zinc-100 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200 mb-6">
                        <div className="text-center mb-8">
                            <span className="text-5xl mb-4 block">{activeSet.icon}</span>
                            <h1 className="text-2xl font-black text-zinc-900 mb-1">{activeSet.title} — Interview Complete!</h1>
                            <p className="text-zinc-400 font-medium">AI has analyzed your {answers.length} answers</p>
                        </div>

                        {/* Score Circle */}
                        <div className="flex justify-center mb-8">
                            <div className="w-40 h-40 rounded-full border-8 border-zinc-200 flex flex-col items-center justify-center relative">
                                <div className={`absolute inset-0 rounded-full border-8 ${feedback.score >= 8 ? 'border-emerald-500' : feedback.score >= 6 ? 'border-amber-500' : 'border-rose-500'}`} style={{ clipPath: `polygon(0 0, 100% 0, 100% ${feedback.score * 10}%, 0 ${feedback.score * 10}%)` }} />
                                <span className={`text-5xl font-black ${getScoreColor(feedback.score)}`}>{feedback.score}</span>
                                <span className="text-sm text-zinc-400 font-bold">/10</span>
                            </div>
                        </div>

                        <div className="w-full bg-zinc-200 rounded-full h-4 mb-8">
                            <div className={`bg-gradient-to-r ${getScoreBar(feedback.score)} h-4 rounded-full transition-all duration-1000`} style={{ width: `${feedback.score * 10}%` }} />
                        </div>

                        {/* Strengths */}
                        <div className="mb-6">
                            <h3 className="font-black text-zinc-900 mb-3 flex items-center gap-2">✅ Strengths</h3>
                            <div className="space-y-2">
                                {feedback.strengths.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                                        <span className="text-emerald-500 font-bold">+</span>
                                        <span className="text-sm font-medium text-emerald-800">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Improvements */}
                        <div className="mb-6">
                            <h3 className="font-black text-zinc-900 mb-3 flex items-center gap-2">⚠️ Areas to Improve</h3>
                            <div className="space-y-2">
                                {feedback.improvements.map((s, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                                        <span className="text-amber-500 font-bold">→</span>
                                        <span className="text-sm font-medium text-amber-800">{s}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Tip */}
                        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 mb-6">
                            <p className="text-sm text-zinc-600 font-medium">
                                💡 <strong className="text-zinc-800">AI Coach Tip:</strong> {feedback.tip}
                            </p>
                        </div>

                        {/* Your Answers Review */}
                        <div className="mb-6">
                            <h3 className="font-black text-zinc-900 mb-3">📝 Your Answers</h3>
                            <div className="space-y-3">
                                {activeSet.questions.map((q, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-black text-zinc-400">Q{i + 1}</span>
                                            <span className="text-xs font-bold text-zinc-400 bg-zinc-200 px-2 py-0.5 rounded">{q.topic}</span>
                                        </div>
                                        <p className="text-sm font-bold text-zinc-700 mb-2">{q.q}</p>
                                        <p className="text-sm text-zinc-500 italic border-l-2 border-rose-300 pl-3">{answers[i] || 'No answer provided'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={handleReset} className="flex-1 py-3.5 bg-zinc-200 hover:bg-zinc-300 rounded-xl font-bold text-sm text-zinc-600 transition-colors">
                                ← Take Another Interview
                            </button>
                            <button onClick={() => { setShowResult(false); setCurrentQ(0); setAnswers([]); }} className="flex-1 py-3.5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white rounded-xl font-bold text-sm transition-all shadow-sm">
                                🔄 Retake This Interview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // INTERVIEW IN PROGRESS
    if (activeSet) {
        const question = activeSet.questions[currentQ];
        const progress = ((currentQ) / activeSet.questions.length) * 100;

        return (
            <div className="p-8 bg-zinc-100 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    {/* Progress */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-400">Question {currentQ + 1} of {activeSet.questions.length}</span>
                        <span className="text-xs font-bold text-zinc-400">{activeSet.title}</span>
                    </div>
                    <div className="w-full bg-zinc-300 rounded-full h-2 mb-8">
                        <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200 mb-6">
                        {/* Question */}
                        <div className="mb-2">
                            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">{question.topic}</span>
                        </div>
                        <h2 className="text-2xl font-black text-zinc-900 mb-8 leading-relaxed">{question.q}</h2>

                        {/* Answer Area */}
                        <textarea
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            placeholder="Type your answer here... (Be detailed, this is what the AI will evaluate)"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-800 text-sm font-medium focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all resize-none h-40 placeholder-zinc-400"
                        />

                        {/* Recording Toggle */}
                        <div className="flex items-center gap-3 mt-4 mb-6">
                            <button
                                onClick={() => setIsRecording(!isRecording)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
                            >
                                {isRecording ? '🔴 Recording...' : '🎤 Voice Answer'}
                            </button>
                            <span className="text-[10px] text-zinc-400 font-medium">Optional: Record your answer to practice speaking</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button onClick={() => { setCurrentAnswer('I would skip this question.'); handleSubmitAnswer(); }} className="px-6 py-3.5 bg-zinc-200 hover:bg-zinc-300 rounded-xl font-bold text-sm text-zinc-500 transition-colors">
                                Skip →
                            </button>
                            <button
                                onClick={handleSubmitAnswer}
                                disabled={!currentAnswer.trim()}
                                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${currentAnswer.trim() ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white shadow-sm' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
                            >
                                {currentQ < activeSet.questions.length - 1 ? 'Submit & Next →' : '🏁 Finish Interview & Get Score'}
                            </button>
                        </div>
                    </div>

                    <button onClick={handleReset} className="text-sm text-zinc-400 hover:text-rose-400 font-bold transition-colors">
                        ← Exit Interview
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
