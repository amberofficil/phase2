'use client';
import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../apis/todos';

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
  onTaskUpdated?: (task: Task) => void;
  onTaskDeleted?: (id: string) => void;
}

export function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) {
  const [updatingTaskIds, setUpdatingTaskIds] = useState<Set<string>>(new Set());

  const handleStatusToggle = async (task: Task) => {
    if (updatingTaskIds.has(task.id)) return; // Prevent concurrent updates

    try {
      setUpdatingTaskIds(prev => new Set(prev).add(task.id));

      const updatedStatus = task.status === 'pending' ? 'completed' : 'pending';
      const updatedTask = await updateTask(task.id, {
        ...task,
        status: updatedStatus
      });

      onTaskUpdated?.(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    } finally {
      setUpdatingTaskIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(task.id);
        return newSet;
      });
    }
  };

  const handleEdit = async (task: Task) => {
    if (updatingTaskIds.has(task.id)) return; // Prevent concurrent updates

    const newTitle = prompt('Edit task title', task.title);
    if (!newTitle || newTitle.trim() === task.title) return;

    try {
      setUpdatingTaskIds(prev => new Set(prev).add(task.id));

      const updatedTask = await updateTask(task.id, {
        title: newTitle.trim()
      });

      onTaskUpdated?.(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setUpdatingTaskIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(task.id);
        return newSet;
      });
    }
  };

  const handleDelete = async (taskId: string) => {
    if (updatingTaskIds.has(taskId)) return; // Prevent concurrent updates

    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setUpdatingTaskIds(prev => new Set(prev).add(taskId));

      await deleteTask(taskId);
      onTaskDeleted?.(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    } finally {
      setUpdatingTaskIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task.id} className="border p-2 rounded shadow-sm flex justify-between items-center">
          <span className={`${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </span>

          <div className="flex space-x-2">
            <button
              className={`px-2 py-1 rounded ${
                updatingTaskIds.has(task.id)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : task.status === 'pending'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white`}
              onClick={() => handleStatusToggle(task)}
              disabled={updatingTaskIds.has(task.id)}
            >
              {updatingTaskIds.has(task.id)
                ? '...'
                : task.status === 'pending' ? 'Complete' : 'Undo'}
            </button>

            <button
              className={`px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                updatingTaskIds.has(task.id) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              onClick={() => handleEdit(task)}
              disabled={updatingTaskIds.has(task.id)}
            >
              Edit
            </button>

            <button
              className={`px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 ${
                updatingTaskIds.has(task.id) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              onClick={() => handleDelete(task.id)}
              disabled={updatingTaskIds.has(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
