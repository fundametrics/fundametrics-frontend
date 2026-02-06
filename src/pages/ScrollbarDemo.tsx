import { useState } from 'react';

const ScrollbarDemo = () => {
    const [showTest, setShowTest] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl p-8 border border-slate-200">
                    <h1 className="text-3xl font-black mb-4">Scrollbar Visibility Test</h1>
                    <p className="text-slate-600 mb-6">
                        This page tests if the custom scrollbar CSS is working. If you see an <strong className="text-indigo-600">INDIGO/PURPLE scrollbar</strong> below, the CSS is working!
                    </p>

                    <button
                        onClick={() => setShowTest(!showTest)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors mb-6"
                    >
                        {showTest ? 'Hide' : 'Show'} Test
                    </button>
                </div>

                {showTest && (
                    <>
                        {/* Test 1: Simple overflow-x-auto */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200">
                            <h2 className="text-xl font-bold mb-4">Test 1: overflow-x-auto class</h2>
                            <div className="overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl p-4">
                                <div style={{ width: '3000px', minWidth: '3000px' }} className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                                    ← Scroll horizontally - You should see an INDIGO scrollbar →
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                ✓ This content is 3000px wide - scrollbar should be visible
                            </p>
                        </div>

                        {/* Test 2: custom-scrollbar class */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200">
                            <h2 className="text-xl font-bold mb-4">Test 2: custom-scrollbar class</h2>
                            <div className="custom-scrollbar overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl p-4">
                                <div style={{ width: '3000px', minWidth: '3000px' }} className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                                    ← Scroll horizontally - You should see an INDIGO scrollbar →
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                ✓ This content is 3000px wide - scrollbar should be visible
                            </p>
                        </div>

                        {/* Test 3: Actual table structure */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200">
                            <h2 className="text-xl font-bold mb-4">Test 3: Table with many columns</h2>
                            <div className="overflow-x-auto custom-scrollbar bg-white border border-slate-200 rounded-xl">
                                <table className="w-full min-w-[2000px]">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                                            <th className="px-8 py-4 text-left font-bold">Metric</th>
                                            {Array.from({ length: 15 }, (_, i) => (
                                                <th key={i} className="px-8 py-4 text-right font-bold whitespace-nowrap">
                                                    Period {i + 1}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="px-8 py-4 font-semibold">Revenue</td>
                                            {Array.from({ length: 15 }, (_, i) => (
                                                <td key={i} className="px-8 py-4 text-right font-mono">
                                                    {(1000 + i * 100).toLocaleString()}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-t bg-slate-50">
                                            <td className="px-8 py-4 font-semibold">Profit</td>
                                            {Array.from({ length: 15 }, (_, i) => (
                                                <td key={i} className="px-8 py-4 text-right font-mono">
                                                    {(500 + i * 50).toLocaleString()}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                ✓ Table with 15 columns - scrollbar should be visible
                            </p>
                        </div>

                        {/* Expected Result */}
                        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-8">
                            <h3 className="text-lg font-black text-indigo-900 mb-4">What You Should See:</h3>
                            <ul className="space-y-3 text-sm text-indigo-800">
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">📏</span>
                                    <div>
                                        <strong>Scrollbar Size:</strong> 12px tall (not thin like default)
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">🎨</span>
                                    <div>
                                        <strong>Scrollbar Color:</strong> INDIGO/PURPLE gradient (#818cf8 → #6366f1)
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">🖱️</span>
                                    <div>
                                        <strong>Hover Effect:</strong> Scrollbar darkens when you hover over it
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-2xl">⚡</span>
                                    <div>
                                        <strong>Track:</strong> Light gray background (#e2e8f0)
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Troubleshooting */}
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
                            <h3 className="text-lg font-black text-amber-900 mb-4">If You Don't See the Scrollbar:</h3>
                            <ol className="space-y-2 text-sm text-amber-800 list-decimal list-inside">
                                <li>Try hard refreshing: <code className="bg-amber-100 px-2 py-1 rounded">Ctrl + Shift + R</code></li>
                                <li>Open DevTools (F12) → Network tab → Check "Disable cache"</li>
                                <li>Check if your browser is Chrome/Edge (best support)</li>
                                <li>Try a different browser to rule out browser-specific issues</li>
                            </ol>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ScrollbarDemo;
