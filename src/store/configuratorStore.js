import { create } from "zustand";

const configuratorStore = create((set) => ({
  geometry: {},
  setGeometry: (val) => set({ geometry: val }),
}));

export default configuratorStore;
