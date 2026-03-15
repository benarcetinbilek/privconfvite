import { create } from "zustand";

//TODO-- set when app initializes
const configStore = create((set, get) => ({
  geometry: {},
  setGeometry: (val) => set({ geometry: val }),
  //use this as main design config which parts can have which design types
  designConfig: [
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
  ],
  setDesignConfig: (val) => set({ designConfig: val }),

  bestDesignConfig: [
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/5.png", svgUri: "/5.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/5.png", svgUri: "/5.svg" },
    { pngUri: "/1.png", svgUri: "/1.svg" },
    { pngUri: "/2.png", svgUri: "/2.svg" },
    { pngUri: "/3.png", svgUri: "/3.svg" },
    { pngUri: "/4.png", svgUri: "/4.svg" },
    { pngUri: "/5.png", svgUri: "/5.svg" },
  ],
  setBestDesignConfig: (val) => set({ bestDesignConfig: val }),

  //use this as main design config to store all design related data pngs and svgs
  //TODO -- check if design locations have only 1 item if so use that design for all parts
  desingUrls: {},
  setDesingUrls: (val) => set({ desingUrls: val }),

  desingLocationsUrls: [
    {
      id: "location-1",
      pngUri: "/positionsForDesign/front.png",
      name: "Front",
    },
    { id: "location-2", pngUri: "/positionsForDesign/back.png", name: "Back" },
    {
      id: "location-3",
      pngUri: "/positionsForDesign/left.png",
      name: "LeftSleeve",
    },
    {
      id: "location-4",
      pngUri: "/positionsForDesign/right.png",
      name: "RightSleeve",
    },
  ],
  setDesingLocationsUrls: (val) => set({ desingLocations: val }),

  commonLocationsUrls: [
    {
      id: "location-1",
      pngUri: "/positionsForText/Position_1.png",
      x: 0.5,
      y: 0.5,
      name: "Front",
    },
    {
      id: "location-2",
      pngUri: "/positionsForText/Position_2.png",
      x: 0.5,
      y: 0.5,
      name: "Back",
    },
    {
      id: "location-3",
      pngUri: "/positionsForText/Position_3.png",
      x: 0.5,
      y: 0.5,
      name: "Left",
    },
    {
      id: "location-4",
      pngUri: "/positionsForText/Position_4.png",
      x: 0.5,
      y: 0.5,
      name: "Right",
    },
    {
      id: "location-5",
      pngUri: "/positionsForText/Position_5.png",
      x: 0.5,
      y: 0.5,
      name: "Right",
    },
    {
      id: "location-6",
      pngUri: "/positionsForText/Position_6.png",
      x: 0.5,
      y: 0.5,
      name: "Right",
    },
    {
      id: "location-7",
      pngUri: "/positionsForText/Position_7.png",
      x: 0.5,
      y: 0.5,
      name: "Right",
    },
    {
      id: "location-8",
      pngUri: "/positionsForText/Position_8.png",
      x: 0.5,
      y: 0.5,
      name: "Right",
    },
    {
      id: "location-9",
      pngUri: "/positionsForText/Position_9.png",
      x: 0.5,
      y: 0.5,
      name: "Right",
    },
  ],
  setCommonLocationsUrls: (val) => set({ desingLocations: val }),

  //use this inside color canvas and uvmap export to color a constant part
  constantColoredPartConfig: { LeftPocket: "Front" },
  setConstantColoredPartConfig: (val) =>
    set({ constantColoredPartConfig: val }),

  patternUrls: [
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/pattern-1.svg",
    },
    { id: "pattern-2", texture: "/pattern-2.svg" },
    { id: "pattern-3", texture: "/pattern-3.svg" },
  ],
  setPatternUrls: (val) => set({ patternUrls: val }),

  patternPartConfig: ["LeftSleeve", "RightSleeve", "Front", "Back", "Collar"],

  setPatternPartConfig: (val) => set({ patternPartConfig: val }),

  textConfig: {},
  setTextConfig: (val) => set({ textConfig: val }),

  stickerConfig: [
    { id: "sticker-1", texture: "/sticker-1.svg" },
    { id: "sticker-2", texture: "/sticker-2.svg" },
    { id: "sticker-3", texture: "/sticker-3.svg" },
    { id: "sticker-4", texture: "/sticker-4.svg" },
    { id: "sticker-1", texture: "/sticker-1.svg" },
    { id: "sticker-2", texture: "/sticker-2.svg" },
    { id: "sticker-3", texture: "/sticker-3.svg" },
    { id: "sticker-4", texture: "/sticker-4.svg" },
    { id: "sticker-1", texture: "/sticker-1.svg" },
    { id: "sticker-2", texture: "/sticker-2.svg" },
    { id: "sticker-3", texture: "/sticker-3.svg" },
    { id: "sticker-4", texture: "/sticker-4.svg" },
    { id: "sticker-1", texture: "/sticker-1.svg" },
    { id: "sticker-2", texture: "/sticker-2.svg" },
    { id: "sticker-3", texture: "/sticker-3.svg" },
    { id: "sticker-4", texture: "/sticker-4.svg" },
  ],
  setStickerConfig: (val) => set({ stickerConfig: val }),
  getAllStickers: () => get().stickerConfig,

  uvConfig: {
    LeftSleeve: [
      { u: 0.54, v: 0.02 }, // min (u, v)
      { u: 0.81, v: 0.43 }, // max (u, v)
    ],
    RightSleeve: [
      { u: 0.255, v: 0.02 },
      { u: 0.534, v: 0.43 },
    ],
    Front: [
      { u: 0.119, v: 0.503 },
      { u: 0.53, v: 0.99 },
    ],
    Back: [
      { u: 0.572, v: 0.48 },
      { u: 0.955, v: 0.99 },
    ],
    Collar: [
      { u: 0.184, v: 0.438 },
      { u: 0.475, v: 0.49 },
    ],
  },
  // uvConfig: {
  //   Front: [
  //     // island 5 – ön gövde (en büyük alanlardan biri)
  //     { u: 0.09738863259553909, v: 0.3568553924560547 },
  //     { u: 0.5367767810821533, v: 0.9608057141304016 },
  //   ],
  //   Back: [
  //     // island 4 – arka gövde
  //     { u: 0.5646404027938843, v: 0.36519062519073486 },
  //     { u: 0.9856908917427063, v: 0.9636635184288025 },
  //   ],
  //   LeftSleeve: [
  //     // island 1 – sol kol
  //     { u: 0.15025809407234192, v: 0.05797618627548218 },
  //     { u: 0.46771305799484253, v: 0.220395028591156 },
  //   ],
  //   RightSleeve: [
  //     // island 3 – sağ kol
  //     { u: 0.601553738117218, v: 0.06726408004760742 },
  //     { u: 0.9192468523979187, v: 0.22968292236328125 },
  //   ],
  //   BottomHem: [
  //     // island 2 – yaka (yüksek detay, küçük)
  //     { u: 0.010463613085448742, v: 0.014156460762023926 },
  //     { u: 0.11644069105386734, v: 0.16323882341384888 },
  //   ],
  //   Collar: [
  //     // island 0 – alt kenar bant (ince şerit)
  //     { u: 0.21455880999565125, v: 0.2985084652900696 },
  //     { u: 0.5629733204841614, v: 0.31375014781951904 },
  //   ],
  // },
  setUvConfig: (val) => set({ uvConfig: val }),
}));

export default configStore;
