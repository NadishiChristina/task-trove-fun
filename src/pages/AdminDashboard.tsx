import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { TaskCard, Task, TaskStatus } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { PageTransition, SlideUp } from '@/components/animations/PageTransition';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart3,
  CheckCircle,
  ClipboardCheck,
  Clock,
  Filter,
  ListChecks,
  Plus,
  Trophy,
  Users,
  XCircle,
} from 'lucide-react';

// Mock data
const mockEmployees = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Q3 sales report',
    description: 'Analyze and compile the sales data for Q3. Present findings in a clear, concise report with visualizations.',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2023-10-15'),
    points: 30,
    assignedTo: {
      id: '1',
      name: 'Alex Johnson',
    },
    createdBy: {
      id: 'admin1',
      name: 'Admin User',
    },
    createdAt: new Date('2023-09-28'),
  },
  {
    id: '2',
    title: 'Update customer onboarding documentation',
    description: 'Review and update the customer onboarding documentation to reflect recent process changes.',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date('2023-10-20'),
    points: 15,
    assignedTo: {
      id: '2',
      name: 'Sarah Williams',
    },
    createdBy: {
      id: 'admin1',
      name: 'Admin User',
    },
    createdAt: new Date('2023-09-29'),
  },
  {
    id: '3',
    title: 'Design new marketing collateral',
    description: 'Create new marketing materials for upcoming product launch, including digital ads and brochures.',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date('2023-10-05'),
    points: 25,
    assignedTo: {
      id: '3',
      name: 'Michael Brown',
    },
    createdBy: {
      id: 'admin1',
      name: 'Admin User',
    },
    createdAt: new Date('2023-09-20'),
    updatedAt: new Date('2023-10-04'),
  },
  {
    id: '4',
    title: 'Implement new security protocols',
    description: 'Roll out new security measures across all departments based on recent audit findings.',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2023-10-25'),
    points: 40,
    assignedTo: {
      id: '1',
      name: 'Alex Johnson',
    },
    createdBy: {
      id: 'admin1',
      name: 'Admin User',
    },
    createdAt: new Date('2023-09-30'),
  },
];

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

  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === filter);

  const getTasksCountByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status).length;
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
              <Dialog open={isCreatingTask} onOpenChange={setIsCreatingTask}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <TaskForm
                    onSubmit={handleTaskCreate}
                    onCancel={() => setIsCreatingTask(false)}
                    employees={mockEmployees}
                    isSubmitting={isSubmitting}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <SlideUp delay={0}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tasks
                  </CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all statuses
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
            
            <SlideUp delay={0.1}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    In Progress
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {getTasksCountByStatus('in-progress')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Tasks currently being worked on
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
            
            <SlideUp delay={0.2}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {getTasksCountByStatus('completed')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully completed tasks
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
            
            <SlideUp delay={0.3}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Team Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockEmployees.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active team members
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
          </div>

          {/* Tasks Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="gap-2"
            >
              <ListChecks className="h-4 w-4" /> All
            </Button>
            <Button
              variant={filter === 'todo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('todo')}
              className="gap-2"
            >
              <ClipboardCheck className="h-4 w-4" /> To Do
            </Button>
            <Button
              variant={filter === 'in-progress' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('in-progress')}
              className="gap-2"
            >
              <Clock className="h-4 w-4" /> In Progress
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" /> Completed
            </Button>
            <Button
              variant={filter === 'cancelled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('cancelled')}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" /> Cancelled
            </Button>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <SlideUp key={task.id} delay={index * 0.05}>
                  <TaskCard task={task} onUpdate={handleTaskUpdate} />
                </SlideUp>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Filter className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  There are no tasks that match your current filter.
                </p>
                <Button onClick={() => setFilter('all')}>Show all tasks</Button>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
}
