"use client";

import React, { useState, useEffect } from "react";
import { getStoredProjects, StoredProject } from "../utils/storage";
import Link from 'next/link';

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [sideBarOpen, setSidebarOpen] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");
  const [projects, setProjects] = useState<StoredProject[]>([]);

  useEffect(() => {
    const storedProjects = getStoredProjects();
    setProjects(storedProjects);
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.id).getTime();
    const dateB = new Date(b.id).getTime();

    if (sortOrder === "newest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const filtered = sortedProjects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleCreateClick = () => {
    window.location.href = "/formfile";
  };

  const toggleSortOrder = () => {
    setSortOrder(currentOrder => (currentOrder === "newest" ? "oldest" : "newest"));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black font-sans transition-all duration-300">
      <aside
        className={`${sideBarOpen ? "w-64" : "w-16"
          } bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          {sideBarOpen && (
            <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              More
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sideBarOpen)}
            className="text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors"
            title="Toggle Sidebar"
          >
            ☰
          </button>
        </div>

                <nav
                    className={`flex flex-col p-4 gap-3 text-zinc-700 dark:text-zinc-300 transition-opacity duration-200 ${sideBarOpen ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <a
                        href="/"
                        className="hover:text-gray-200 transition-colors"
                    >
                        Home
                    </a>
                    <p
                        className="hover:text-gray-200 transition-colors"
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