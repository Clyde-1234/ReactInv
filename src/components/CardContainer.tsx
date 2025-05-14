"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { baseTask } from "@/components/types"

interface CardContainerProps {
  task: baseTask
  onComplete: () => void
  onDelete: () => void
}

export function CardContainer({ task, onComplete, onDelete }: CardContainerProps) {
  return (
    <Card className={`w-full bg-slate-200 shadow-lg m-4 border-2 ${task.completed ? "border-green-500" : task.dueDate ? (new Date() > task.dueDate ? "border-red-500" : "") : ""}`}>
      <CardHeader>
        <div className="flex justify-between items-start w-full">
          <CardTitle>{task.title}</CardTitle>
          <div className="flex flex-col gap-2">
            <div className={`text-sm text-muted-foreground ${task.dueDate ? (new Date() > task.dueDate ? "text-white bg-red-500 rounded-2xl px-2" : "") : ""}`}>
              {task.dueDate ? "Reminder: " + task.dueDate.toLocaleDateString() : "No due date"}
            </div>
            <div className="text-sm text-muted-foreground">
              {task.completed ? "Task Completed" : 
               task.dueDate ? (new Date() > task.dueDate ? "Task Overdue" : "") : ""}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-[48rem]">
        <CardDescription className="whitespace-normal break-words w-full">
          {task.description}
        </CardDescription>
        {task.subtasks && task.subtasks.map((subtask, subIndex) => (
          <div key={subIndex}>
            <span>{subtask.title}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <button className="bg-green-500 p-2 rounded" onClick={onComplete}>
          Complete
        </button>
        <button className="bg-red-500 p-2 rounded text-white" onClick={onDelete}>
          Delete
        </button>
      </CardFooter>
    </Card>
  )
}