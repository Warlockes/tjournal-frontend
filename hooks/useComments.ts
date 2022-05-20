import React, { useEffect, useState } from "react";
import { Api } from "../utils/api";
import { CommentItem } from "../utils/api/types";

type UseCommentsProps = [
  CommentItem[],
  React.Dispatch<React.SetStateAction<CommentItem[]>>
];

export const useComments = (postId?: number): UseCommentsProps => {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const arr = await Api().comment.getAll(postId);
        setComments(arr);
      } catch (error) {
        console.warn("Fetch comments error", error);
      }
    };

    fetchComments();
  }, []);

  return [comments, setComments];
};
