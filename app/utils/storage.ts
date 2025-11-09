import { FormData } from "@/app/formfile/formTypes";
import { ChatHistory } from "@/app/exportType/types";

// 1. Define the data structures for storage
export interface StoredProject extends FormData {
  id: string;
  title: string;
}

export interface StoredChatSession {
  id: string;
  projectId: string;
  projectTitle: string;
  history: ChatHistory;
}

export interface UserData {
  projects: StoredProject[];
  chatSessions: StoredChatSession[];
}

const STORAGE_KEY = "hackSparkUserData";

function safeGetLocalStorage(): UserData {
  if (typeof window === 'undefined') {
    return { projects: [], chatSessions: [] };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { projects: [], chatSessions: [] };
  } catch (error) {
    console.error("Failed to parse localStorage data:", error);
    return { projects: [], chatSessions: [] };
  }
}

//Retrieves all stored projects.
export function getStoredProjects(): StoredProject[] {
  return safeGetLocalStorage().projects;
}


//Retrieves all stored chat sessions.
export function getStoredChatSessions(): StoredChatSession[] {
  return safeGetLocalStorage().chatSessions;
}

//Finds a specific chat session by its project ID.
export function getChatSessionByProjectId(projectId: string): StoredChatSession | undefined {
    if (typeof window === 'undefined') return undefined;
    const data = safeGetLocalStorage();
    return data.chatSessions.find(session => session.projectId === projectId);
}

export function saveProject(formData: FormData): StoredProject {
  if (typeof window === 'undefined') throw new Error("localStorage is not available.");
  
  const data = safeGetLocalStorage();
  const newProject: StoredProject = {
    ...formData,
    id: new Date().toISOString(),
    title: formData.Hackathon || "Untitled Project",
  };

  data.projects.push(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return newProject;
}

export function saveChatSession(projectId: string, projectTitle: string, history: ChatHistory) {
  if (typeof window === 'undefined') return;

  const data = safeGetLocalStorage();
  const existingSessionIndex = data.chatSessions.findIndex(session => session.projectId === projectId);

  if (existingSessionIndex > -1) {
    data.chatSessions[existingSessionIndex].history = history;
  } else {
    const newSession: StoredChatSession = {
      id: new Date().toISOString(),
      projectId,
      projectTitle,
      history,
    };
    data.chatSessions.push(newSession);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function setProjectForEditing(project: StoredProject) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('formData', JSON.stringify(project));
}