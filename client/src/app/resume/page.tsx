'use client';
import { useState } from 'react';

export default function ResumeAnalyzerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    // States for Smart Cover Letter Generator (Feature 13)
    const [generatingLetter, setGeneratingLetter] = useState(false);
    const [coverLetter, setCoverLetter] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const handleAnalyze = () => {
        if (!file) return;
        setAnalyzing(true);
        // Simulate initial basic analysis score
        setTimeout(() => {
            setAnalyzing(false);
            setScore(78);
        }, 2000);
    };

    const generateCoverLetter = async () => {
        if (!file) return;
        setGeneratingLetter(true);
        setCoverLetter(null);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', 'a Mid-Senior Frontend Engineer role'); // Mock JD for now

        try {
            const response = await fetch('http://localhost:3001/api/ai/cover-letter', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.coverLetter) {
                setCoverLetter(data.coverLetter);
            } else {
                alert('Failed to generate cover letter.');
            }
        } catch (error) {
            console.error(error);
            alert('Error connecting to the AI agent server.');
        } finally {
            setGeneratingLetter(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Resume Market Analyzer</h1>
                <p className="text-gray-400">Upload your resume to see your market fit percentage and get AI recommendations.</p>
            </header>

            {!score && !analyzing && (
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-indigo-500 hover:bg-gray-800/50 transition-all cursor-pointer"
                >
                    <div className="text-5xl mb-4">📄</div>
                    <h3 className="text-xl font-medium text-white mb-2">Drag and drop your PDF resume here</h3>
                    <p className="text-gray-500 mb-6">or click to browse from your computer</p>

                    <input
                        type="file"
                        accept=".pdf"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="file-upload" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg cursor-pointer transition-colors">
                        Select PDF File
                    </label>

                    {file && (
                        <div className="mt-8 p-4 bg-gray-800 rounded-lg inline-block border border-gray-700">
                            <span className="text-indigo-400 font-medium">Selected:</span> {file.name}
                            <button
                                onClick={(e) => { e.preventDefault(); handleAnalyze(); }}
                                className="ml-4 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors"
                            >
                                Start Analysis ✨
                            </button>
                        </div>
                    )}
                </div>
            )}

            {analyzing && (
                <div className="flex flex-col items-center justify-center p-20 border border-gray-800 rounded-2xl bg-gray-900/50">
                    <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                    <h2 className="text-xl text-white font-medium animate-pulse">Our AI is analyzing your resume against the market...</h2>
                </div>
            )}

            {score !== null && !analyzing && (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">Analysis Complete</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl border border-gray-700">
                            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-gray-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-emerald-500" strokeWidth="3" strokeDasharray={`${score}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-bold text-white">{score}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-300">Market Fit Score</h3>
                        </div>

                        <div className="col-span-2 space-y-4">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <h4 className="font-semibold text-emerald-400 mb-1">✅ Strengths</h4>
                                <p className="text-gray-300 text-sm">Strong use of action verbs. Technical skills are highly relevant for modern tech roles.</p>
                            </div>
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                <h4 className="font-semibold text-amber-400 mb-1">⚠️ Missing Keywords</h4>
                                <p className="text-gray-300 text-sm">Consider adding 'Docker' and 'GraphQL' based on current trends.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4 border-t border-gray-800 pt-6">
                        <button onClick={() => { setScore(null); setFile(null); setCoverLetter(null); }} className="px-4 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg">
                            Upload Another
                        </button>
                        <button
                            onClick={generateCoverLetter}
                            disabled={generatingLetter}
                            className={`px-4 py-2 text-white rounded-lg ml-auto flex items-center transition-all ${generatingLetter ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {generatingLetter ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div> Generating Agent...</>
                            ) : (
                                <>Generate Smart Cover Letter ✨</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Feature 13: Generated Cover Letter Display */}
            {coverLetter && (
                <div className="mt-8 bg-gray-900 border border-indigo-500/50 rounded-2xl p-8 shadow-lg shadow-indigo-500/10 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-indigo-400">✨</span> Smart Cover Letter
                        </h2>
                        <button className="text-sm px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300">
                            Copy to Clipboard
                        </button>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-gray-300 leading-relaxed font-serif text-lg">
                            {coverLetter}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
