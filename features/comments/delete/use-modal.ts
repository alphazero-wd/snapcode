import { create } from "zustand";

interface State {
  isOpen: boolean;
  id: string | null;
}

interface Action {
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteCommentModal = create<State & Action>((set) => ({
  isOpen: false,
  id: null,
  onOpen: (id) => set({ id, isOpen: true }),
  onClose: () => set({ id: null, isOpen: false }),
}));
