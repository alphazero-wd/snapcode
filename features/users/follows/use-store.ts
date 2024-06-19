import { create } from "zustand";

interface State {
  followingIds: Set<string>;
  followingCount: number;
}

interface Action {
  follow: (profileId: string) => void;
  unfollow: (profileId: string) => void;
  reset: () => void;
}

const initialState: State = {
  followingIds: new Set(),
  followingCount: 0,
};

export const useFollowsStore = create<State & Action>((set) => ({
  ...initialState,
  follow: (profileId) =>
    set(({ followingIds, followingCount }) => ({
      followingIds: followingIds.add(profileId),
      followingCount: followingCount + 1,
    })),
  unfollow: (profileId) =>
    set(({ followingIds, followingCount }) => {
      followingIds.delete(profileId);
      return { followingIds, followingCount: followingCount - 1 };
    }),
  reset: () => set(initialState),
}));
