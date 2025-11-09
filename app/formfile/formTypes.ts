// Define Skill structure
export interface Skill {
  skillName: string;
  proficiency: string;
}

// Define Student structure
export interface Student {
  studentName: string;
  skills: Skill[];
}

// Updated main form interface
export interface FormData {
  Hackathon: string;
  mainTheme: string;
  tracksStack: string[];
  students: Student[]; // Array for dynamic students
}

export const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Expert', 'Master'];