import { create } from "zustand";

interface SessionModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSessionModal = create<SessionModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
