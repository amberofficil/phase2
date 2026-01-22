'use client';

import { useState, useEffect, useMemo } from 'react';
import { TaskList } from '../../components/common/TaskList';
import { CreateTaskForm } from '../../components/common/CreateTaskForm';
import { FilterControls } from '../../components/common/FilterControls';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // ----------------------------
  // Fetch tasks with JWT token
  // ----------------------------
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          console.warn('No token found, redirecting to login');
          router.push('/login'); // redirect if not logged in
          return;
        }

        const res = await fetch(`${API_BASE_URL}/tasks/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            router.push('/login'); // token invalid, redirect
            return;
          }
          const err = await res.text();
          throw new Error(err);
        }


        const data = await res.json();
        setTasks(data.data.tasks || []); // ✅ data inside ApiResponse.data.tasks
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  // ----------------------------
  // Filter + Sort
  // ----------------------------
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'pending') result = result.filter(t => t.status === 'pending');
    if (filter === 'completed') result = result.filter(t => t.status === 'completed');

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') comparison = a.title.localeCompare(b.title);
      else if (sortBy === 'date')
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortBy === 'priority')
        comparison = a.status === 'completed' ? 1 : -1;

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, filter, sortBy, sortOrder]);

  // ----------------------------
  // Task handlers
  // ----------------------------
  const handleTaskCreated = (newTask: Task) =>
    setTasks(prev => [newTask, ...prev]);

  const handleTaskUpdated = (updatedTask: Task) =>
    setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));

  const handleTaskDeleted = (id: string) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  // ----------------------------
  // Loading spinner
  // ----------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold text-blue-500">My Tasks</h1>
          <CreateTaskForm onTaskCreated={handleTaskCreated} />
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
