import React, { useState } from 'react';
import { Users, UserPlus, Search } from 'lucide-react';
import { AddTeacherModal } from '../../components/modals/AddTeacherModal';
import toast from 'react-hot-toast';

interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  department: string;
  designation: string;
  subjects: string[];
  email: string;
}

export const Teachers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleAddTeacher = (teacherData: any) => {
    // Get the department's short name
    const deptShortName = teacherData.department.split(' ')[0];
    
    // Generate teacher ID
    const currentYear = '2025';
    const sequence = (teachers.length + 1).toString().padStart(4, '0');
    const teacherId = `${currentYear}T${sequence}`;

    const newTeacher: Teacher = {
      id: Date.now().toString(),
      name: teacherData.fullName,
      teacherId,
      department: teacherData.department,
      designation: teacherData.designation,
      subjects: teacherData.subjectsTaught || [],
      email: teacherData.email,
    };

    setTeachers(prev => [...prev, newTeacher]);
    setIsModalOpen(false);
    toast.success('Teacher added successfully!');
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teachers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Manage all teachers in the system</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <UserPlus size={20} />
          Add Teacher
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
              placeholder="Search teachers..."
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
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">ID</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Department</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Designation</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Subjects</th>
                <th className="pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">{teacher.teacherId}</td>
                  <td className="py-4 text-sm text-gray-900 dark:text-white">{teacher.name}</td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{teacher.department}</td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">{teacher.designation}</td>
                  <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                    {teacher.subjects.join(', ')}
                  </td>
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

      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTeacher}
      />
    </div>
  );
};