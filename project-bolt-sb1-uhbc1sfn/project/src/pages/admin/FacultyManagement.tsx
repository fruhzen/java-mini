import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { AddTeacherModal } from '../../components/modals/AddTeacherModal';

interface Faculty {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  subjects: string[];
  status: 'active' | 'inactive';
}

export const FacultyManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [filters, setFilters] = useState({
    department: '',
    designation: '',
    status: '',
  });

  const handleAddFaculty = (data: any) => {
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: data.fullName,
      employeeId: data.teacherId || `FAC${faculty.length + 1}`,
      department: data.department,
      designation: data.designation,
      email: data.email,
      phone: data.phoneNumber,
      subjects: data.subjectsTaught || [],
      status: 'active',
    };
    setFaculty([...faculty, newFaculty]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          <Plus size={20} />
          Add Faculty
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search faculty..."
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
            value={filters.designation}
            onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Designations</option>
            <option value="professor">Professor</option>
            <option value="associate">Associate Professor</option>
            <option value="assistant">Assistant Professor</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Employee ID</th>
              <th className="text-left py-3">Name</th>
              <th className="text-left py-3">Department</th>
              <th className="text-left py-3">Designation</th>
              <th className="text-left py-3">Subjects</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="py-3">{member.employeeId}</td>
                <td className="py-3">{member.name}</td>
                <td className="py-3">{member.department}</td>
                <td className="py-3">{member.designation}</td>
                <td className="py-3">{member.subjects.join(', ')}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
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

      <AddTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFaculty}
      />
    </div>
  );
};