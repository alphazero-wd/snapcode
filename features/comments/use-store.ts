import { create } from "zustand";
import { Comment } from "./types";

interface State {
  comments: Comment[];
  cursor: string | null;
}

interface Action {
  getComments: (newComments: Comment[]) => void;
  updateCursor: () => void;
  addComment: (newComment: Comment) => void;
  deleteComment: (id: string) => void;
  reset: () => void;
}

const initialState: State = {
  comments: [],
  cursor: null,
};

export const useCommentsStore = create<State & Action>((set) => ({
  ...initialState,
  getComments: (newComments) =>
    set(({ comments }) => ({ comments: [...comments, ...newComments] })),
  addComment: (newComment) =>
    set(({ comments }) => ({ comments: [newComment, ...comments] })),
  updateCursor: () =>
    set(({ comments }) => ({ cursor: comments.at(-1)?.created_at })),
  deleteComment: (id) =>
    set(({ comments }) => ({
      comments: comments.filter((p) => p.id !== id),
    })),
  reset: () => set(initialState),
}));
