import { create } from 'zustand';

interface SiteData {
  id: any
  logo: any
  name: string
  security_funds_balance: string
  description: string
  language_id: string
  currency_id: string
}

const defaultStateValues = {
    step: 0,
    siteID: null
}
  
type EditSuperAgentState = {

    // Define state properties
    isLoading: boolean;
    activeStep: number;
    siteData: SiteData[]; // Step One state property

    // Define actions
    setIsLoading: (isLoading: boolean) => void;
    setActiveStep: (step: number | ((prevStep: number) => number)) => void;
    setSiteData: (siteData: SiteData[]) => void; // Step One action property

    // Functions
}

export const editSuperAgentStore = create<EditSuperAgentState>((set) => ({

    // Define initial state properties
    isLoading: false,
    activeStep: defaultStateValues.step,
    stepOpenStatus: [],
    siteData: [], // Step One initial state property

    // Define actions
    setIsLoading: (isLoading) => set({ isLoading }),
    setActiveStep: (step) =>
    set((state) => ({
      activeStep: typeof step === "function" ? step(state.activeStep) : step,
    })),

    setSiteData: (siteData) => set({ siteData}) // Step One initial action property

    // Functions
}))