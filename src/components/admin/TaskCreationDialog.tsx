
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Plus } from 'lucide-react';

type Employee = {
  id: string;
  name: string;
  email: string;
};

type TaskCreationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskCreate: (newTask: any) => void;
  employees: Employee[];
  isSubmitting: boolean;
};

export function TaskCreationDialog({
  isOpen, 
  onOpenChange, 
  onTaskCreate, 
  employees, 
  isSubmitting
}: TaskCreationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          onSubmit={onTaskCreate}
          onCancel={() => onOpenChange(false)}
          employees={employees}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
