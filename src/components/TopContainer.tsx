import { ComponentProps } from "../InterTypes"

export default function TopContainer({ children }: ComponentProps) {
    return(
        <div className=" flex flex-row items-center justify-start fixed left-12 top-10 p-4 h-10 w-[calc(100vw-48px)] bg-slate-950">
            {children}
        </div>
    )
}