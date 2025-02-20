import { ComponentProps } from "../InterTypes"


export default function Main({children} : ComponentProps) {
    return(
        <main className=" fixed left-12 top-20 p-4 h-[calc(100vh-80px)] w-[calc(100vw-48px)] overflow-y-auto bg-slate-900">
            {children}
        </main>
    )
}