import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { TeacherDashboard } from './pages/teacher/Dashboard';
import { MarksEntry } from './pages/teacher/MarksEntry';
import { StudentDashboard } from './pages/student/Dashboard';
import { UserRole, User } from './types/auth';

// Import new admin pages
import { MarkCriteria } from './pages/admin/MarkCriteria';
import { StudentManagement } from './pages/admin/StudentManagement';
import { FacultyManagement } from './pages/admin/FacultyManagement';
import { Benchmarks } from './pages/admin/Benchmarks';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // Create a mock user based on role
    const mockUser = {
      id: '1',
      email,
      role,
      name: role === 'admin' ? 'Admin User' : role === 'teacher' ? 'John Doe' : 'Student Name',
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <>
        <LoginForm onSubmit={handleLogin} />
        <Toaster position="bottom-left" />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardLayout role={user.role} onLogout={handleLogout} />}
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          {user.role === 'admin' ? (
            <>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="student-management" element={<StudentManagement />} />
              <Route path="faculty-management" element={<FacultyManagement />} />
              <Route path="mark-criteria" element={<MarkCriteria />} />
              <Route path="benchmarks" element={<Benchmarks />} />
            </>
          ) : user.role === 'teacher' ? (
            <>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="marks-entry" element={<MarksEntry />} />
            </>
          ) : (
            <Route path="dashboard" element={<StudentDashboard />} />
          )}
        </Route>
      </Routes>
      <Toaster position="bottom-left" />
    </BrowserRouter>
  );
}

export default App;