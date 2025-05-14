
import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";

interface SubTaskProps {
    Title?: string;
    onSubmit?: (value: string) => void;
}

export default function SubTask({ Title = "", onSubmit }: SubTaskProps) {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [subtaskTitle, setSubtaskTitle] = useState<string|undefined>(Title);
    const [addSubtask, setAddSubtask] = useState(false);

    

    const handleClick = () => {
        const value = titleInputRef.current?.value;
        setSubtaskTitle(value);
        if (!value) {
            return
        }
        
        if (onSubmit) {
            onSubmit(value);
        }
        setSubtaskTitle("");
        setAddSubtask(false);
    };

    return (
        <form className="flex">
            {addSubtask ? 
            <div className="flex">
                <Input
                name="title"
                onChange={(e) => setSubtaskTitle(e.target.value)}
                placeholder="Subtask Title"
                ref={titleInputRef}
                className="w-full"
                />
                <Button variant="outline" onClick={() => {
                    setAddSubtask(false)
                    handleClick();
                    }}>
                    <Plus/>
                </Button>
            </div>
            :
            subtaskTitle === "" ? 

                <Button variant="outline" onClick={() => setAddSubtask(true)}>
                    Add Subtask
                </Button>

                :

                <div className="flex pl-6 gap-2">
                    <Label>
                        <span>-</span>
                        {subtaskTitle}
                    </Label>
                </div>
            
            }
            
        </form>
    )
}