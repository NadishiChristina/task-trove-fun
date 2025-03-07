
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/animations/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { TaskStatus, Task } from '@/components/tasks/TaskCard';

// Import extracted components
import { AdminStats } from '@/components/admin/AdminStats';
import { TaskFilters } from '@/components/admin/TaskFilters';
import { TasksGrid } from '@/components/admin/TasksGrid';
import { TaskCreationDialog } from '@/components/admin/TaskCreationDialog';

// Import mock data
import { mockEmployees, mockTasks } from '@/data/mockData';

export default function AdminDashboard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Admin Dashboard | achieve+';
  }, []);

  const handleTaskCreate = (newTask: any) => {
    setIsSubmitting(true);
    
    // Simulating API call delay
    setTimeout(() => {
      const task = {
        ...newTask,
        id: `task-${Date.now()}`,
        createdBy: {
          id: 'admin1',
          name: 'Admin User',
        },
      };
      
      setTasks([task, ...tasks]);
      setIsCreatingTask(false);
      setIsSubmitting(false);
      
      toast({
        title: 'Task created',
        description: 'New task has been created successfully.',
      });
    }, 1000);
  };

  const handleTaskUpdate = (updatedTask: Task, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage tasks for your team
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <TaskCreationDialog 
                isOpen={isCreatingTask}
                onOpenChange={setIsCreatingTask}
                onTaskCreate={handleTaskCreate}
                employees={mockEmployees}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Stats Summary */}
          <AdminStats 
            tasks={tasks} 
            employeesCount={mockEmployees.length} 
          />

          {/* Tasks Filters */}
          <TaskFilters 
            currentFilter={filter} 
            onFilterChange={setFilter} 
          />

          {/* Tasks Grid */}
          <TasksGrid 
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            onTaskUpdate={handleTaskUpdate}
          />
        </div>
      </PageTransition>
    </Layout>
  );
}
