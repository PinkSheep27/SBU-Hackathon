// File: Home.tsx (Renamed from form.tsx for export consistency)

"use client";
import React, { useState, useEffect, useCallback } from "react";
import FormPage from './FormPage';
import { ChatSetting, CardData } from "../exportType/types";
import { FormData, PROFICIENCY_LEVELS } from './formTypes';
import SwipeCards from '../cards/page';

export default function Home() {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        const parsedData: FormData = JSON.parse(storedFormData);
        return parsedData;
      }
    }
    return {
      Hackathon: '',
      mainTheme: '',
      tracksStack: [''],
      students: [{
        studentName: '',
        skills: [{ skillName: '', proficiency: PROFICIENCY_LEVELS[1] }]
      }],
    };
  });

  const [ideaResponse, setIdeaResponse] = useState<string>("");
  const [generatedCards, setGeneratedCards] = useState<CardData[]>([]); // New state for parsed cards

  const [settings] = useState<ChatSetting>({
    temperature: 1,
    model: "gemini-2.5-flash-lite",
    sysTemInstructions: `You are an elite hackathon idea generator. Your task is to choose at lease two track and generate five different creative, feasible, and relevant project idea.
The output MUST be in Markdown format and strictly follow this structure:
### Project Idea Title
**Track** [print out the track you used]
**Concept:** [A concise, single paragraph description of the product and its primary function.]`,
  });

const parseAiResponse = (markdownString: string): CardData[] => {
  console.log("Raw AI Response:", markdownString);
  const ideas: CardData[] = [];
  const ideaBlocks = markdownString.split("### ").filter(block => block.trim() !== "");

  ideaBlocks.forEach((block, index) => {
    // Match title: anything from the start of the block until the first newline or the start of "**Track**"
    const titleMatch = block.match(/^(.*?)(?=\n\*\*Track\*\*|$)/s);
    // Match track: "**Track**" followed by optional whitespace and then capture everything until the next "**Concept**" or end of block/line
    const trackMatch = block.match(/\*\*Track\*\*\s*:\s*(.*?)(?=\n\*\*Concept\*\*|$)/s); // Added ':' and made whitespace more flexible
    // Match concept: "**Concept:**" followed by optional whitespace and then capture everything until the end of the block
    const conceptMatch = block.match(/\*\*Concept:\*\*\s*(.*)/s);

    const title = titleMatch ? titleMatch[1].trim() : `Idea ${index + 1}`;
    const summary = conceptMatch ? conceptMatch[1].trim() : "No concept provided.";
    const tracksRaw = trackMatch ? trackMatch[1].trim() : "";
    console.log("tracksRaw:", tracksRaw); // Added console.log for debugging
    const tracks = tracksRaw.split(',').map(track => track.trim()).filter(track => track !== '');

    ideas.push({
      id: index + 1,
      title,
      tracks,
      summary,
    });
  });
  console.log("Parsed Cards:", ideas);
  return ideas;
};

  const handleFormSubmitFromFormPage = (submittedData: FormData) => {
    setFormData(submittedData);
    setShowForm(false);
    generateIdeas(submittedData);
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const generateIdeas = useCallback(async (dataToProcess: FormData) => {
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

    const prompt = `
    Hackathon: ${submissionData.Hackathon}
    Main Theme: ${submissionData.mainTheme}
    Required Tracks Stack: ${submissionData.tracksStack.join(', ')}
    Team Members and Skills: ${submissionData.students.map(s =>
        `${s.studentName || 'Unamed Member'} (Skills: ${s.skills.map(sk => `${sk.skillName} - ${sk.proficiency}`).join(', ')})`
    ).join('; ')}

    Using the SYSTEM INSTRUCTIONS, generate 5 project ideas based on the data above.`;

    try {
        setIdeaResponse("Generating ideas... Please wait.");
        setGeneratedCards([]); // Clear previous cards
        const response = await fetch("/api/generate-idea", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                settings: settings,
            }),
        });

        const data = await response.json();

        if (data.error || !response.ok) {
            console.error("AI Error:", data.error);
            setIdeaResponse(`Error: Failed to generate idea. ${data.error || response.statusText}`);
            return;
        }

        setIdeaResponse(data.response);
        const parsedCards = parseAiResponse(data.response);
        setGeneratedCards(parsedCards);

    } catch (error) {
        console.error("Request Failed:", error);
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        setIdeaResponse(`A network error occurred. Please try again. Details: ${errorMessage}`);
    }
  }, [setIdeaResponse, setGeneratedCards, settings, parseAiResponse]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFormData = localStorage.getItem('formData');
      if (storedFormData) {
        const parsedData: FormData = JSON.parse(storedFormData);
        setTimeout(() => setShowForm(false), 0);
        generateIdeas(parsedData);
        localStorage.removeItem('formData');
      }
    }
  }, [generateIdeas]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-6 font-inter">
      <div className="w-full max-w-2xl bg-white p-8 shadow-2xl rounded-xl mt-8">
        {showForm ? (
          <FormPage onFormSubmit={handleFormSubmitFromFormPage} />
        ) : (
          <>
            {generatedCards.length > 0 ? (
              <SwipeCards initialCards={generatedCards} />
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
              </>
            )}
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