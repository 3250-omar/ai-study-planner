import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));