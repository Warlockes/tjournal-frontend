import { Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useComments } from "../../hooks/useComments";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { CommentItem } from "../../utils/api/types";
import { getStringWithNumber } from "../../utils/getStringWithNumber";
import { AddCommentForm } from "../AddCommentForm";
import { Comment } from "../Comment";

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const userData = useAppSelector(selectUserData);
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [comments, setComments] = useComments(postId);

  const onAddComment = (comment: CommentItem) => {
    setComments((prev) => [comment, ...prev]);
  };

  const onEditComment = (id: number, text: string) => {
    const result = comments.map((comment) => {
      if (comment.id === id) {
        comment.text = text;
      }

      return comment;
    });

    setComments(result);
  };

  const onRemoveComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const handleChangeTab = (_, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        {comments.length > 0 && (
          <Typography variant="h6" className="mb-20">
            {getStringWithNumber(comments.length, [
              "комментарий",
              "комментария",
              "комментариев",
            ])}
          </Typography>
        )}
        <Tabs
          onChange={handleChangeTab}
          className="mt-20"
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Популярные" />
          <Tab label="По порядку" />
        </Tabs>
        <Divider />
        {userData && (
          <AddCommentForm
            onSuccessAdd={onAddComment}
            onSuccessEdit={onEditComment}
            postId={postId}
          />
        )}
        <div className="mb-20" />
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            currentUserId={userData?.id}
            onSuccessRemove={onRemoveComment}
            {...comment}
          />
        ))}
      </div>
    </Paper>
  );
};
