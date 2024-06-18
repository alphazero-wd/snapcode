import { create } from "zustand";
import { Post } from "../types";

interface State {
  posts: Post[];
  cursor: number | string | null;
}

interface Action {
  getPosts: (newPosts: Post[]) => void;
  updateCursor: () => void;
  deletePost: (id: string) => void;
  reset: () => void;
}

const initialState: State = {
  posts: [],
  cursor: null,
};

export const usePostsStore = create<State & Action>((set) => ({
  ...initialState,
  getPosts: (newPosts) =>
    set(({ posts }) => ({ posts: [...posts, ...newPosts] })),
  updateCursor: () =>
    set(({ posts }) => ({ cursor: posts.at(-1)?.created_at })),
  deletePost: (id) =>
    set(({ posts }) => ({
      posts: posts.filter((p) => p.id !== id),
    })),
  reset: () => set(initialState),
}));
