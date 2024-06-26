import { create } from "zustand";
import { Comment, EditData } from "./types";

interface State {
  comments: Comment[];
  count: number;
  editData: EditData | null;
  cursor: string | null;
}

interface Action {
  getCommentsCount: (newCount: number) => void;
  getComments: (newComments: Comment[]) => void;
  updateCursor: () => void;
  addComment: (newComment: Comment) => void;
  enableEditComment: (id: string) => void;
  editComment: (id: string, content: string, updatedAt: string) => void;
  cancelEditComment: () => void;
  deleteComment: (id: string) => void;
  reset: () => void;
}

const initialState: State = {
  comments: [],
  count: 0,
  editData: null,
  cursor: null,
};

export const useCommentsStore = create<State & Action>((set) => ({
  ...initialState,
  getCommentsCount: (newCount) => set({ count: newCount }),
  getComments: (newComments) =>
    set(({ comments }) => ({ comments: [...comments, ...newComments] })),
  addComment: (newComment) =>
    set(({ comments, count }) => ({
      comments: [newComment, ...comments],
      count: count + 1,
    })),
  enableEditComment: (id) =>
    set(({ comments }) => {
      const commentToEdit = comments.find((c) => c.id === id);
      if (!commentToEdit) return { editData: null };
      return { editData: { id, content: commentToEdit.content } };
    }),
  cancelEditComment: () => set({ editData: null }),
  editComment: (id, content, updatedAt) =>
    set(({ comments }) => ({
      comments: comments.map((c) =>
        c.id === id ? { ...c, content, updated_at: updatedAt } : c
      ),
      editData: null,
    })),
  updateCursor: () =>
    set(({ comments }) => ({ cursor: comments.at(-1)?.created_at })),
  deleteComment: (id) =>
    set(({ comments, count }) => ({
      comments: comments.filter((p) => p.id !== id),
      count: count - 1,
    })),
  reset: () => set(initialState),
}));
