'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am your AI Job Assistant. You can ask me any job-related questions, ask for interview tips, or get help with your resume! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => { scrollToBottom() }, [messages]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await response.json();

            if (data.reply) {
                setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
            } else {
                setMessages([...newMessages, { role: 'assistant', content: 'Oops, something went wrong connecting to my brain.' }]);
            }
        } catch (error) {
            setMessages([...newMessages, { role: 'assistant', content: 'Error connecting to the server.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 z-50 transition-transform hover:scale-105"
            >
                <span className="text-2xl">🤖</span>
            </button>

            {/* Chat Panel */}
            <div
                className={`fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-800 shadow-2xl z-40 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>🧠</span> Agentic Job AI
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-sm'
                                    : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-sm prose prose-invert prose-sm'
                                    }`}
                            >
                                {/* Basic rendering. In a real app we'd use a markdown parser here */}
                                {msg.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-gray-900 border-t border-gray-800">
                    <form onSubmit={sendMessage} className="flex gap-2 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage(e as any);
                                }
                            }}
                            placeholder="Ask anything about jobs..."
                            className="flex-1 bg-gray-800 text-white rounded-lg pl-4 pr-20 py-3 border border-gray-700 focus:outline-none focus:border-indigo-500"
                            disabled={isLoading}
                        />
                        <div className="absolute right-2 top-2 bottom-2 flex gap-1">
                            <button
                                type="button"
                                onClick={() => {
                                    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                                    if (!SpeechRecognition) {
                                        alert("Speech recognition not supported in this browser.");
                                        return;
                                    }
                                    const recognition = new SpeechRecognition();
                                    recognition.lang = 'en-US';
                                    recognition.onstart = () => setIsLoading(true);
                                    recognition.onresult = (event: any) => {
                                        const transcript = event.results[0][0].transcript;
                                        setInput(transcript);
                                        setIsLoading(false);
                                    };
                                    recognition.onerror = () => setIsLoading(false);
                                    recognition.onend = () => setIsLoading(false);
                                    recognition.start();
                                }}
                                disabled={isLoading}
                                className={`p-1.5 rounded-md transition-colors ${isLoading ? 'text-gray-600' : 'text-indigo-400 hover:text-indigo-300 hover:bg-gray-700/50'}`}
                                title="Voice Input"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-1.5 text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-gray-500">Powered by Agentic Tracker & Groq Llama 3</span>
                    </div>
                </div>
            </div>
        </>
    );
}
