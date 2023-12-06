import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const formatArea = (value: number): string => {
  return value.toLocaleString('en-US', {
    style: 'area',
    unit: 'square-meters',
  })
}

export default formatArea
