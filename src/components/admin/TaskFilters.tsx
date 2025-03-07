
import { Button } from '@/components/ui/button';
import { CheckCircle, ClipboardCheck, Clock, ListChecks, XCircle } from 'lucide-react';
import { TaskStatus } from '@/components/tasks/TaskCard';

type TaskFiltersProps = {
  currentFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
};

export function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={currentFilter === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('all')}
        className="gap-2"
      >
        <ListChecks className="h-4 w-4" /> All
      </Button>
      <Button
        variant={currentFilter === 'todo' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('todo')}
        className="gap-2"
      >
        <ClipboardCheck className="h-4 w-4" /> To Do
      </Button>
      <Button
        variant={currentFilter === 'in-progress' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('in-progress')}
        className="gap-2"
      >
        <Clock className="h-4 w-4" /> In Progress
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('completed')}
        className="gap-2"
      >
        <CheckCircle className="h-4 w-4" /> Completed
      </Button>
      <Button
        variant={currentFilter === 'cancelled' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange('cancelled')}
        className="gap-2"
      >
        <XCircle className="h-4 w-4" /> Cancelled
      </Button>
    </div>
  );
}
