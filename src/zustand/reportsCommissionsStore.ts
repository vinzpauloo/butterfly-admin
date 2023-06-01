import { SelectChangeEvent } from '@mui/material'
import { create } from 'zustand'

interface SiteNameProps {
  name: string
  id: number
  logo: string
}

type CommissionsProps = {

    // State Properties
    siteName: SiteNameProps[]
    selectedSite: string
    rowData: []

    // Actions Properties
    setSiteName: (siteName: SiteNameProps[]) => void
    setSelectedSite: (selectedSite: string) => void
    setRowData: (rowData: []) => void

    // Function Properties
    handleChange: (event: SelectChangeEvent) => void
}

export const useReportsCommissionsStore = create<CommissionsProps>((set) => ({
    // Initial State Properties
    siteName: [],
    selectedSite: '1',
    rowData: [],

    // Actions
    setSiteName: (siteName) => set({ siteName }),
    setSelectedSite: (selectedSite) => set({ selectedSite }),
    setRowData: (rowData) => set({ rowData }),

    // Functions
    handleChange: (event) => set({selectedSite: event.target.value as string})
}))