import { IFeedStory } from '@/context/types'
import { SelectChangeEvent } from '@mui/material'
import { create } from 'zustand'

interface IFeaturedFeedStore {
    

    // State Properties
    feed : IFeedStory | {},
    isFeedModalOpen : boolean,
    feedFeatureTitle : string
    getCurrentFeed : () => IFeedStory | {}
    toggleFeedModal : () => void
    siteName: SiteNameProps[],
    setFeed : (feed : IFeedStory) => void,
    selectedSite: string,
    pageSize: number,
    rowData: [],
    search: string | undefined,
    titleSearchValue: string | undefined,
    selectedFeed: string | null,
    description: string | undefined
    title: string

    // Actions Properties
    setSiteName: (siteName: SiteNameProps[]) => void
    setFeedFeatureTitle: (title: string) => void
    setSelectedSite: (selectedSite: string) => void
    setRowData: (rowData: [] | undefined) => void
    setSearch: (search: string | undefined) => void
    setTitleSearchValue: (titleSearchValue: string | undefined) => void
    setSelectedFeed: (selectedFeed: string | null) => void
    setDescription: (description: string | undefined) => void
    setTitle: (title: string) => void

    // Functions
    handleChange: (event: SelectChangeEvent) => void
    handleSearch: (value: string, type: string) => void;
    handleSelectSpecificFeed: (_id: string, string_story: string) => void;
    handleTitleChange: (event:any) => void
}

interface SiteNameProps {
  name: string
  id: number
  logo: string
}

export const useFeaturedFeedStore = create<IFeaturedFeedStore>((set, get) => ({
    // Initial State Properties
    feed : {},
    isFeedModalOpen : false,
    feedFeatureTitle: '',
    siteName: [],
    selectedSite: '1',
    pageSize: 10,
    rowData: [],
    search: undefined,
    titleSearchValue: undefined,
    selectedFeed: null,
    description: undefined,
    title: '',

    // Defined Actions
    setFeed : ( newFeed : IFeedStory ) => set({ feed :  newFeed  }),
    getCurrentFeed : () => get().feed,
    toggleFeedModal : () => { set( state => ({ isFeedModalOpen : !state.isFeedModalOpen })) },
    setFeedFeatureTitle: (title) => { set({ feedFeatureTitle: title }) },
    setSiteName: (siteName) => set({ siteName }),
    setSelectedSite: (selectedSite) => set({ selectedSite }),
    setRowData: (rowData) => set({ rowData }),
    setSearch: (search) => set({ search }),
    setTitleSearchValue: (titleSearchValue) => set({ titleSearchValue }),
    setSelectedFeed: (selectedFeed) => set({ selectedFeed }),
    setDescription: (description) => set({ description }),
    setTitle: (title) => set({ title }),

    // Functions
    handleChange: (event) => set({ selectedSite: event.target.value as string }),
    handleSearch: (value, type) => {
        set({ search: type })
        switch (type) {
            case 'title':
                set({ titleSearchValue: value || undefined })
                break;
        }
    },
    handleSelectSpecificFeed: (_id, string_story) => {
        set({ selectedFeed: _id })
        set({description: string_story})
    },
    handleTitleChange: (event) => set({title: event.target.value as string})
}))