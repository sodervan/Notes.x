import { create } from "zustand";
import notes from "../Components/Notes";

const useStore = create((set) => ({
  title: "",
  description: "",
  date: "",
  notes: [],
  isSelection: false,
  selectedIndexes: [],
  colors: [
    "#F2F6FF",
    "#FDF6E4",
    "#E5FFE6",
    "#F5E3F8",
    "#E8F8F5",
    "#FFF0F6",
    "#EBF5FF",
    "#FFF9E6",
    "#F3E5F5",
    "#E9F7EF",
    "#F5F5F5",
    "#F0EBFF",
    "#F2FAE2",
    "#FFE9EC",
    "#F0F8FF",
    "#FDEFF5",
    "#E9EAF5",
    "#FFEFE3",
    "#EDF7E1",
    "#E9F5FF",
    "#FFEAF4",
    "#F6FAEB",
    "#FFF7ED",
    "#E9F3F5",
    "#F9F3FF",
    "#FFF5F0",
    "#ECF3FF",
    "#FDF3FA",
    "#EEF7E6",
    "#FFF7F0",
    "#F4F4FC",
  ],
  currentRoute: "note",
  currentNote: [],

  handleEnableSelection: (index) =>
    set((state) => ({
      isSelection: !state.isSelection,
      selectedIndexes: [...state.selectedIndexes, index],
    })),
  addToSelected: (index) =>
    set((state) => ({
      selectedIndexes: [...state.selectedIndexes, index],
    })),
  changeRoute: (route) => set({ currentRoute: route }),

  addToNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
    })),

  setTitle: (title) => set({ title }),
  setCurrentNote: (index) =>
    set((state) => ({
      title: state.notes[index].title,
      description: state.notes[index].description,
      currentNote: { ...state.notes[index], id: index },
    })),
  clearTitle: () => set({ title: "" }),
  clearCurrent: () => set({ currentNote: [] }),
  setDescription: (description) => set({ description }),
  clearDesc: () => set({ description: "" }),
}));

export default useStore;
