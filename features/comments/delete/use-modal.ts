import { create } from "zustand";

interface State {
  isOpen: boolean;
  id: string | null;
}

interface Action {
  onOpen: (id: string, deleteComment: (id: string) => void) => void;
  onClose: () => void;
  deleteComment: ((id: string) => void) | null;
}

export const useDeleteCommentModal = create<State & Action>((set) => ({
  isOpen: false,
  id: null,
  deleteComment: null,
  onOpen: (id, deleteComment) => set({ id, deleteComment, isOpen: true }),
  onClose: () => set({ id: null, isOpen: false }),
}));
