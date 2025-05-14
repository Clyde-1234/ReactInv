import { baseTask } from "@/components/types";

let mockTasks: baseTask[] = [
    {
        id: "1",
        title: "Task 1",
        description: "",
        completed: false,
        dueDate: new Date("2026-09-01"),
        subtasks: [
        { title: "Subtask 1", completed: false },
        { title: "Subtask 2", completed: true },
        ],
    },
    {
        id: "2",
        title: "Task 2",
        description: "Description for Task 2",
        completed: true,
    },
    {
        id: "3",
        title: "Task 3",
        description: "Long description here",
        completed: false,
        dueDate: new Date("2024-10-01"),
    },
    {
        id: "4",
        title: "Alpha Task",
        description: "Should appear first when sorted by title",
        completed: false,
        dueDate: new Date("2025-01-01"),
    },
];

export const getTasks = () => mockTasks;

export const createTask = (taskData: Omit<baseTask, 'id'> & { id?: string }) => {
    const task: baseTask = {
        ...taskData,
        id: taskData.id || crypto.randomUUID(),
        completed: false,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
        subtasks: taskData.subtasks || []
    };
    mockTasks.push(task);
    return task;
};

export const deleteTask = (id: string) => {
    mockTasks = mockTasks.filter(task => task.id !== id);
    return mockTasks;
};

export const updateTask = (id: string, updates: Partial<baseTask>): baseTask => {
    const taskIndex = mockTasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        throw new Error('Task not found');
    }

    const updatedTask = {
        ...mockTasks[taskIndex],
        ...updates,
        dueDate: updates.dueDate ? new Date(updates.dueDate) : mockTasks[taskIndex].dueDate
    };

    mockTasks[taskIndex] = updatedTask;
    return updatedTask;
};