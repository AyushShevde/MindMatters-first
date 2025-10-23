import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = (import.meta as any).env?.VITE_API_URL || "https://server-i3puy8qhh-ayushshevdes-projects.vercel.app";

