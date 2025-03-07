
import { Task } from '@/components/tasks/TaskCard';

export const mockEmployees = [
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

export const mockTasks: Task[] = [
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
