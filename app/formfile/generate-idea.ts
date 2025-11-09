// import { GoogleGenerativeAI } from "@google/generative-ai";
// import type { NextApiRequest, NextApiResponse } from 'next';

// // Initialize the Gemini Client with your API Key
// // IMPORTANT: The GEMINI_API_KEY should be an environment variable.
// const apiKey = process.env.GEMINI_API_KEY;

// if(!apiKey){
//     throw new Error("api key not found");
// }
// const ai = new GoogleGenerativeAI(apiKey);



// // Define the handler function for the API route
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Only allow POST requests
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   // Destructure the data sent from the frontend
//   let { prompt, settings } = req.body;
  
//   // Basic validation
//   if (!prompt || typeof prompt !== 'string') {
//     return res.status(400).json({ error: 'Prompt is required' });
//   }

//   // Modify the prompt to instruct the AI to generate only the game, concept, and track
//   prompt = `You're going to fill out a card base off the document.
//   you will Generate the project short title. 
//   you will list out the track you used  ${prompt}`;

//   try {
//     // 1. Call the Gemini API using the correct method signature
    
//     const model = settings?.model || 'gemini-2.5-flash-lite';
//     const generativeModel = ai.getGenerativeModel({ model });

//    // 1. Define the generation configuration object
//     const generationConfig = {
//       temperature: settings?.temperature || 0.9,
//       // The SDK property name for system instructions is 'systemInstruction'
//       systemInstruction: settings?.sysTemInstructions, 
//     };

//     // 2. Call generateContent with the single GenerateContentRequest object.
//     const result = await generativeModel.generateContent({
//       // contents must be an array of Content objects
//       contents: [{
//         role: "user", 
//         parts: [{ text: prompt }]
//       }], 
      
//       // The fixed property name that resolves the TypeScript error
//       generationConfig: generationConfig, 
//     });

//     // 2. Extract the response text
//     // The result object now contains a property 'text' at the top level for simple text generation
//     const geminiResponseText = result.response.text();    res.status(200).json({ response: geminiResponseText });

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     res.status(500).json({ error: 'Failed to generate idea from AI.' });
//   }
// }
