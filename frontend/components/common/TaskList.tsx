'use client';
import React from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated?: (task: Task) => void; // ✅ Task interface must match
  onTaskDeleted?: (id: string) => void;
}

export function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id} className="border p-2 rounded shadow-sm flex justify-between items-center">
          <span>{task.title}</span>

          <div className="flex space-x-2">
            <button
              className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => onTaskUpdated && onTaskUpdated({
                ...task,
                status: task.status === 'pending' ? 'completed' : 'pending',
                updatedAt: new Date().toISOString()
              })}
            >
              {task.status === 'pending' ? 'Complete' : 'Undo'}
            </button>

            <button
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                const newTitle = prompt('Edit task title', task.title);
                if (newTitle && onTaskUpdated) {
                  onTaskUpdated({ ...task, title: newTitle, updatedAt: new Date().toISOString() });
                }
              }}
            >
              Edit
            </button>

            <button
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => onTaskDeleted && onTaskDeleted(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
