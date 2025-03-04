import { atom } from "jotai";

export const sessionAtom = atom(null)
export const theme = atom<'light'|'dark'>('light')