import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function ContactPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fullName || !email || !message) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success('Message sent! We\'ll get back to you soon.');
            setFullName('');
            setEmail('');
            setMessage('');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">RouteX</span>
                </div>
                <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                    Back to Home
                </Link>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-5 gap-16 lg:gap-24 w-full flex-grow">

                {/* Left Column: Form */}
                <div className="lg:col-span-3 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                            Get in touch
                        </h1>
                        <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                            We're here to help. Send us a message and we'll get <br className="hidden md:block" />
                            back to you as soon as possible.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@routex.com"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="How can we help you?"
                                rows={6}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                {/* Right Column: Info */}
                <div className="lg:col-span-2 space-y-16">
                    {/* Contact Details */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact Details</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Email us</p>
                                    <p className="text-sm text-slate-500">hello@routex.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Call us</p>
                                    <p className="text-sm text-slate-500">+1 (555) 000-0000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Visit us</p>
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        123 Logistics Way, Suite 400 <br />
                                        San Francisco, CA 94103
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="space-y-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Follow Us</h3>
                        <div className="flex gap-4">
                            <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 2.595 1.028 3.688 0 3.849-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </button>
                            <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                                <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Quality Quote */}
                    <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                                <path d="M10 8v8h6c0 2.2-1.8 4-4 4v2c3.3 0 6-2.7 6-6V8h-8zm12 0v8h6c0 2.2-1.8 4-4 4v2c3.3 0 6-2.7 6-6V8h-8z" />
                            </svg>
                        </div>
                        <p className="text-slate-600 italic leading-relaxed relative z-10">
                            "Exceptional routing solutions require <br />
                            exceptional support. We usually respond <br />
                            within 24 hours."
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
                    <p>© {new Date().getFullYear()} RouteX Logistics. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default ContactPage;
