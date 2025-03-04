import { ReactNode } from "react"

export interface ItemData{
    name: string,
    current: number,
    maxAmount: number,
    imageSrc?: string,
    color: 'red' | 'orange' | 'slate' | 'green'
    isPrioritized?: boolean
}

export interface ComponentProps{
    children: ReactNode
}

export interface StoreHouseProps{
    name: string,
    borderColor: 'red' | 'green' | 'default',
    members: Array<string>,
    recentUpdate: Date
}