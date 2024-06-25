import { ReactNode, createContext, useContext, useState } from "react";
import { Comment, EditData } from "../types";
import { useRepliesQuery } from "./use-query";

interface State {
  replies: Comment[];
  editData: EditData | null;
  loading: boolean;
  hasMore: boolean;
}

interface Action {
  addReply: (newReply: Comment) => void;
  enableEditReply: (id: string) => void;
  editReply: (id: string, content: string, updatedAt: string) => void;
  cancelEditReply: () => void;
  deleteReply: (id: string) => void;
  fetchMoreReplies: () => void;
}

const RepliesContext = createContext<State & Action>({
  replies: [],
  editData: null,
  loading: false,
  hasMore: true,
  addReply: () => {},
  enableEditReply: () => {},
  editReply: () => {},
  cancelEditReply: () => {},
  deleteReply: () => {},
  fetchMoreReplies: () => {},
});

interface RepliesContextProviderProps {
  count: number;
  commentId: string;
  children: ReactNode;
}

export const RepliesContextProvider = ({
  count,
  commentId,
  children,
}: RepliesContextProviderProps) => {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [editData, setEditData] = useState<EditData | null>(null);

  const appendReplies = (newReplies: Comment[]) => {
    setReplies([...replies, ...newReplies]);
  };

  const enableEditReply = (id: string) => {
    const reply = replies.find((r) => r.id === id);
    if (!reply) return;
    setEditData({ id, content: reply.content });
  };

  const addReply = (newReply: Comment) => {
    setReplies([newReply, ...replies]);
  };

  const deleteReply = (id: string) => {
    setReplies(replies.filter((r) => r.id !== id));
  };

  const cancelEditReply = () => setEditData(null);

  const editReply = (id: string, content: string, updatedAt: string) => {
    setReplies(
      replies.map((r) =>
        r.id === id ? { ...r, content, updated_at: updatedAt } : r
      )
    );
    cancelEditReply();
  };

  const { hasMore, loading, fetchMoreReplies } = useRepliesQuery({
    count,
    commentId,
    replies,
    appendReplies,
  });
  return (
    <RepliesContext.Provider
      value={{
        editData,
        hasMore,
        replies,
        loading,
        fetchMoreReplies,
        enableEditReply,
        addReply,
        deleteReply,
        editReply,
        cancelEditReply,
      }}
    >
      {children}
    </RepliesContext.Provider>
  );
};

export const useRepliesContext = () => useContext(RepliesContext);
