import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface MarkCriteria {
  internals: number;
  practicals: number;
  semesterFinals: number;
  customFormula: string;
}

export const MarkCriteria = () => {
  const [criteria, setCriteria] = useState<MarkCriteria>({
    internals: 40,
    practicals: 20,
    semesterFinals: 40,
    customFormula: '(internals * 0.4) + (practicals * 0.2) + (semesterFinals * 0.4)',
  });

  const handleSave = () => {
    // Save the criteria
    console.log('Saving criteria:', criteria);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mark Calculation Criteria</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Internals Weightage (%)</label>
            <input
              type="number"
              value={criteria.internals}
              onChange={(e) => setCriteria({ ...criteria, internals: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Practicals Weightage (%)</label>
            <input
              type="number"
              value={criteria.practicals}
              onChange={(e) => setCriteria({ ...criteria, practicals: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Semester Finals Weightage (%)</label>
            <input
              type="number"
              value={criteria.semesterFinals}
              onChange={(e) => setCriteria({ ...criteria, semesterFinals: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Custom Formula</label>
            <input
              type="text"
              value={criteria.customFormula}
              onChange={(e) => setCriteria({ ...criteria, customFormula: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};