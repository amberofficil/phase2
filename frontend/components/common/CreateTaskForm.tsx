'use client';
import { useState } from 'react';

interface Props {
  onTaskCreated: (task: any) => void;
}

export function CreateTaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState('');

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder="Task title"
        className="border p-2 rounded flex-1"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => {
          if (!title.trim()) return;
          onTaskCreated({
            id: Date.now().toString(),
            title,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setTitle('');
        }}
      >
        Add Task
      </button>
    </div>
  );
}


