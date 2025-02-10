import { ReactNode } from "react"

interface MainProps{
    children: ReactNode
}

export default function Main({children} : MainProps) {
    return(
        <main className=" fixed left-12 top-10 p-4 h-[calc(100vh-40px)] w-[calc(100vw-48px)] overflow-y-auto bg-slate-950">
            {children}
        </main>
    )
}