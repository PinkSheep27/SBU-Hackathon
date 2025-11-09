# Spark Bot

Spark Bot is a Next.js web application designed to help hackathon participants and project teams brainstorm project ideas. It takes user inputs—such as hackathon themes, technology tracks, and team member skills—and feeds them to the Google Gemini API to generate creative and relevant project concepts.

Ideas are presented in a Tinder-inspired swiping interface, allowing users to quickly save or discard suggestions. The idea you accepted ideas can be further developed in an integrated chatbot, which helps expand on the concept and assign team roles.

## Core Features

* **Dynamic Form:** Collects detailed information about the hackathon, theme, and team.
* **AI Idea Generation:** Uses the Google Gemini API to generate five distinct project ideas based on the form data.
* **Swipe Interface:** Built with **Framer Motion**, this allows users to accept or reject ideas with a simple swipe.
* **AI Chatbot:** An integrated chat assistant (also powered by Gemini) to flesh out an accepted project idea, suggest team roles, and answer questions.
* **Persistent Projects:** Uses browser `localStorage` to save projects and chat history, allowing users to return to their dashboard.

---

## Getting Started (Access & Installation)

Follow these steps to set up and run the project locally.

### Prerequisites

* [Node.js](https://nodejs.org/) (v20.9.0 or later)
* `npm` (v10 or later) or a compatible package manager (`yarn`, `pnpm`)
* A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 1. Environment Setup (API Key)

The application requires a Google Gemini API key to function.

1.  In the root of the project, create a new file named `.env.local`.
2.  Add your API key to this file:

    ```sh
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

    This key is used by the backend API routes (`app/api/generate-idea/route.ts` and `app/api/chat/route.ts`) to communicate with the Gemini API.

### 2. Install Dependencies

Clone the repository and navigate into the project directory. Then, run `npm install` to install all required dependencies from the `package.json` file.

```bash
# This single command installs all packages listed in package.json
npm install
```
# This single command installs all packages listed in package.json
npm install

### 3. Run the Development Server

Once installation is complete, run the development server:

```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

### How It Works (User Flow)
- Start: From the landing page, the user navigates to the Dashboard and clicks "Create" to start a new project.

- Input Form: The user fills out the "New Project Idea" form (/formfile), providing:

        Hackathon Name

        Main Theme

        Hackathon Tracks

        Teammates and their specific skills (e.g., "Simon - React (Expert)").

- Generate: On submit, the form data is compiled into a detailed prompt and sent to the /api/generate-idea endpoint.

- Swipe: The Gemini API returns a markdown-formatted string with five project ideas. The app parses this string and displays the ideas as a stack of "swipeable" cards (/cards).

- Select: The user swipes left to reject or right to accept an idea.

- Chat: Upon accepting an idea (swiping right), the user is redirected to the chatbot (/chatbot). An initial message is automatically sent to the AI, asking it to explain the chosen project and suggest team roles based on the data from the form.

- Iterate: The user can continue the conversation with the AI to refine the project. The chat history is saved to localStorage.

### Gemini API Integration
# How to Prompt (User Input)
The quality of the generated ideas depends heavily on the quality of the input.

- Be specific with the skills of each member (e.g., "React - Beginner", "Python (Data Analysis) - Expert").

- Provide the exact tracks and themes of the hackathon.

- Provide context if necessary. The system is designed to create a Team Fit section for each idea, so the more it knows about your team, the better the role suggestions will be.

The application uses a systemInstructions prompt to tell the Gemini model to act as an "elite hackathon idea generator" and to strictly follow a markdown template.

### AI Output (Project Cards)
Responses are returned from the AI in markdown with annotated sections. The model is specifically instructed to provide:

- Project Idea Title

- Relevance to Theme:

- Core Technology:

- Team Fit:

- Concept:

- Bonus Feature:

This markdown is then parsed by the parseAiResponse function to populate the swipable cards. The chatbot AI is given a different set of instructions to act as an AI helper to expand on the idea.

### Use Cases
This tool is ideal for anyone who is:

- Clueless, indecisive, or in need of inspiration for a project.

- Attending an upcoming hackathon.

- Starting a new group project for a class or for fun.

- Looking for a way to match a project idea to a team's existing skill set.

### Key Dependencies
This project is built with Next.js 16 (App Router) and TypeScript. The npm install command will install all packages from package.json, including:

# Main Dependencies
- next: The core Next.js framework.

- react & react-dom: For building the user interface.

- @google/generative-ai: The official Google client library for the Gemini API.

- framer-motion: Used for all animations, especially the card swiping mechanics.

- lucide-react: Provides the icon library used throughout the application.

# Development Dependencies
- typescript: For static typing.

- tailwindcss: For utility-first CSS styling.

- @tailwindcss/postcss: For processing Tailwind CSS.

- eslint & eslint-config-next: For code linting and maintaining standards.