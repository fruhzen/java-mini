import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  UserPlus,
  LogOut,
  Settings,
  Bell,
  BarChart,
} from 'lucide-react';
import { UserRole } from '../../types/auth';

interface SidebarProps {
  role: UserRole;
  onLogout: () => void;
}

const adminLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student-management', icon: GraduationCap, label: 'Student Management' },
  { to: '/faculty-management', icon: Users, label: 'Faculty Management' },
  { to: '/benchmarks', icon: BarChart, label: 'Benchmarks' },
  { to: '/announcements', icon: Bell, label: 'Announcements' },
  { to: '/mark-criteria', icon: Settings, label: 'Mark Criteria' },
];

const teacherLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/marks-entry', icon: BookOpen, label: 'Marks Entry' },
  { to: '/semester-results', icon: GraduationCap, label: 'Semester Results' },
];

export const Sidebar: React.FC<SidebarProps> = ({ role, onLogout }) => {
  const links = role === 'admin' ? adminLinks : teacherLinks;

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">SAT Results</h2>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition-all
              ${isActive 
                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 
            hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};