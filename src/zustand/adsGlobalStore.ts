import { create } from 'zustand'

interface IAdsStore {
	adsCategory: string
	adsWidth: number
	adsHeight: number
	adsPhotoURL: string
	adsLink: string
	adsStartDate: Date
	adsEndDate: Date

	setAdsCategory: (newAdsCategory: string) => void
	setAdsWidth: (newAdsWidth: number) => void
	setAdsHeight: (newAdsHeight: number) => void
	setAdsPhotoURL: (newAdsPhotoURL: string) => void
	setAdsLink: (newAdsLink: string) => void
	setAdsStartDate: (newAdsStartDate: Date) => void
	setAdsEndDate: (newAdsEndDate: Date) => void
}

export const adsGlobalStore = create<IAdsStore>((set) => ({
	adsCategory: "",
	adsWidth: 0,
	adsHeight: 0,
	adsPhotoURL: "",
	adsLink: "",
	adsStartDate: new Date(),
	adsEndDate: new Date(),

	setAdsCategory: (newAdsCategory) => set(() => ({ adsCategory: newAdsCategory })),
	setAdsWidth: (newAdsWidth) => set(() => ({ adsWidth: newAdsWidth })),
	setAdsHeight: (newAdsHeight) => set(() => ({ adsHeight: newAdsHeight })),
	setAdsPhotoURL: (newAdsPhotoURL) => set(() => ({ adsPhotoURL: newAdsPhotoURL })),
	setAdsLink: (newAdsLink) => set(() => ({ adsLink: newAdsLink })),
	setAdsStartDate: (newAdsStartDate) => set(() => ({ adsStartDate: newAdsStartDate })),
	setAdsEndDate: (newAdsEndDate) => set(() => ({ adsEndDate: newAdsEndDate })),
}))