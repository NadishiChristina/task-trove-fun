
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  Star,
  Trophy,
  XCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'cancelled';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  points: number;
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
};

type TaskCardProps = {
  task: Task;
  onUpdate?: (task: Task, newStatus: TaskStatus) => void;
  isDetailView?: boolean;
  className?: string;
};

export function TaskCard({
  task,
  onUpdate,
  isDetailView = false,
  className,
}: TaskCardProps) {
  const [currentTask, setCurrentTask] = useState(task);
  const { toast } = useToast();

  const statusIcons = {
    todo: Clock,
    'in-progress': AlertTriangle,
    completed: CheckCircle2,
    cancelled: XCircle,
  };

  const statusLabels = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  const statusColors = {
    todo: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  };

  const updateStatus = (newStatus: TaskStatus) => {
    if (onUpdate) {
      const updatedTask = { ...currentTask, status: newStatus };
      setCurrentTask(updatedTask);
      onUpdate(updatedTask, newStatus);
      
      toast({
        title: 'Task updated',
        description: `Task status changed to ${statusLabels[newStatus].toLowerCase()}`,
      });
    }
  };

  const StatusIcon = statusIcons[currentTask.status];

  return (
    <div
      className={cn(
        'bg-card border rounded-lg overflow-hidden transition-all card-hover',
        className
      )}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1 font-medium",
                statusColors[currentTask.status]
              )}
            >
              <StatusIcon className="h-3 w-3" />
              {statusLabels[currentTask.status]}
            </Badge>
            
            <Badge
              variant="outline"
              className={cn(
                priorityColors[currentTask.priority]
              )}
            >
              {currentTask.priority.charAt(0).toUpperCase() + currentTask.priority.slice(1)} Priority
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => updateStatus('todo')}
                disabled={currentTask.status === 'todo'}
              >
                <Clock className="mr-2 h-4 w-4" /> Mark as To Do
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateStatus('in-progress')}
                disabled={currentTask.status === 'in-progress'}
              >
                <AlertTriangle className="mr-2 h-4 w-4" /> Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateStatus('completed')}
                disabled={currentTask.status === 'completed'}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateStatus('cancelled')}
                disabled={currentTask.status === 'cancelled'}
              >
                <XCircle className="mr-2 h-4 w-4" /> Mark as Cancelled
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <AlertCircle className="mr-2 h-4 w-4" /> View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{currentTask.title}</h3>
        
        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
          {currentTask.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due {format(currentTask.dueDate, 'MMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{currentTask.points} pts</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserAvatar
              name={currentTask.assignedTo.name}
              image={currentTask.assignedTo.avatar}
              size="sm"
            />
            <div>
              <p className="text-xs text-muted-foreground">Assigned to</p>
              <p className="text-sm font-medium">{currentTask.assignedTo.name}</p>
            </div>
          </div>
          
          {!isDetailView && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateStatus('completed')}
              disabled={currentTask.status === 'completed' || currentTask.status === 'cancelled'}
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
