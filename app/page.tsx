"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProtectedNavButton from "../components/ProtectedNavButton";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="absolute top-6 left-8 right-8 flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
        <Image
          className=""
          src="/logo.svg"
          alt="logo"
          width={100}
          height={20}
          priority
        />
        <div  className="flex items-center gap-4">
          <Link href = "/auth/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Sign in
          </Link>
          <Link href = "/auth/logout" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Log out
          </Link>
        </div>
      </header>

      <main className="flex min-h-screen w-full flex-col justify-between py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-12 text-left w-full">
          
          <div className="flex-1 flex flex-col gap-5 justify-center">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              (project name)
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Looking for a starting point or more instructions? Head over to{" "}
              <Link
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </Link>{" "}
              or the{" "}
              <Link
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </Link>{" "}
              center.
            </p>

            <ProtectedNavButton>Get Started</ProtectedNavButton>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[400px] h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500">
              Image Placeholder
            </div>
          </div>
        </div>

        <section className="mt-32 w-full flex flex-col items-start gap-12">
          <div>
            <h2 className="text-[28px] font-semibold text-black dark:text-zinc-50 leading-9">
              Guide:
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 w-full">
            <div className="w-full max-w-xl">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
                First Text Block
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                This is the content for the first text block. You can write anything here.
              </p>
            </div>
            <div className="sm:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-[300px] h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500">
                Image Placeholder
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 w-full">
            <div className="sm:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-[300px] h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500">
                Image Placeholder
              </div>
            </div>

            <div className="flex w-full justify-end">
              <div className="w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
                  Second Text Block
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  This is the content for the second text block. You can write anything here.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between gap-8 w-full">
            <div className="w-full max-w-xl">
              <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
                Third Text Block
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                This is the content for the third text block. You can write anything here.
              </p>
            </div>
            <div className="sm:w-1/2 flex justify-center items-center">
              <div className="w-full max-w-[300px] h-[200px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500">
                  Image Placeholder
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
