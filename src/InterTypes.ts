import { ReactNode } from "react"

export interface ItemData{
    name: string,
    current: number,
    maxAmount: number,
    color: 'red' | 'orange' | 'slate' | 'green'
}

export interface ComponentProps{
    children: ReactNode
}