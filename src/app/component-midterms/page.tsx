"use client"

import { useEffect, useState } from "react"
import Taskfactory from "@/components/TaskFactory"
import { Plus, ArrowUp, ArrowDown, Calendar, Text } from "lucide-react"
import { baseTask } from "@/components/types"
import { Input } from "@/components/ui/input"
import { CardContainer } from "@/components/CardContainer"
import { deleteTask, getTasks, updateTask} from "@/components/TaskManager"

type SortOrder = "asc" | "desc" | "none";
type SortBy = "title" | "date" | "none";

export default function ComponentMidterms() {
    const [openTaskFactory, setOpenTaskFactory] = useState(false)
    const [taskType, setTaskType] = useState<"basic" | "timed" | "checklist">("basic")
    const [taskList, setTaskList] = useState<baseTask[]>([])
    const [sortOrder, setSortOrder] = useState<SortOrder>("none")
    const [sortBy, setSortBy] = useState<SortBy>("none")
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    function onOpenTaskFactory(type: "basic" | "timed" | "checklist"): void {
        setTaskType(type)
        setOpenTaskFactory(true)
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getTasks()
                setTaskList(tasks)
                setError(null)
            } catch (error) {
                console.error('Error fetching tasks:', error)
                setError('Failed to load tasks. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    const handleComplete = async (taskId: string) => {
    try {
        const updatedTask = await updateTask(taskId, { completed: true });
        
        setTaskList(prevTasks => 
        prevTasks.map(task => 
            task.id === taskId ? { 
            ...updatedTask,
            dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : undefined
            } : task
        )
        );
        
    } catch (error) {
        console.error('Error completing task:', error);
        setError(error instanceof Error ? error.message : 'Failed to complete task');
        
        // Revert the optimistic update if needed
        setTaskList(prevTasks => 
        prevTasks.map(task => 
            task.id === taskId ? { 
            ...task, 
            completed: false 
            } : task
        )
        );
    }
    };

    const handleDelete = async (taskId: string) => {
        try {
            await deleteTask(taskId)
            setTaskList(taskList.filter(task => task.id !== taskId))
            setError(null)
        } catch (error) {
            console.error('Error deleting task:', error)
            setError('Failed to delete task. Please try again.')
        }
    }

    const toggleSortOrder = () => {
        setSortOrder(prev => {
            if (prev === "none") return "asc"
            if (prev === "asc") return "desc"
            return "none"
        })
    }

    const handleSortBy = (type: SortBy) => {
        if (sortBy === type) {
            toggleSortOrder()
        } else {
            setSortBy(type)
            setSortOrder("asc")
        }
    }

    const getSortedTasks = () => {
        let sortedTasks = [...taskList]
        
        if (sortBy !== "none" && sortOrder !== "none") {
            sortedTasks.sort((a, b) => {
                if (sortBy === "date") {
                    if (!a.dueDate && !b.dueDate) return 0
                    if (!a.dueDate) return -1
                    if (!b.dueDate) return 1
                    
                    const dateA = a.dueDate.getTime()
                    const dateB = b.dueDate.getTime()
                    return sortOrder === "asc" 
                        ? dateA - dateB
                        : dateB - dateA
                } else {
                    const titleA = a.title.toLowerCase()
                    const titleB = b.title.toLowerCase()
                    return sortOrder === "asc" 
                        ? titleA.localeCompare(titleB)
                        : titleB.localeCompare(titleA)
                }
            })
        }

        if (searchTerm) {
            sortedTasks = sortedTasks.filter(task => 
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        return sortedTasks
    }

    const sortedTasks = getSortedTasks()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen w-screen items-start justify-start overflow-x-auto">
            <div className="flex flex-col w-full fixed bg-slate-500 h-18">
                <div className="flex gap-4 m-4">
                    <button onClick={() => onOpenTaskFactory("basic")} className="flex bg-white p-2 rounded">
                        <Plus />
                        Basic Task
                    </button>
                    <button onClick={() => onOpenTaskFactory("timed")} className="flex bg-white p-2 rounded">
                        <Plus />
                        Timed Task
                    </button>
                    <button onClick={() => onOpenTaskFactory("checklist")} className="flex bg-white p-2 rounded">
                        <Plus />
                        Checklist Task
                    </button>
                    <div className="w-64">
                        <Input 
                            placeholder="Search" 
                            className="bg-white" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleSortBy("title")} 
                            className={`flex bg-white p-2 rounded items-center gap-1 ${sortBy === "title" ? "ring-2 ring-blue-500" : ""}`}
                            title="Sort by title"
                        >
                            <Text size={16} />
                            {sortBy === "title" && (sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                        </button>
                        <button 
                            onClick={() => handleSortBy("date")} 
                            className={`flex bg-white p-2 rounded items-center gap-1 ${sortBy === "date" ? "ring-2 ring-blue-500" : ""}`}
                            title="Sort by date"
                        >
                            <Calendar size={16} />
                            {sortBy === "date" && (sortOrder === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full h-[calc(100vh - 9.5rem)] bg-slate-50 justify-center mt-18">
                <div className="flex flex-col gap-4 h-[calc(100vh - 9.5rem)]" style={{ width: "70vw" }}>
                    {sortedTasks.length > 0 ? (
                        sortedTasks.map((task) => (
                            <CardContainer
                                key={task.id}
                                task={task}
                                onComplete={() => handleComplete(task.id)}
                                onDelete={() => handleDelete(task.id)}
                            />
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500">No tasks found</p>
                        </div>
                    )}
                </div>
            </div>

            {openTaskFactory && (
                <Taskfactory type={taskType} onClose={() => setOpenTaskFactory(false)} />
            )}
        </div>
    )
}