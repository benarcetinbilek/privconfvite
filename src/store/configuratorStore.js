import { create } from "zustand";

const configuratorStore = create((set, get) => ({
  //TODO -- this geometry might need to be in a separate store later on
  geometry: {},
  setGeometry: (val) => set({ geometry: val }),
  //TODO-- set when app initializes
  colorsForParts: {
    LeftSleeve: {
      firstColor: "#c52525ff",
      secondColor: "#000000",
      isGradient: false,
    },
    RightSleeve: {
      firstColor: "#312692ff",
      secondColor: "#ff0000ff",
      isGradient: true,
    },
    Front: {
      firstColor: "#4ec928ff",
      secondColor: "#000000",
      isGradient: false,
    },
    Back: {
      firstColor: "#cd19d3ff",
      secondColor: "#000000",
      isGradient: false,
    },
    Collar: {
      firstColor: "#cbec0fff",
      secondColor: "#000000",
      isGradient: false,
    },
  },

  setColorForPart: (part, val) =>
    set((state) => ({
      colorsForParts: {
        ...state.colorsForParts,
        [part]: { ...state.colorsForParts[part], ...val },
      },
    })),

  setColorsForParts: (val) => set({ colorsForParts: val }),

  //   //how to use

  // // Sadece firstColor değişir
  // setColorForPart("LeftSleeve", { firstColor: "#00aeff" });

  // // firstColor ve isGradient aynı anda değişir
  // setColorForPart("RightSleeve", { firstColor: "#ff0000", isGradient: true });

  // setColorsForParts({
  //   LeftSleeve: { firstColor: "#fff", secondColor: "#000", isGradient: false },
  //   RightSleeve: { firstColor: "#aaa", secondColor: "#111", isGradient: true },
  //   Front: { firstColor: "#123", secondColor: "#321", isGradient: false },
  //   Back: { firstColor: "#456", secondColor: "#654", isGradient: true },
  //   Collar: { firstColor: "#789", secondColor: "#987", isGradient: false },
  // });

  itemsOnModel: [
    {
      id: "1",
      type: "sticker",
      texture: "/logo1.png",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 0,
      isActive: true,
    },
    {
      id: "2",
      type: "text",
      textContent: "benar",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 0,
      isActive: true,
    },
    {
      id: "5",
      type: "text",
      textContent: "ahmet",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 0,
      isActive: true,
    },
    {
      id: "3",
      type: "pattern",
      texture: "/logo1.png",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 0,
      isActive: true,
      appliedPart: "Front",
    },
    {
      id: "4",
      type: "design",
      texture: "/logo1.png",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 0,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
    },
  ],

  addItem: (item) =>
    set((state) => ({
      itemsOnModel: [...state.itemsOnModel, item],
    })),

  updateItem: (id, data) =>
    set((state) => ({
      itemsOnModel: state.itemsOnModel.map((i) =>
        i.id === id ? { ...i, ...data } : i
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      itemsOnModel: state.itemsOnModel.filter((i) => i.id !== id),
    })),

  reorderLayers: (orderedIds) =>
    set((state) => ({
      itemsOnModel: state.itemsOnModel
        .map((item) => {
          const newIndex = orderedIds.indexOf(item.id);
          return newIndex !== -1 ? { ...item, layerIndex: newIndex } : item;
        })
        .sort((a, b) => a.layerIndex - b.layerIndex),
    })),

  getItemsByType: (type) =>
    get().itemsOnModel.filter((item) => item.type === type),

  //how to use
  // Tek property update
  // updateItem("1", { scale: 1.5 });

  // // Çok property update
  // updateItem("3", { x: 10, y: 20, rotation: 45 });

  // // Item sil
  // removeItem("2");

  // // Yeni item ekle
  // addItem({
  //   id: Date.now().toString(),
  //   type: "text",
  //   textContent: "yeni",
  //   x: 0,
  //   y: 0,
  //   scale: 1,
  //   rotation: 0,
  //   layerIndex: itemsOnModel.length,
  //   isActive: true,
  // });

  // // Layer reorder
  // reorderLayers(["3","4","1","5"]);

  // // Get items by type
  //  const textItems = configuratorStore.getState().getItemsByType("text");
}));

export default configuratorStore;
