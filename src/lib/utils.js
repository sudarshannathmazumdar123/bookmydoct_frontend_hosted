import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import api from "./axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export async function getClinicDetails() {
  try {
    const res = await api.get('/auth/clinic/details');
    return res.data
  }
  catch (error) {
    console.log(error)
  }
}

export const generateTimeSlots = (start, end, id) => {
  const slots = []
  let current = new Date(`2000-01-01T${start}:00`)
  const endTime = new Date(`2000-01-01T${end}:00`)

  while (current < endTime) {
    const sStart = current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    current.setMinutes(current.getMinutes() + 30)
    const sEnd = current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    slots.push(`${id}-${sStart}-${sEnd}`)
  }

  return slots
}