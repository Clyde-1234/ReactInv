export interface baseTask {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: Date;
    subtasks?: subtask[];
    type?: "basic" | "timed" | "checklist";
}

interface subtask {
    title: string;
    completed: boolean;
}