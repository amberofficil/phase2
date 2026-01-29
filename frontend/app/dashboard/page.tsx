'use client';

import { useState, useEffect, useMemo } from 'react';
import { TaskList } from '../../components/common/TaskList';
import { CreateTaskForm } from '../../components/common/CreateTaskForm';
import { FilterControls } from '../../components/common/FilterControls';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../providers/AuthProvider';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// ✅ SAFE API BASE URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://amberofficial-todo.hf.space';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // ---------------------------- PROTECT PAGE ----------------------------
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // ---------------------------- FETCH TASKS ----------------------------
  useEffect(() => {
    const fetchTasks = async () => {
      if (!isAuthenticated) return; // don't fetch if not logged in

      try {
        setIsLoadingTasks(true);

        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/tasks/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          throw new Error(await res.text());
        }

        const data = await res.json();
        setTasks(data?.data?.tasks ?? []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
      } finally {
        setIsLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated, router]);

  // ---------------------------- FILTER + SORT ----------------------------
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'pending') result = result.filter(t => t.status === 'pending');
    if (filter === 'completed') result = result.filter(t => t.status === 'completed');

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'date') {
        comparison =
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime();
      } else if (sortBy === 'priority') {
        comparison = a.status === 'completed' ? 1 : -1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, filter, sortBy, sortOrder]);

  // ---------------------------- TASK HANDLERS ----------------------------
  const handleTaskCreated = (task: Task) => setTasks(prev => [task, ...prev]);
  const handleTaskUpdated = (task: Task) =>
    setTasks(prev => prev.map(t => (t.id === task.id ? task : t)));
  const handleTaskDeleted = (id: string) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  // ---------------------------- LOADING ----------------------------
  if (isLoading || isLoadingTasks) {
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
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No tasks yet
            </h3>
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
