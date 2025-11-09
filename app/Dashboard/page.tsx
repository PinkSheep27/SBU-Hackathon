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

  // 5. Sorting logic now uses the state variable
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.id).getTime(); // Use 'id' (timestamp) for sorting
    const dateB = new Date(b.id).getTime();

    if (sortOrder === "newest") {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });

  // 6. Filter the sorted projects
  const filtered = sortedProjects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  // 7. Fix the "Create" button link
  const handleCreateClick = () => {
    window.location.href = "/formfile"; // Changed from "/dashbaord/create"
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
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <p
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Settings
          </p>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-white dark:bg-black/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <input
                id="dashboard-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, boards or tasks..."
                className="w-full max-w-md px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCreateClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
              >
                Create
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl w-full mx-auto px-6 py-10">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
            Project Names
          </h1>
          <button
            type="button"
            onClick={toggleSortOrder}
            className="px-3 py-1 text-sm font-medium border rounded-md"
            style={{
              color: '#333',
              backgroundColor: '#F7F7F7',
              borderColor: '#D1D1D1'
            }}
          >
            Sort by: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
          </button>

          <section>
            <ul className="space-y-3">
              {filtered.map((project, index) => (
                <li
                  key={project.id}
                  className="flex justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-md text-zinc-800 dark:text-zinc-100"
                >
                  <span>{project.title}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Created: {new Date(project.id).toLocaleDateString()}
                  </span>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-zinc-500">{projects.length > 0 ? "No results found" : "No projects yet. Click 'Create' to start!"}</li>
              )}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}