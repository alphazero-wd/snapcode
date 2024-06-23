import { create } from "zustand";

interface State {
  followingIds: Set<string>;
  followingCount: number;
}

interface Action {
  follow: (profileId: string) => void;
  unfollow: (profileId: string) => void;
  incrementFollowingCount: () => void;
  decrementFollowingCount: () => void;
  reset: () => void;
}

const initialState: State = {
  followingIds: new Set(),
  followingCount: 0,
};

export const useFollowsStore = create<State & Action>((set) => ({
  ...initialState,
  follow: (profileId) =>
    set(({ followingIds }) => ({
      followingIds: followingIds.add(profileId),
    })),
  decrementFollowingCount: () =>
    set(({ followingCount }) => ({ followingCount: followingCount - 1 })),
  incrementFollowingCount: () =>
    set(({ followingCount }) => ({ followingCount: followingCount + 1 })),
  unfollow: (profileId) =>
    set(({ followingIds }) => {
      followingIds.delete(profileId);
      return { followingIds };
    }),
  reset: () => set(initialState),
}));
