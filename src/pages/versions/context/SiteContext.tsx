import React, { createContext, useContext, useState } from 'react'

interface SiteContextProps {
  selectedSite: string
  setSelectedSite: React.Dispatch<React.SetStateAction<string>>
}

const SiteContext = createContext<SiteContextProps>({
  selectedSite: '',
  setSelectedSite: () => {
    ;('')
  }
})

export const useSiteContext = (): SiteContextProps => useContext(SiteContext)

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSite, setSelectedSite] = useState('1')

  return <SiteContext.Provider value={{ selectedSite, setSelectedSite }}>{children}</SiteContext.Provider>
}
