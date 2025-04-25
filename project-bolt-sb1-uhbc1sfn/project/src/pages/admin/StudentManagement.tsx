import React, { useState } from 'react';
import { Plus, Search, Filter, Bell } from 'lucide-react';
import { AddStudentModal } from '../../components/modals/AddStudentModal';

interface Student {
  id: string;
  name: string;
  regNo: string;
  department: string;
  year: number;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export const StudentManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    status: '',
  });
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const handleAddStudent = (data: any) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: data.name,
      regNo: data.regNo,
      department: data.department,
      year: parseInt(data.year),
      email: data.email,
      phone: data.phone,
      status: 'active',
    };
    setStudents([...students, newStudent]);
    setIsModalOpen(false);
  };

  const handlePostAnnouncement = () => {
    // Handle announcement posting
    console.log('Posting announcement:', announcement);
    setIsAnnouncementModalOpen(false);
    setAnnouncement('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Bell size={20} />
            New Announcement
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Departments</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="MECH">Mechanical</option>
          </select>
          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Reg. No</th>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Department</th>
              <th className="text-left py-3">Year</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="py-3">{student.regNo}</td>
                <td className="py-3">{student.name}</td>
                <td className="py-3">{student.department}</td>
                <td className="py-3">{student.year}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Announcement Modal */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">New Announcement</h2>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full h-32 p-2 border rounded-lg mb-4"
              placeholder="Enter announcement text..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAnnouncementModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handlePostAnnouncement}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Post Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};