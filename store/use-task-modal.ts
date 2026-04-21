import { create } from "zustand";

interface TaskModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useTaskModal = create<TaskModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
