import { create } from "zustand";

interface SubjectModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSubjectModal = create<SubjectModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
