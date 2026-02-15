import { create } from "zustand";

const configuratorStore = create((set, get) => ({
  //TODO -- this geometry might need to be in a separate store later on

  //TODO-- set when app initializes
  colorsForParts: {
    LeftSleeve: {
      firstColor: "#c52525ff",
      secondColor: "#000000",
      isGradient: false,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0.5,
    },
    RightSleeve: {
      firstColor: "#312692ff",
      secondColor: "#ff0000ff",
      isGradient: true,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0.5,
    },
    Front: {
      firstColor: "#4ec928ff",
      secondColor: "#000000",
      isGradient: false,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0.5,
    },
    Back: {
      firstColor: "#cd19d3ff",
      secondColor: "#000000",
      isGradient: false,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0.5,
    },
    Collar: {
      firstColor: "#cbec0fff",
      secondColor: "#000000",
      isGradient: false,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0.5,
    },
  },

  updateColor: (part, val) =>
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
    // {
    //   id: "1",
    //   type: "design",
    //   textureUri: "/1.svg",
    //   texturePngUri: "/1.png",
    //   x: 0,
    //   y: 0,
    //   layerIndex: 0,
    //   isActive: true,
    //   appliedPart: ["LeftSleeve", "RightSleeve"],
    // },
    {
      id: "2",
      type: "pattern",
      textureUri: "/pattern-1.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 1,
      isActive: true,
      appliedPart: "Front",
      firstColor: "#ff0000",
      secondColor: "#0000ff",
      isGradient: false,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "3",
      type: "pattern",
      textureUri: "/pattern-2.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 2,
      isActive: true,
      appliedPart: "Collar",
      firstColor: "#ff0000",
      secondColor: "#0000ff",
      isGradient: true,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "4",
      type: "text",
      textContent: "benar",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 3,
      isActive: true,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "5",
      type: "sticker",
      textureUri: "/sticker-1.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 4,
      isActive: true,
      name: "Sticker 1",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "6",
      type: "sticker",
      textureUri: "/sticker-2.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 5,
      isActive: true,
      name: "Sticker 2",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },

    {
      id: "7",
      type: "logo",
      textureUri: "/logo-1.png",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 6,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
      logoName: "Logo 1",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },

    {
      id: "8",
      type: "logo",
      textureUri: "/logo-2.jpg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 7,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
      logoName: "Logo 2",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "9",
      type: "logo",
      textureUri: "/logo-3.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 8,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
      logoName: "Logo 3",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },

    {
      id: "13",
      type: "text",
      textContent: "benar",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 9,
      isActive: true,
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "14",
      type: "sticker",
      textureUri: "/sticker-1.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 10,
      isActive: true,
      name: "Sticker 1",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "15",
      type: "sticker",
      textureUri: "/sticker-2.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 11,
      isActive: true,
      name: "Sticker 2",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },

    {
      id: "16",
      type: "logo",
      textureUri: "/logo-1.png",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 12,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
      logoName: "Logo 1",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },

    {
      id: "17",
      type: "logo",
      textureUri: "/logo-2.jpg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 13,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
      logoName: "Logo 2",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
    {
      id: "18",
      type: "logo",
      textureUri: "/logo-3.svg",
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      layerIndex: 14,
      isActive: true,
      appliedPart: ["LeftSleeve", "RightSleeve"],
      logoName: "Logo 3",
      gradientRotation: 0,
      gradientOffset: 0,
      gradientTransition: 0,
    },
  ],

  addItem: (item) =>
    set((state) => ({
      itemsOnModel: [...state.itemsOnModel, item],
    })),

  updateItem: (id, data) =>
    set((state) => ({
      itemsOnModel: state.itemsOnModel.map((i) =>
        i.id === id ? { ...i, ...data } : i,
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

  getAllItems: () => get().itemsOnModel,

  getMaxId: () => {
    const items = get().itemsOnModel;
    if (items.length === 0) return 0;
    return Math.max(...items.map((i) => parseInt(i.id)));
  },

  selectItems: (state, type) =>
    state.itemsOnModel.filter((item) => item.type === type),

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

  // // Get all items
  // const allItems = configuratorStore.getState().getAllItems();

  // // Get max id
  // const maxId = configuratorStore.getState().getMaxId();
}));

export default configuratorStore;
