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
    { id: "location-3", pngUri: "/positionsForDesign/left.png", name: "Left" },
    {
      id: "location-4",
      pngUri: "/positionsForDesign/right.png",
      name: "Right",
    },
  ],
  setDesingLocationsUrls: (val) => set({ desingLocations: val }),

  //use this inside color canvas and uvmap export to color a constant part
  constantColoredPartConfig: { LeftPocket: "Front" },
  setConstantColoredPartConfig: (val) =>
    set({ constantColoredPartConfig: val }),

  patternUrls: [
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
    {
      id: "pattern-1",
      texture: "/Pattern-1.svg",
    },
    { id: "pattern-2", texture: "/Pattern-2.svg" },
    { id: "pattern-3", texture: "/Pattern-3.svg" },
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
  setUvConfig: (val) => set({ uvConfig: val }),
}));

export default configStore;
