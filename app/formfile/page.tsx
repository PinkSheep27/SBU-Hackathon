"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import FormPage from './FormPage';
import { ChatSetting } from "../exportType/types";
import { FormData, PROFICIENCY_LEVELS } from './formTypes';
import { saveProject } from "../utils/storage";

// --- Helper function to get default form data ---
const getDefaultFormData = (): FormData => ({
  Hackathon: '',
  mainTheme: '',
  tracksStack: [''],
  students: [{ 
    studentName: '', 
    skills: [{ skillName: '', proficiency: PROFICIENCY_LEVELS[1] }] 
  }],
});

// --- New Initializer Function ---
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return { 
      data: getDefaultFormData(), 
      showForm: true, 
      runEffect: false 
    };
  }
  const storedFormData = localStorage.getItem('formData');
  if (storedFormData) {
    localStorage.removeItem('formData');
    return {
      data: JSON.parse(storedFormData) as FormData,
      showForm: false,
      runEffect: true,
    };
  }
  return { 
    data: getDefaultFormData(), 
    showForm: true, 
    runEffect: false 
  };
};

// FIX 1 (Memoization): Moved settings OUTSIDE the component.
// This makes it a true constant.
const AI_SETTINGS: ChatSetting = {
  temperature: 1,
  model: "gemini-2.5-flash-lite",
  systemInstructions: `You are an elite hackathon idea generator. Your task is to generate five different creative, feasible, and relevant project idea. 
    The output MUST be in Markdown format and strictly follow this structure:
    ### Project Idea Title
    **Relevance to Theme:** [Explain briefly]
    **Core Technology:** [List 3-5 primary technologies]
    **Team Fit:** [How the team's skills apply]
    **Concept:** [A concise, single paragraph description of the product and its primary function.]
    **Bonus Feature:** [A single, ambitious feature to impress judges.]`,
};

// ------------------------------------------------

export default function Home() {
  const router = useRouter();
  const [initialState] = useState(getInitialState);
  const [showForm, setShowForm] = useState(initialState.showForm);
  const [formData, setFormData] = useState<FormData>(initialState.data);
  const [ideaResponse, setIdeaResponse] = useState<string>("");
  
  // The 'settings' state [useState] is now removed from here.

  const handleFormSubmitFromFormPage = (submittedData: FormData) => {
    setFormData(submittedData);
    setShowForm(false);
    generateIdeas(submittedData);
  };

  // Wrapped generateIdeas in useCallback
  const generateIdeas = useCallback(async (dataToProcess: FormData) => {
    // 1. Data Cleaning
    const newProject = saveProject(dataToProcess);
    const projectId = newProject.id;
    const projectTitle = newProject.title;

    const submissionData: FormData = {
        ...dataToProcess,
        tracksStack: dataToProcess.tracksStack.filter(tracks => tracks.trim() !== ''),
        students: dataToProcess.students
            .map(student => ({
                ...student,
                skills: student.skills.filter(skill => skill.skillName.trim() !== ''),
            }))
            .filter(student => student.studentName.trim() !== '' || student.skills.length > 0),
    };

    // 2. Prompt Construction
    const prompt = `
    Hackathon: ${submissionData.Hackathon}
    Main Theme: ${submissionData.mainTheme}
    Required Tracks Stack: ${submissionData.tracksStack.join(', ')}
    Team Members and Skills: ${submissionData.students.map(s => 
        `${s.studentName || 'Unamed Member'} (Skills: ${s.skills.map(sk => `${sk.skillName} - ${sk.proficiency}`).join(', ')})`
    ).join('; ')}
    `;

    // 3. API Call
    try {
        setIdeaResponse("Generating ideas... Please wait.");
        
        const response = await fetch("/api/generate-idea", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: prompt,
                settings: AI_SETTINGS, // Use the constant
            }),
        });

        const data = await response.json();
        if (data.error || !response.ok) {
            console.error("AI Error:", data.error);
            setIdeaResponse(`Error: Failed to generate idea. ${data.error || response.statusText}`);
            return;
        }
       localStorage.setItem('temp_aiResponse', data.response);

        // Redirect to the cards page with the new project ID and title
        router.push(`/cards?projectId=${encodeURIComponent(projectId)}&projectTitle=${encodeURIComponent(projectTitle)}`);

    // FIX 2 (Unexpected any): Changed 'any' to 'unknown' and added a type check.
    } catch (error: unknown) {
        console.error("Request Failed:", error);
        let errorMessage = "A network error occurred. Please try again.";
        if (error instanceof Error) {
            errorMessage += ` Details: ${error.message}`;
        }
        setIdeaResponse(errorMessage);
    }
  }, [router]);

  // Replaced useEffect
  useEffect(() => {
    if (initialState.runEffect) {
      generateIdeas(initialState.data);
    }
  }, [initialState, generateIdeas]);

  // --- JSX Rendering ---
  return (
    <main className="min-h-screen flex items-start justify-center p-4 sm:p-6 font-inter" style={{ backgroundColor: "#DEE5D4"}}>
      <div className="w-full max-w-2xl bg-white p-2 shadow-2xl rounded-xl mt-8" style={{ backgroundColor: "#EA627F"}}>
        {showForm ? (
          <FormPage onFormSubmit={handleFormSubmitFromFormPage} />
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
              Generated Project Idea 💡
            </h1>
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h2 className="text-xl font-bold text-gray-700 mb-2">Generated Ideas:</h2>
                <div 
                    className="prose max-w-none" 
                    dangerouslySetInnerHTML={{ __html: ideaResponse.replace(/\n/g, '<br/>') }}
                />
                {ideaResponse === "" && <p className="text-gray-500">Submit the form to generate project ideas.</p>}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
            >
              Go Back to Form
            </button>
          </>
        )}
      </div>
    </main>
  );
}