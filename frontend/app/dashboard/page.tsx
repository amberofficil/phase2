'use client';

import { useState, useEffect, useMemo } from 'react';
import { TaskList } from '../../components/common/TaskList';
import { CreateTaskForm } from '../../components/common/CreateTaskForm';
import { FilterControls } from '../../components/common/FilterControls';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://amberofficial-todo.hf.space/api/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // ✅ Filter + Sort tasks using useMemo
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter === 'pending') result = result.filter(t => t.status === 'pending');
    if (filter === 'completed') result = result.filter(t => t.status === 'completed');

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') comparison = a.title.localeCompare(b.title);
      else if (sortBy === 'date') comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortBy === 'priority') comparison = a.status === 'completed' ? 1 : -1;

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, filter, sortBy, sortOrder]);

  // ✅ Handlers
  const handleTaskCreated = (newTask: Task) => setTasks(prev => [newTask, ...prev]);
  const handleTaskUpdated = (updatedTask: Task) =>
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
  const handleTaskDeleted = (deletedTaskId: string) =>
    setTasks(prev => prev.filter(task => task.id !== deletedTaskId));

  // ✅ Loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold text-blue-500">My Tasks</h1>
          <div className="w-full md:w-auto">
            <CreateTaskForm onTaskCreated={handleTaskCreated} />
          </div>
        </div>

        <FilterControls
          filter={filter}
          setFilter={setFilter}
          taskCount={filteredAndSortedTasks.length}
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        />

        {filteredAndSortedTasks.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm p-8 text-center mt-6">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600">Get started by creating a new task.</p>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-sm p-6 mt-6">
            <TaskList
              tasks={filteredAndSortedTasks}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          </div>
        )}
      </div>
    </div>
  );
}
