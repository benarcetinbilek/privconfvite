import { create } from "zustand";

const uiStore = create((set) => ({
  footerButtonsActive: "none",
  setFooterButtonsActive: (val) => set({ footerButtonsActive: val }),
}));

export default uiStore;
