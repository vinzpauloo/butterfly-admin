import { create } from 'zustand'

interface reportsTimespan {
  timespan: string
  setTimespan: (newTimespan: string) => void
}

export const reportsTimespanStore = create<reportsTimespan>((set) => ({
  timespan: 'today',
  setTimespan: (newTimespan) => set(() => ({ timespan: newTimespan })),
}))