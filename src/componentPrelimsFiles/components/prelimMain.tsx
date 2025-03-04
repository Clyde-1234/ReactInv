import { ComponentProps } from "../../InterTypes";

export default function PrelimMain({children}: ComponentProps) {
    return(
    <div className=" fixed left-0 top-0 h-screen w-screen bg-violet-500 border-8 border-amber-300 p-8">
        {children}
    </div>
    )
}