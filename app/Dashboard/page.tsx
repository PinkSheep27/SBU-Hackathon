"use client";

import React, { useState } from "react";
import Link from 'next/link';

export default function Dashboard() {
    // const router = useRouter(); // Removed Next.js hook
    const [query, setQuery] = useState("");
    const [sideBarOpen, setSidebarOpen] = useState(true);
    // 1. Add state to track sort order
    const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'

    const projects = [
        { name: "Alpha Project", createdAt: "2025-01-01" },
        { name: "Beta Board", createdAt: "2025-02-15" },
        { name: "Gamma Tasl", createdAt: "2025-03-10" },
    ];

    // 2. Update sorting logic to use the sortOrder state
    const sortedProjects = [...projects].sort((a, b) => {
        // Get numeric timestamps to avoid TypeScript error
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (sortOrder === "newest") {
            return dateB - dateA; // Newest first
        } else {
            return dateA - dateB; // Oldest first
        }
    });

    // 3. Filter the *sorted* array based on the query
    const filtered = sortedProjects.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    // Helper function to handle navigation for the "Create" button
    const handleCreateClick = () => {
        // Use standard window navigation instead of Next.js router
        // Also corrected typo from "dashbaord" to "dashboard"
        window.location.href = "/dashboard/create";
    };

    // 4. Function to toggle the sort order
    const toggleSortOrder = () => {
        setSortOrder(currentOrder => (currentOrder === "newest" ? "oldest" : "newest"));
    };

    return (
        <div
            className="flex min-h-screen font-sans transition-all duration-300"
            style={{ backgroundColor: '#FEEEDF' }} // Main background
        >
            <aside
                className={`${sideBarOpen ? "w-64" : "w-16"
                    } border-r transition-all duration-300 flex flex-col`}
                style={{ backgroundColor: '#99A48A', borderColor: '#8A947E' }} // Sidebar background and border
            >
                <div
                    className="flex items-center justify-between p-4 "
                    style={{ borderColor: '#8A947E' }} // Sidebar border
                >
                    {sideBarOpen && (
                        <span className="text-lg font-semibold text-white">
                            More
                        </span>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sideBarOpen)}
                        className="text-white hover:text-gray-200 transition-colors"
                        title="Toggle Sidebar"
                    >
                        ☰
                    </button>
                </div>

                <nav
                    className={`flex flex-col p-4 gap-3 text-zinc-700 dark:text-zinc-300 transition-opacity duration-200 ${sideBarOpen ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Link
                        href="/"
                        className="hover:text-gray-200 transition-colors"
                    >
                        Home
                    </Link>
                    <p
                        className="hover:text-gray-200 transition-colors"
                    >
                        Settings
                    </p>
                    <Link
                        href="/auth/logout"
                        className="hover:text-gray-200 transition-colors"
                    >
                        Logout
                    </Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header
                    className="sticky top-0 z-10 backdrop-blur-sm border-b"
                    style={{ backgroundColor: 'rgba(153, 164, 138, 0.9)', borderColor: '#8A947E' }} // Top bar background (semi-transparent) and border
                >
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <input
                                id="dashboard-search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search projects, boards or tasks..."
                                className="w-full max-w-md px-4 py-2 rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ backgroundColor: '#F7F7F7', borderColor: '#D1D1D1' }} // Search bar "off-white"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleCreateClick} // Use the new handler
                                className="text-white px-4 py-2 rounded-md shadow-sm hover:opacity-90"
                                style={{ backgroundColor: '#EA627F' }} // Create button
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl w-full mx-auto px-6 py-10">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-black">
                            Project Names
                        </h1>
                        <button
                            type="button"
                            onClick={toggleSortOrder}
                            className="px-3 py-1 text-sm font-medium border rounded-md"
                            style={{
                                color: '#333',
                                backgroundColor: '#F7F7F7', // "off-white"
                                borderColor: '#D1D1D1'
                            }}
                        >
                            Sort by: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                        </button>
                    </div>

                    <section>
                        <ul className="space-y-3">
                            {filtered.map((project, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between p-4 border rounded-md"
                                    style={{ backgroundColor: '#B8C0AD', color: '#222', borderColor: '#A9B29E' }} // Project boxes
                                >
                                    <span>{project.name}</span>
                                    <span className="text-gray-700 text-sm">
                                        Created: {project.createdAt}
                                    </span>
                                </li>
                            ))}
                            {filtered.length === 0 && (
                                <li className="text-gray-600">No results found</li>
                            )}
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}