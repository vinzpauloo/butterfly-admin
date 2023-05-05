import { create } from 'zustand';

const defaultStateValues = {
    step: 0,
    siteID: null
  }

type EditSuperAgentState = {

    // Define state properties
    isLoading: boolean;
    activeStep: number;

    // Define actions
    setIsLoading: (isLoading: boolean) => void;
    setActiveStep: (step: number | ((prevStep: number) => number)) => void;

    // Functions
}

export const editSuperAgentStore = create<EditSuperAgentState>((set) => ({

    // Define initial state properties
    isLoading: false,
    activeStep: defaultStateValues.step,
    stepOpenStatus: [],

    // Define actions
    setIsLoading: (isLoading) => set({ isLoading }),
    setActiveStep: (step) =>
    set((state) => ({
      activeStep: typeof step === "function" ? step(state.activeStep) : step,
    })),

    // Functions
}))