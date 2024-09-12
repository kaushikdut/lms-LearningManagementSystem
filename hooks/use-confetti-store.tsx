import { create } from "zustand";
type Coonfettistore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useConfettiStore = create<Coonfettistore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
