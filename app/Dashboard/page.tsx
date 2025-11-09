"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Removed Next.js import
// import Link from 'next/link'; // Removed Next.js import

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
        window.location.href = "/formfile";
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
                    }  transition-all duration-300 flex flex-col`}
                style={{ backgroundColor: '#99A48A'}} // Sidebar background and border
            >
                <div
                    className="flex items-center justify-between p-4 "
                >
                    {sideBarOpen && (
                        <span className="text-5xl font-semibold text-white">
                            More
                        </span>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sideBarOpen)}
                        className="text-white hover:text-gray-200 transition-colors text-3xl"
                        title="Toggle Sidebar"
                    >
                        ☰
                    </button>
                </div>

                <nav
                    className={`flex flex-col text-3xl p-4 gap-4 text-white transition-opacity duration-200 ${sideBarOpen ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <a
                        href="/"
                        className="hover:text-gray-200 transition-colors"
                    >
                        Home
                    </a>
                    <p
                        className="hover:text-gray-200 transition-colors cursor-pointer"
                    >
                        Settings
                    </p>
                    <a
                        href="/auth/logout"
                        className="hover:text-gray-200 transition-colors"
                    >
                        Logout
                    </a>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header
                    className="sticky top-0 z-10 backdrop-blur-sm "
                    style={{ backgroundColor: '#DEE5D4'}} // Top bar background (semi-transparent) and border
                >
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <input
                                id="dashboard-search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search projects, boards or tasks..."
                                className="w-full max-w-md px-5 py-3 text-lg rounded-md border text-black focus:outline-none focus:ring-2 focus:ring-[#EA627F]"
                                style={{ backgroundColor: '#F7F7F7', borderColor: '#D1D1D1' }} // Search bar "off-white"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleCreateClick} // Use the new handler
                                className="text-white px-6 py-3 text-xl rounded-md shadow-sm hover:opacity-90 hover:scale-[.98] transition-all duration-150"
                                style={{ backgroundColor: '#EA627F' }} // Create button
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl w-full mx-auto px-6 py-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-semibold text-black">
                            Project Names
                        </h1>
                        <button
                            type="button"
                            onClick={toggleSortOrder}
                            className="px-4 py-2 text-lg font-medium  rounded-md"
                            style={{
                                color: '#333',
                                backgroundColor: '#F7F7F7', // "off-white"
                            }}
                        >
                            Sort by: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                        </button>
                    </div>

                    <section>
                        <ul className="space-y-4">
                            {filtered.map((project, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center p-6 rounded-md transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg"
                                    style={{ backgroundColor: '#B8C0AD', color: '#222'}} // Project boxes
                                >
                                    <span className="text-xl">{project.name}</span>
                                    <span className="text-gray-700 text-lg">
                                        Created: {project.createdAt}
                                    </span>
                                </li>
                            ))}
                            {filtered.length === 0 && (
                                <li className="text-lg text-gray-600">No results found</li>
                            )}
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}