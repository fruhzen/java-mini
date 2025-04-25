import React from 'react';
import { BarChart as BarChartIcon, PieChart, TrendingUp, Users } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

const stats: StatCard[] = [
  { title: 'Total Students', value: '850', change: '+5%', trend: 'up' },
  { title: 'Pass Percentage', value: '92%', change: '+2%', trend: 'up' },
  { title: 'Average CGPA', value: '8.2', change: '+0.3', trend: 'up' },
  { title: 'Fail Percentage', value: '8%', change: '-2%', trend: 'down' },
];

export const Benchmarks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Academic Benchmarks</h1>
        <p className="text-gray-600">Overview of academic performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <span className={`ml-2 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Department-wise Performance</h2>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <BarChartIcon size={48} className="text-gray-400" />
            <span className="ml-2 text-gray-500">Bar Chart Visualization</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Grade Distribution</h2>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <PieChart size={48} className="text-gray-400" />
            <span className="ml-2 text-gray-500">Pie Chart Visualization</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">CGPA Trends</h2>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <TrendingUp size={48} className="text-gray-400" />
            <span className="ml-2 text-gray-500">Line Chart Visualization</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Student Distribution</h2>
          <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <Users size={48} className="text-gray-400" />
            <span className="ml-2 text-gray-500">Distribution Chart</span>
          </div>
        </div>
      </div>
    </div>
  );
};