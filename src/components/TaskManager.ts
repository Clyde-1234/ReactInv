import { baseTask } from "@/components/types";

const API_URL = '/api/tasks';

export async function getTasks(): Promise<baseTask[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const tasks = await response.json();
  return tasks.map((task: any) => ({
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined
  }));
}

export async function addTask(taskData: Omit<baseTask, 'id'>): Promise<baseTask> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...taskData,
      id: crypto.randomUUID()
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add task');
  }

  const newTask = await response.json();
  return {
    ...newTask,
    dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined
  };
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}

export async function updateTask(id: string, updates: Partial<baseTask>): Promise<baseTask> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update task');
  }

  return response.json();
}
