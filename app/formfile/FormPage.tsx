"use client";

import React, { useState } from "react";

import {
  FormData,
  PROFICIENCY_LEVELS
} from './formTypes'; // Ensure path is correct

interface FormPageProps {
  onFormSubmit: (data: FormData) => void;
}

const FormPage: React.FC<FormPageProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    Hackathon: '',
    mainTheme: '',
    tracksStack: [''],
    students: [{
      studentName: '',
      skills: [{ skillName: '', proficiency: PROFICIENCY_LEVELS[1] }]
    }],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTracksChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTracksStack = [...formData.tracksStack];
    newTracksStack[index] = event.target.value;

    setFormData({
      ...formData,
      tracksStack: newTracksStack,
    });
  };

  const handleAddTracks = () => {
    setFormData({
      ...formData,
      tracksStack: [...formData.tracksStack, ''],
    });
  };

  const handleRemoveTracks = (index: number) => {
    const newTracksStack = formData.tracksStack.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tracksStack: newTracksStack,
    });
  };

  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>, studentIndex: number) => {
    const newStudents = [...formData.students];
    newStudents[studentIndex].studentName = e.target.value;
    setFormData({ ...formData, students: newStudents });
  };

  const handleAddStudent = () => {
    setFormData({
      ...formData,
      students: [...formData.students, { studentName: '', skills: [{ skillName: '', proficiency: PROFICIENCY_LEVELS[1] }] }]
    });
  };

  const handleRemoveStudent = (studentIndex: number) => {
    const newStudents = formData.students.filter((_, i) => i !== studentIndex);
    setFormData({ ...formData, students: newStudents });
  };

  const handleSkillChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    studentIndex: number,
    skillIndex: number
  ) => {
    const newStudents = [...formData.students];
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (targetName === 'skillName') {
      newStudents[studentIndex].skills[skillIndex].skillName = targetValue;
    } else if (targetName === 'proficiency') {
      newStudents[studentIndex].skills[skillIndex].proficiency = targetValue;
    }

    setFormData({ ...formData, students: newStudents });
  };

  const handleAddSkill = (studentIndex: number) => {
    const newStudents = [...formData.students];
    newStudents[studentIndex].skills.push({ skillName: '', proficiency: PROFICIENCY_LEVELS[1] });
    setFormData({ ...formData, students: newStudents });
  };

  const handleRemoveSkill = (studentIndex: number, skillIndex: number) => {
    const newStudents = [...formData.students];
    newStudents[studentIndex].skills = newStudents[studentIndex].skills.filter((_, i) => i !== skillIndex);
    setFormData({ ...formData, students: newStudents });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFormSubmit(formData); // Call the prop function with formData
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-6 font-inter">
      <div className="w-full max-w-2xl bg-white p-8 shadow-2xl rounded-xl mt-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
          Generate Project Idea
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6 border-b pb-6 border-gray-200">
            <h2 className="text-xl font-bold text-gray-700">Project Context</h2>
            <div>
              <label htmlFor="hackathonName" className="block text-sm font-medium text-gray-700 mb-1">
                Hackathon Name
              </label>
              <input
                id="hackathonName"
                required
                type="text"
                placeholder="e.g., Google Code Jam"
                name="Hackathon"
                value={formData.Hackathon}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="mainTheme" className="block text-sm font-medium text-gray-700 mb-1">
                Main Theme
              </label>
              <input
                id="mainTheme"
                required
                type="text"
                placeholder="e.g., Sustainability or AI Ethics"
                name="mainTheme"
                value={formData.mainTheme}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          </div>

          <div className="space-y-4 border-b pb-6 border-gray-200">
            <label className="block text-xl font-bold text-gray-700">
              Tracks Stack
            </label>
            <div className="space-y-3">
              {formData.tracksStack.map((tracks, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    placeholder={`Tracks #${index + 1}`}
                    name={`tracksStack-${index}`}
                    value={tracks}
                    onChange={(e) => handleTracksChange(e, index)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 transition duration-150"
                  />
                  {formData.tracksStack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTracks(index)}
                      className="text-sm px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 flex-shrink-0"
                      aria-label={`Remove tracks ${index + 1}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddTracks}
              className="flex items-center justify-center gap-1 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add Tracks
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700">Team Members and Skills</h2>

            <div className="space-y-6">
              {formData.students.map((student, studentIndex) => (
                <div key={studentIndex} className="p-4 border-2 border-indigo-200 rounded-lg bg-indigo-50 shadow-inner space-y-4">

                  <div className="flex justify-between items-center pb-2 border-b border-indigo-300">
                    <h4 className="text-lg font-semibold text-indigo-700">Student #{studentIndex + 1}</h4>
                    {formData.students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStudent(studentIndex)}
                        className="text-xs px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 transition duration-150"
                      >
                        Remove Student
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Student Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Student Name"
                      value={student.studentName}
                      onChange={(e) => handleStudentNameChange(e, studentIndex)}
                      className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-3 p-3 bg-white rounded-lg border border-indigo-100">
                    <h5 className="text-md font-medium text-indigo-700">Skills</h5>
                    {student.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex gap-2 items-center">
                        <input
                          type="text"
                          required
                          name="skillName"
                          placeholder="Skill (e.g., React, Python)"
                          value={skill.skillName}
                          onChange={(e) => handleSkillChange(e, studentIndex, skillIndex)}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
                        />
                        <select
                          name="proficiency"
                          value={skill.proficiency}
                          onChange={(e) => handleSkillChange(e, studentIndex, skillIndex)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500 w-1/3"
                        >
                          {PROFICIENCY_LEVELS.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        {student.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(studentIndex, skillIndex)}
                            className="text-xs px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150 flex-shrink-0"
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddSkill(studentIndex)}
                      className="mt-2 text-xs flex items-center gap-1 py-1 px-3 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition duration-150"
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddStudent}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              Add Team Member
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-6"
          >
            Generate Idea
          </button>
        </form>

      </div>
    </div>
  );
};

export default FormPage;