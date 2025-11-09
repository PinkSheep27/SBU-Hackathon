import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{ backgroundColor: "#FEEEDF" }}
      className="flex items-center justify-center font-sans "
    >
      <header className="absolute top-6 left-8 right-8 flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex items-center gap-4">
          <a href="/signin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Sign in
          </a>
          <a href="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Register
          </a>
        </div>
      </header>

<<<<<<< HEAD
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
                <div className="flex items-center gap-4">
                    <Link href="/auth/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Sign in
                    </Link>
                    <Link href="/auth/logout" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
=======
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
              {/* <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </a>{" "} */}
              {/* center. */}
            </p>

            {/* <ProtectedNavButton>Get Started</ProtectedNavButton> */}
            <button
              style={{ backgroundColor: "#173C46", color: "white" }}
              className="px-4 py-1.5 rounded-md shadow-md font-semibold hover:opacity-90 transition-opacity"
            >
              {/* {children} */}
              Get Started
            </button>
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
          {/* <section className="mt-32 w-full flex flex-col items-start gap-12"> */}
          <section className="px-16 py-18 flex flex-col items-start gap-12 max-w-[1200px] mx-auto">
            {/* <div> */}
            <h2 className="text-[28px] font-semibold text-black dark:text-zinc-50 leading-9">
              Guide:
            </h2>
            {/* </div> */}

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
>>>>>>> 44b5a4dc49ea757e9790ba8309edc6b37d764105
}


// {/* <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div> */}


// "use client";

// import React, { use, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const router = useRouter();  
//   const[query, setQuery] = useState("");
//   // const [projects, setProjects] = useState( [
//   //     { id: 1, name: "Alpha Project", createdAt: new Date("2025-01-01")},
//   //     { id: 2, name: "Beta Board", createdAt: new Date("2025-02-15")},
//   //     { id: 3, name: "Gamma Task", createdAt: new Date("2025-03-10")}
//   // ]);
//   // const [newProjectName, setNewProjectName] = useState("");
//   // const filtered = projects.filter( (p) => p.name.toLowerCase().includes(query.toLowerCase()) );
//   // const handleCreate = () => {
//   //   if(!newProjectName.trim()) return;
//   //   const newProject = {
//   //     id: projects.length+1, name: newProjectName, createdAt: new Date(),
//   //   };
//   // };
//   const projects = [
//     {name: "Alpha Project", createdAt: "2025-01-01"},
//     {name: "Beta Board", createdAt: "2025-02-15"},
//     {name: "Gamma Tasl", createdAt: "2025-03-10"},
//   ]
//   const filtered = projects.filter( 
//     (p) => p.name.toLowerCase().includes(query.toLowerCase())
//   );

//  return (
//    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
//      <header className="sticky top-0 z-10 bg-white dark:bg-black/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
//        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
//          <div className="flex-1">
//            {/* <label htmlFor="dashboard-search" className="sr-only">
//              Search
//            </label> */}
//            <input
//              id="dashboard-search"
//              value={query}
//              onChange={(e) => setQuery(e.target.value)}
//              placeholder="Search projects, boards or tasks..."
//              className="w-full max-w-md px-4 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//            />
//          </div>

//          <div className="flex items-center gap-2">
//            {/* <input
//               type = "text"
//               value = {newProjectName}
//               onChange = { (e) => setNewProjectName(e.target.value)}
//               placeholder="New Project Name"
//               className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900  text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             /> */}
//             <button
//              type="button"
//              // className="ml-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
//              // onClick={() => alert("Create clicked — wire up creation flow here.")}
//               onClick={ () => router.push("/dashbaord/create")}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
//            >
//              Create
//            </button>
//          </div>
//        </div>
//      </header>

//      <main className="max-w-7xl mx-auto px-6 py-10">
//        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">
//          Project Names
//        </h1>

//        <section>
//          <ul className="space-y-3">
//            {filtered.map((project, index) => (
//              <li
//                key={index}
//                // className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-md text-zinc-800 dark:text-zinc-100"
//                 className="flex justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-md text-zinc-800 dark:text-zinc-100"
//               >
//                <span>{project.name}</span>
//                 <span className="text-zinc-500 dark:text-zinc-400 text-sm">
//                   {/* {project.createdAt.toLocaleDateString()} */}
//                   Created: {project.createdAt}
//                 </span>
//              </li>
//            ))}

//            {filtered.length === 0 && (
//              <li className="text-zinc-500">No results found</li>
//            )}
//          </ul>
//        </section>
//      </main>
//    </div>
//  );
// }