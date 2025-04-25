import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, Save, AlertCircle } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  semester: number;
}

interface Semester {
  number: number;
  gpa: number;
  totalCredits: number;
}

const gradePoints: Record<string, number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'F': 0,
};

export const CGPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    name: '',
    credits: 3,
    grade: 'A',
    semester: 1,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const addCourse = () => {
    if (newCourse.name.trim()) {
      setCourses(prev => [...prev, { ...newCourse, id: Date.now().toString() }]);
      setNewCourse(prev => ({ ...prev, name: '' }));
    }
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const calculateSemesterGPA = (semesterCourses: Course[]): number => {
    const totalCredits = semesterCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = semesterCourses.reduce(
      (sum, course) => sum + course.credits * gradePoints[course.grade],
      0
    );
    return totalCredits ? totalGradePoints / totalCredits : 0;
  };

  const calculateCGPA = (): number => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = courses.reduce(
      (sum, course) => sum + course.credits * gradePoints[course.grade],
      0
    );
    return totalCredits ? totalGradePoints / totalCredits : 0;
  };

  const getSemesterStats = (): Semester[] => {
    const semesterMap = courses.reduce((acc, course) => {
      if (!acc[course.semester]) {
        acc[course.semester] = { courses: [], totalCredits: 0 };
      }
      acc[course.semester].courses.push(course);
      acc[course.semester].totalCredits += course.credits;
      return acc;
    }, {} as Record<number, { courses: Course[]; totalCredits: number }>);

    return Object.entries(semesterMap).map(([number, data]) => ({
      number: parseInt(number),
      gpa: calculateSemesterGPA(data.courses),
      totalCredits: data.totalCredits,
    })).sort((a, b) => a.number - b.number);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CGPA Calculator</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Track and calculate your academic progress
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">Current CGPA:</span>
            <span className="ml-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {calculateCGPA().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newCourse.name}
                  onChange={e => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <select
                  value={newCourse.credits}
                  onChange={e => setNewCourse(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  {[1, 2, 3, 4, 5].map(credit => (
                    <option key={credit} value={credit}>{credit} Credits</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={newCourse.grade}
                  onChange={e => setNewCourse(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  {Object.keys(gradePoints).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={addCourse}
                  disabled={!newCourse.name.trim()}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Course List
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Course</th>
                      <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Credits</th>
                      <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Grade</th>
                      <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Points</th>
                      <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td className="py-3 text-sm text-gray-900 dark:text-white">{course.name}</td>
                        <td className="py-3 text-sm text-gray-600 dark:text-gray-400">{course.credits}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-sm font-medium
                            ${course.grade === 'O' || course.grade === 'A+' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            course.grade === 'A' || course.grade === 'B+' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'}`}
                          >
                            {course.grade}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                          {gradePoints[course.grade]}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Semester-wise GPA
            </h2>
            <div className="space-y-4">
              {getSemesterStats().map(semester => (
                <div
                  key={semester.number}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Semester {semester.number}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {semester.totalCredits} Credits
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full"
                        style={{ width: `${(semester.gpa / 10) * 100}%` }}
                      />
                    </div>
                    <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {semester.gpa.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all
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
    </div>
  );
};