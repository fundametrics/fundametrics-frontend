const ScrollbarTest = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-3xl font-black mb-8">Scrollbar Test Page</h1>

            {/* Test 1: overflow-x-auto with very wide content */}
            <div className="mb-12">
                <h2 className="text-xl font-bold mb-4">Test 1: overflow-x-auto class</h2>
                <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl p-4">
                    <div style={{ width: '2000px' }} className="bg-gradient-to-r from-indigo-500 to-purple-500 h-32 flex items-center justify-center text-white font-bold">
                        This content is 2000px wide - you should see an INDIGO scrollbar below
                    </div>
                </div>
            </div>

            {/* Test 2: custom-scrollbar class */}
            <div className="mb-12">
                <h2 className="text-xl font-bold mb-4">Test 2: custom-scrollbar class</h2>
                <div className="custom-scrollbar overflow-x-auto bg-white border border-slate-200 rounded-xl p-4">
                    <div style={{ width: '2000px' }} className="bg-gradient-to-r from-emerald-500 to-teal-500 h-32 flex items-center justify-center text-white font-bold">
                        This content is 2000px wide - you should see an INDIGO scrollbar below
                    </div>
                </div>
            </div>

            {/* Test 3: Table with many columns */}
            <div className="mb-12">
                <h2 className="text-xl font-bold mb-4">Test 3: Wide table</h2>
                <div className="overflow-x-auto custom-scrollbar bg-white border border-slate-200 rounded-xl">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-3 text-left">Column 1</th>
                                <th className="px-6 py-3 text-left">Column 2</th>
                                <th className="px-6 py-3 text-left">Column 3</th>
                                <th className="px-6 py-3 text-left">Column 4</th>
                                <th className="px-6 py-3 text-left">Column 5</th>
                                <th className="px-6 py-3 text-left">Column 6</th>
                                <th className="px-6 py-3 text-left">Column 7</th>
                                <th className="px-6 py-3 text-left">Column 8</th>
                                <th className="px-6 py-3 text-left">Column 9</th>
                                <th className="px-6 py-3 text-left">Column 10</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-3 border-t">Data 1</td>
                                <td className="px-6 py-3 border-t">Data 2</td>
                                <td className="px-6 py-3 border-t">Data 3</td>
                                <td className="px-6 py-3 border-t">Data 4</td>
                                <td className="px-6 py-3 border-t">Data 5</td>
                                <td className="px-6 py-3 border-t">Data 6</td>
                                <td className="px-6 py-3 border-t">Data 7</td>
                                <td className="px-6 py-3 border-t">Data 8</td>
                                <td className="px-6 py-3 border-t">Data 9</td>
                                <td className="px-6 py-3 border-t">Data 10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">What to look for:</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Scrollbar size:</strong> Should be 12px tall (not thin)</li>
                    <li><strong>Scrollbar color:</strong> Should be INDIGO/PURPLE gradient (not gray)</li>
                    <li><strong>Track color:</strong> Should be light gray/slate</li>
                    <li><strong>Hover effect:</strong> Scrollbar should darken when you hover over it</li>
                </ul>
            </div>
        </div>
    );
};

export default ScrollbarTest;
