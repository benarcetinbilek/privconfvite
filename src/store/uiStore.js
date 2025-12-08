import { create } from "zustand";

const uiStore = create((set) => ({
  footerButtonsActive: "none",
  setFooterButtonsActive: (val) => set({ footerButtonsActive: val }),

  isLoading: false,
  loadingMessage: "",
  setIsLoading: (val, message = "") =>
    set({ isLoading: val, loadingMessage: message }),
}));

export default uiStore;
