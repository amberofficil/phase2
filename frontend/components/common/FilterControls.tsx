'use client';

import React from 'react';

interface FilterControlsProps {
  filter?: 'all' | 'pending' | 'completed';
  setFilter?: (filter: 'all' | 'pending' | 'completed') => void;
  taskCount?: number;
  sortBy?: 'date' | 'priority' | 'title';
  sortOrder?: 'asc' | 'desc';
  setSortBy?: (sortBy: any) => void;
  setSortOrder?: (sortOrder: any) => void;
}

export function FilterControls({
  filter,
  setFilter,
  taskCount,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}: FilterControlsProps) {
  return (
    <div className="flex justify-between items-center py-2 text-sm text-gray-600">
      <div>Total Tasks: {taskCount}</div>
      <div className="space-x-2">
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setFilter?.('all')}
        >
          All
        </button>
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setFilter?.('pending')}
        >
          Pending
        </button>
        <button
          className="px-2 py-1 border rounded"
          onClick={() => setFilter?.('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

