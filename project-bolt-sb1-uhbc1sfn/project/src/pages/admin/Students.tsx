import React, { useState } from 'react';
import { GraduationCap, UserPlus, Search } from 'lucide-react';
import { AddStudentModal } from '../../components/modals/AddStudentModal';
import toast from 'react-hot-toast';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  department: string;
  program: string;
  yearOfStudy: string;
  email: string;
}

export const Students = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleAddStudent = (studentData: any) => {
    // Get the department's short name
    const deptShortName = studentData.department.split(' ')[0];
    
    // Generate registration number
    const currentYear = '2025';
    const departmentCode = deptShortName.substring(0, 2).toUpperCase();
    const sequence = (students.length + 1).toString().padStart(4, '0');
    const registrationNumber = `${currentYear}${departmentCode}${sequence}`;

    const newStudent: Student = {
      id: Date.now().toString(),
      name: studentData.fullName,
      registrationNumber,
      department: studentData.department,
      program: studentData.program,
      yearOfStudy: studentData.yearOfStudy,
      email: studentData.email,
    };

    setStudents(prev => [...prev, newStudent]);
    setIsModalOpen(false);
    toast.success('Student added successfully!');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Manage all students in the system</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <UserPlus size={20} />
          Add Student
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Reg. No</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Department</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Program</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Year</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">{student.registrationNumber}</td>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">{student.name}</td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{student.department}</td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{student.program}</td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{student.yearOfStudy}</td>
                  <td className="py-4">
                    <button className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </div>
  );
};