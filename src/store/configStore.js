import { create } from "zustand";

const configStore = create((set) => ({
  designConfig: {
    LeftSleeve: true,
    RightSleeve: true,
    Front: true,
    Back: true,
    Collar: true,
  },
  setDesignConfig: (val) => set({ designConfig: val }),

  colorsConfig: {
    LeftSleeve: true,
    RightSleeve: true,
    Front: true,
    Back: true,
    Collar: true,
  },
  setColorsConfig: (val) => set({ colorsConfig: val }),

  gradientConfig: {},
  setGradientConfig: (val) => set({ gradientConfig: val }),

  patternConfig: {},
  setPatternConfig: (val) => set({ patternConfig: val }),

  textConfig: {},
  setTextConfig: (val) => set({ textConfig: val }),

  stickerConfig: {},
  setStickerConfig: (val) => set({ stickerConfig: val }),
}));

export default configStore;
