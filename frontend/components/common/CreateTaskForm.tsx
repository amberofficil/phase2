'use client';
import { useState } from 'react';
import { addTask } from '../../apis/todos'; // ✅ fixed import

interface Props {
  onTaskCreated: (task: any) => void;
}

export function CreateTaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const newTask = await addTask({
        title: title.trim(),
        description: '', // optional
      });

      onTaskCreated(newTask.task || newTask); // ✅ backend response may wrap task
      setTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 w-full md:w-auto">
      <input
        type="text"
        placeholder="Task title"
        className="border p-2 rounded flex-1 min-w-[200px]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-600 text-white rounded ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={isLoading || !title.trim()}
      >
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
