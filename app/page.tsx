import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{ backgroundColor: "#FEEEDF" }}
      className="flex items-center justify-center font-sans "
    >
      <header className="absolute top-6 left-8 right-8 flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
        <Image
          
          src="/logo.svg"
          alt="logo.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex items-center gap-4">
          <Link href="/Dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Dashboard
          </Link>
          <Link href="/cards" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Cards
          </Link>
        </div>
      </header>

      <main className="flex min-h-screen w-full flex-col justify-between py-32 max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 text-left w-full max-w-[1200px] mx-auto">
          <div className="flex-1 flex flex-col gap-5 justify-center items-start">
            <h1
              style={{ color: "#173C46" }}
              className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50"
            >
              Welcome! This is HackSpark
            </h1>
            <p
              style={{ color: "#173C46" }}
              className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400"
            >
              Got a hackathon coming up? Tell us your track, your team’s skills, what you’re passionate about, and more — and we’ll provide you with the perfect project idea!{" "}
            </p>

            <Link
              href="/Dashboard"
              style={{ backgroundColor: "#173C46", color: "white" }}
              className="px-4 py-1.5 rounded-md shadow-md font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <div
              className="w-full max-w-[400px] h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500"
              style={{ backgroundColor: "#173C46" }}
            >
              Image Placeholder
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "#DEE5D4" }}
          className="w-full rounded-xl mt-32"
        >
          <section className="px-16 py-18 flex flex-col items-start gap-12 max-w-[1200px] mx-auto">
            <h2 className="text-[28px] font-semibold text-black dark:text-zinc-50 leading-9">
              Guide:
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
              <div
                className="w-full max-w-xl rounded-xl h-[200px] p-6 flex flex-col justify-center"
                style={{ backgroundColor: "#B8C0AD" }}
              >
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
                  First Text Block
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  This is the content for the first text block. You can write anything here.
                </p>
              </div>
              <div className="sm:w-1/2 flex justify-center items-center">
                <div
                  className="w-full max-w-[400px] h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                  Image Placeholder
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 w-full mt-30">
              <div className="sm:w-1/2 flex justify-center items-center">
                <div
                  className="w-full max-w-[400px] h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                  Image Placeholder
                </div>
              </div>
              <div className="flex w-full justify-center sm:justify-center">
                <div
                  className="w-full max-w-xl rounded-xl h-[200px] p-6 flex flex-col justify-center"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                  <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
                    Second Text Block
                  </h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    This is the content for the second text block. You can write anything here.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full mt-30">
              <div
                className="w-full max-w-xl rounded-xl h-[200px] p-6 flex flex-col justify-center"
                style={{ backgroundColor: "#B8C0AD" }}
              >
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
                  Third Text Block
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  This is the content for the third text block. You can write anything here.
                </p>
              </div>
              <div className="sm:w-1/2 flex justify-center items-center">
                <div
                  className="w-full max-w-[400px] h-[300px] bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-md flex items-center justify-center text-zinc-500"
                  style={{ backgroundColor: "#B8C0AD" }}
                >
                  Image Placeholder
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
