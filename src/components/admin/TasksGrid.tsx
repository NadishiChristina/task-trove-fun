
import { SlideUp } from '@/components/animations/PageTransition';
import { TaskCard, Task, TaskStatus } from '@/components/tasks/TaskCard';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

type TasksGridProps = {
  tasks: Task[];
  filter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  onTaskUpdate: (updatedTask: Task, newStatus: TaskStatus) => void;
};

export function TasksGrid({ tasks, filter, onFilterChange, onTaskUpdate }: TasksGridProps) {
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === filter);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <SlideUp key={task.id} delay={index * 0.05}>
            <TaskCard task={task} onUpdate={onTaskUpdate} />
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
          <Button onClick={() => onFilterChange('all')}>Show all tasks</Button>
        </div>
      )}
    </div>
  );
}
