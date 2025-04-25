import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { TeacherDashboard } from './pages/teacher/Dashboard';
import { MarksEntry } from './pages/teacher/MarksEntry';
import { StudentDashboard } from './pages/student/Dashboard';
import { Results } from './pages/student/Results';
import { CGPACalculator } from './pages/student/CGPACalculator';
import { Performance } from './pages/student/Performance';
import { UserRole, User } from './types/auth';

// Import admin pages
import { Teachers } from './pages/admin/Teachers';
import { Students } from './pages/admin/Students';
import { Subjects } from './pages/admin/Subjects';
import { Departments } from './pages/admin/Departments';
import { AssignTeachers } from './pages/admin/AssignTeachers';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // TODO: Implement actual authentication
    setUser({
      id: '1',
      email,
      role,
      name: 'John Doe',
    });
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
              <Route path="teachers" element={<Teachers />} />
              <Route path="students" element={<Students />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="departments" element={<Departments />} />
              <Route path="assign-teachers" element={<AssignTeachers />} />
            </>
          ) : user.role === 'teacher' ? (
            <>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="marks-entry" element={<MarksEntry />} />
            </>
          ) : (
            <>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="results" element={<Results />} />
              <Route path="cgpa" element={<CGPACalculator />} />
              <Route path="performance" element={<Performance />} />
            </>
          )}
        </Route>
      </Routes>
      <Toaster position="bottom-left" />
    </BrowserRouter>
  );
}

export default App;