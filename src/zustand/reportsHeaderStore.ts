import { create } from 'zustand'

interface reportsHeader {
  timespan: string
  fromDate: Date
  toDate: Date

  setTimespan: (newTimespan: string) => void
  setFromDate: (newFromDate: Date) => void
  setToDate: (newToDate: Date) => void
}

export const reportsHeaderStore = create<reportsHeader>((set) => ({
  timespan: 'today',
  fromDate: new Date('2020-01-01'),
  toDate: new Date(),

  setTimespan: (newTimespan) => set(() => ({ timespan: newTimespan })),
  setFromDate: (newFromDate) => set(() => ({ fromDate: newFromDate })),
  setToDate: (newToDate) => set(() => ({ toDate: newToDate })),
}))