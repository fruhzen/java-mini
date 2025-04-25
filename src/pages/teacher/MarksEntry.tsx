import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
}

interface MarksData {
  [key: string]: {
    fat?: number;
    assignment?: number;
    model?: number;
  };
}

const students: Student[] = [
  { id: '1', name: 'Alice Johnson', rollNumber: 'CSE001' },
  { id: '2', name: 'Bob Smith', rollNumber: 'CSE002' },
  { id: '3', name: 'Charlie Brown', rollNumber: 'CSE003' },
  { id: '4', name: 'Diana Miller', rollNumber: 'CSE004' },
];

export const MarksEntry = () => {
  const [activeTab, setActiveTab] = useState('fat');
  const [marks, setMarks] = useState<MarksData>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'fat', label: 'Final Assessment Test' },
    { id: 'assignment', label: 'Assignment' },
    { id: 'model', label: 'Model' },
  ];

  const handleMarkChange = (studentId: string, value: string) => {
    const numValue = value === '' ? undefined : Math.min(100, Math.max(0, Number(value)));
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [activeTab]: numValue,
      },
    }));
  };

  const calculateInternal = (studentId: string) => {
    const studentMarks = marks[studentId] || {};
    const fat = studentMarks.fat || 0;
    const assignment = studentMarks.assignment || 0;
    const model = studentMarks.model || 0;

    // Theory: Final = (0.6 * FAT) + (0.2 * Assignment) + (0.2 * Model)
    const internal = fat * 0.6 + assignment * 0.2 + model * 0.2;
    return Math.round(internal * 10) / 10;
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Marks Entry</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">CSE-A | Data Structures | Semester 3</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative
                  ${activeTab === tab.id
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-sm font-medium text-gray-500 dark:text-gray-400">Roll No</th>
                  <th className="pb-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="pb-4 text-sm font-medium text-gray-500 dark:text-gray-400">Marks</th>
                  <th className="pb-4 text-sm font-medium text-gray-500 dark:text-gray-400">Internal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-4 text-sm text-gray-900 dark:text-white">{student.rollNumber}</td>
                    <td className="py-4 text-sm text-gray-900 dark:text-white">{student.name}</td>
                    <td className="py-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id]?.[activeTab] || ''}
                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                        className="w-20 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </td>
                    <td className="py-4 text-sm">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
                        {calculateInternal(student.id)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all
            ${saving || saved
              ? 'bg-green-500 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
};