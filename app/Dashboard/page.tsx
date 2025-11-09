"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sideBarOpen, setSidebarOpen] = useState(true);

  const projects = [
    { name: "Alpha Project", createdAt: "2025-01-01" },
    { name: "Beta Board", createdAt: "2025-02-15" },
    { name: "Gamma Tasl", createdAt: "2025-03-10" },
  ];
  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

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
          {/* 3. Added the Logout link here */}
          <Link
            href="/auth/logout"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Logout
          </Link>
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
                onClick={() => router.push("/dashbaord/create")}
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

          <section>
            <ul className="space-y-3">
              {filtered.map((project, index) => (
                <li
                  key={index}
                  className="flex justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-md text-zinc-800 dark:text-zinc-100"
                >
                  <span>{project.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                    Created: {project.createdAt}
                  </span>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="text-zinc-500">No results found</li>
              )}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}