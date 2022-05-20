import { Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useComments } from "../../hooks/useComments";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { Api } from "../../utils/api";
import { CommentItem } from "../../utils/api/types";
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

  const onRemoveComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const handleChangeTab = (_, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper elevation={0} className="mt-40 p-30">
      <div className="container">
        <Typography variant="h6" className="mb-20">
          42 комментария
        </Typography>
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
          <AddCommentForm onSuccessAdd={onAddComment} postId={postId} />
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
