"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { DatePicker } from "./DatePicker"
import SubTask from "./tasks/Subtask"
import { addTask } from "./TaskManager"

interface TaskFactoryProps {
    type: "basic" | "timed" | "checklist";
    onClose: () => void;
}

export default function TaskFactory({onClose, type}: TaskFactoryProps) {
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState<Date | undefined>(undefined);
    const [subTaskList, setSubtaskList] = useState<string[]>([]);
    
    const handleSubtaskSubmit = (value: string) => {
        setSubtaskList(prev => [...prev, value]); 
    };

    function handleTaskSubmit(taskType: "basic" | "timed" | "checklist") {

        if (taskTitle.trim() === "") {
            alert("Please enter a task title");
            return;
        }

        switch (taskType) {
            case "basic":
                if (taskDescription.trim() === "") {
                    alert("Please enter a task description");
                    return;
                }

                
                break;
            case "timed":
                if (taskDescription.trim() === "") {
                    alert("Please enter a task description");
                    return;
                }
                if (taskDate === undefined) {
                    alert("Please select a date for the timed task");
                    return;
                }
                break;
            default:
                console.error("Unknown task type");
                break;
        }   
        

        const handleSubmit = async () => {
            try {
                const newTask = await addTask({
                    title: taskTitle,
                    description: taskDescription,
                    dueDate: taskDate,
                    completed: false,
                    subtasks: subTaskList.map((subtask) => ({ id: crypto.randomUUID(), title: subtask, completed: false })),
                    type: taskType
                })

                window.location.reload();
                
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        handleSubmit();

        setTaskTitle("");
        setTaskDescription("");
        setTaskDate(undefined);

        onClose();

    
    }
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center gap-0">
            <Card className="w-96 bg-white shadow-lg">
                <CardHeader>
                    <CardTitle>
                        <Input placeholder="Task Title" className="w-64 bg-slate-300" onChange={(e) => setTaskTitle(e.target.value)}/>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {type === "basic" && (
                        <Textarea placeholder="Task Description" className="w-full h-64 bg-slate-200" onChange={(e) => setTaskDescription(e.target.value)}/>
                    )}
                    {type === "timed" && (
                        <div className="flex flex-col">
                            <Textarea placeholder="Task Description" className="w-full h-64 bg-slate-900" onChange={(e) => setTaskDescription(e.target.value)}/>
                            <DatePicker onDateChange={(date) => setTaskDate(date)}></DatePicker>
                        </div>
                    )}
                    {type === "checklist" && (
                        <div className="flex flex-col gap-2">
                            {subTaskList.map((subtask, index) => (
                                <SubTask key={index} Title={subtask}></SubTask>
                            ))}
                            <SubTask onSubmit={handleSubtaskSubmit}/>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="default" onClick={() => handleTaskSubmit(type)}>
                        Create Task
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}