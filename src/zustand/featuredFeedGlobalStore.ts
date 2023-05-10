import { IFeedStory } from '@/context/types'
import { create } from 'zustand'

interface IFeaturedFeedStore {
    feed : IFeedStory | {},
    isFeedModalOpen : boolean,
    feedFeatureTitle : string

    setFeed : (feed : IFeedStory) => void
    getCurrentFeed : () => IFeedStory | {}
    toggleFeedModal : () => void
    setFeedFeatureTitle : (title : string) => void
}

export const useFeaturedFeedStore = create<IFeaturedFeedStore>((set, get)=>({
    feed : {},
    isFeedModalOpen : false,
    feedFeatureTitle : '',
    setFeed : ( newFeed : IFeedStory ) => set({ feed :  newFeed  }),
    getCurrentFeed : () => get().feed,
    toggleFeedModal : () => { set( state => ({ isFeedModalOpen : !state.isFeedModalOpen })) },
    setFeedFeatureTitle : ( title ) => { set( { feedFeatureTitle : title} ) }
}))