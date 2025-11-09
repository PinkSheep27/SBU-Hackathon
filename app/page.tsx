import React from "react";
// import Image from "next/image"; // Removed Next.js import
import Link from "next/link"; // Removed Next.js import


export default function Home() {
  return (
    <div
      style={{ backgroundColor: "#FEEEDF" }}
      className="flex items-center justify-center font-sans "
    >
      <header className="absolute top-6 left-8 right-8 flex items-center justify-between text-lg font-medium text-zinc-700">
        {/* Reverted to <img> tag as requested */}
        <img
          src="/logo.svg"
          alt="logo.js logo"
          width={100}
          height={20}
          // "priority" is not a valid <img> attribute, so it's removed
        />
        <div className="flex items-center gap-4">
          <Link href="/Dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      {/* Reduced top padding from py-64 to py-32 to move content closer to header */}
      <main className="flex min-h-screen w-full flex-col justify-between py-32 max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-left w-full max-w-[1200px] mx-auto">
          <div className="flex-1 flex flex-col gap-6 justify-center items-start">
            <h1
              style={{ color: "#173C46" }}
              className="max-w-xs text-5xl font-semibold leading-tight tracking-tight text-black"
            >
              Welcome! This is SparkBot
            </h1>
            <p
              style={{ color: "#173C46" }}
              className="max-w-md text-xl leading-9 text-zinc-600"
            >
              Got a hackathon coming up? Tell us your track, your team’s skills, what you’re passionate about, and more — and we’ll provide you with the perfect project idea!{" "}
            </p>

            <button
              style={{ backgroundColor: "#173C46", color: "white" }}
              className="inline-block px-5 py-2.5 text-lg rounded-md shadow-md font-semibold hover:opacity-90 transition-opacity"
            >
              <Link href="/Dashboard">Get Started</Link>
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <div
              className="w-full max-w-[450px] h-[350px] rounded-xl shadow-md flex items-center justify-center text-white"
              style={{ backgroundColor: "#173C46" }}
            >
              <img
                src="s1.jpeg"
                alt=" Img"
                width={350}
                height={350}
              />
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "#DEE5D4" }}
          className="w-full rounded-xl mt-32"
        >
          {/* Apply padding and alignment to the section */}
          <section className="px-12 py-16 flex flex-col items-center gap-12 max-w-[1200px] mx-auto">
            <h2 className="text-4xl font-semibold text-black leading-9 self-start">
              Guide:
            </h2>

            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
              {/* Box 1 (Text) - Standardized Size */}
              <div
                className="w-full max-w-lg rounded-xl h-[350px] p-8 flex flex-col justify-center"
                style={{ backgroundColor: "#B8C0AD" }}
              >
                <h2 className="text-3xl font-semibold text-black mb-3">
                  Input your hackathon preferences and team skills to get tailored project ideas.
                </h2>
              </div>
              {/* Box 2 (Image) - Standardized Size */}
              <div className="w-full max-w-lg flex justify-center items-center">
                <div
                  className="w-full h-[350px] rounded-xl shadow-md flex items-center justify-center text-zinc-800"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                    <img
                src="s2.jpeg"
                alt=" Img"
                width={400}
                height={400}
                />
                </div>
              </div>
            </div>

            {/* Row 2 - Added margin-top (mt-12) for spacing */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full mt-12">
              {/* Box 3 (Image) - Standardized Size */}
              <div className="w-full max-w-lg flex justify-center items-center">
                <div
                  className="w-full h-[350px] rounded-xl shadow-md flex items-center justify-center text-zinc-800"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                    <img
                src="s3.jpeg"
                alt=" Img"
                width={400}
                height={400}
                />
                </div>
              </div>
               {/* Box 4 (Text) - Standardized Size */}
              <div className="flex w-full max-w-lg justify-center sm:justify-center">
                <div
                  className="w-full rounded-xl h-[350px] p-8 flex flex-col justify-center"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                  <h2 className="text-3xl font-semibold text-black mb-3">
                    Choose between generated project ideas by swiping left or right on the cards.
                  </h2>
                </div>
              </div>
            </div>

            {/* Row 3 - Added margin-top (mt-12) for spacing */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full mt-12">
              {/* Box 5 (Text) - Standardized Size */}
              <div
                className="w-full max-w-lg rounded-xl h-[350px] p-8 flex flex-col justify-center"
                style={{ backgroundColor: "#B8C0AD" }}
              >
                <h2 className="text-3xl font-semibold text-black mb-3">
                  Work on your chosen project idea with your team using our integrated chat-based AI assistant.
                </h2>
              </div>
              {/* Box 6 (Image) - Standardized Size */}
              <div className="w-full max-w-lg flex justify-center items-center">
                <div
                  className="w-full h-[350px] rounded-xl shadow-md flex items-center justify-center text-zinc-800"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                    <img
                src="s5.jpeg"
                alt=" Img"
                width={420}
                height={450}
                />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}