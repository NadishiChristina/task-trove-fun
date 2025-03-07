
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskCard, Task, TaskStatus } from '@/components/tasks/TaskCard';
import { PageTransition, SlideUp } from '@/components/animations/PageTransition';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  ClipboardCheck,
  Clock,
  Filter,
  ListChecks,
  Trophy,
  XCircle,
} from 'lucide-react';

// Mock data for the logged-in employee
const currentEmployee = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
};

// Mock employee tasks
const mockEmployeeTasks: Task[] = [
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

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState<Task[]>(mockEmployeeTasks);
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');
  const { toast } = useToast();
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    document.title = 'My Tasks | achieve+';
    
    // Calculate total points for completed tasks
    const points = tasks
      .filter(task => task.status === 'completed')
      .reduce((sum, task) => sum + task.points, 0);
    
    setTotalPoints(points);
  }, [tasks]);

  const handleTaskUpdate = (updatedTask: Task, newStatus: TaskStatus) => {
    const updated = { ...updatedTask, status: newStatus };
    
    // Show toast when task is completed
    if (newStatus === 'completed' && updatedTask.status !== 'completed') {
      toast({
        title: `${updatedTask.points} Points Earned! 🎉`,
        description: `You've completed "${updatedTask.title}" and earned ${updatedTask.points} points!`,
      });
    }
    
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updated : task))
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
              <h1 className="text-3xl font-bold">My Tasks</h1>
              <p className="text-muted-foreground mt-1">
                View and manage your assigned tasks
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <SlideUp delay={0}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    My Tasks
                  </CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Total assigned tasks
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
                    Tasks you're working on
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
                    Tasks you've completed
                  </p>
                </CardContent>
              </Card>
            </SlideUp>
            
            <SlideUp delay={0.3}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Points Earned
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalPoints}</div>
                  <p className="text-xs text-muted-foreground">
                    From completed tasks
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
