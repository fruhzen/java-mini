import React from 'react';
import { BookOpen, GraduationCap, Trophy, Star } from 'lucide-react';

interface SubjectResult {
  id: string;
  name: string;
  code: string;
  internal: number;
  external: number;
  total: number;
  grade: string;
}

const currentResults: SubjectResult[] = [
  { id: '1', name: 'Data Structures', code: 'CS201', internal: 85, external: 78, total: 81, grade: 'A' },
  { id: '2', name: 'Database Systems', code: 'CS202', internal: 92, external: 88, total: 90, grade: 'A+' },
  { id: '3', name: 'Computer Networks', code: 'CS203', internal: 78, external: 75, total: 76, grade: 'B+' },
  { id: '4', name: 'Operating Systems', code: 'CS204', internal: 88, external: 82, total: 85, grade: 'A' },
  { id: '5', name: 'Digital Electronics Lab', code: 'CS205', internal: 95, external: 90, total: 93, grade: 'A+' },
];

const stats = [
  { title: 'Current CGPA', value: '8.9', icon: Trophy, color: 'bg-yellow-500' },
  { title: 'Current Semester', value: '3rd', icon: GraduationCap, color: 'bg-blue-500' },
  { title: 'Total Credits', value: '72', icon: Star, color: 'bg-purple-500' },
  { title: 'Subjects', value: '5', icon: BookOpen, color: 'bg-green-500' },
];

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A+': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'A': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'B+': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export const StudentDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Welcome back, Alice Johnson (CSE001)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Semester Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Subject</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Code</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Internal</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">External</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
                    <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentResults.map((result) => (
                    <tr key={result.id}>
                      <td className="py-4 text-sm text-gray-900 dark:text-white">{result.name}</td>
                      <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{result.code}</td>
                      <td className="py-4 text-sm text-gray-900 dark:text-white">{result.internal}%</td>
                      <td className="py-4 text-sm text-gray-900 dark:text-white">{result.external}%</td>
                      <td className="py-4 text-sm text-gray-900 dark:text-white">{result.total}%</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Academic Progress</h2>
            <div className="space-y-4">
              {currentResults.map((result) => (
                <div key={result.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{result.name}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{result.total}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all"
                      style={{ width: `${result.total}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upcoming Assessments</h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">FAT 2</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Operating Systems</p>
                  </div>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">In 5 days</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Assignment 3</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Computer Networks</p>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400">Due tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};