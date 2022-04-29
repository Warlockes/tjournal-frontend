import { Divider, Paper, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { AddCommentForm } from "../AddCommentForm";
import { Comment } from "../Comment";
import data from "../../data";

export type CommentObj = {
  text: string;
  id: number;
  createdAt: string;
  user: {
    id: number;
    fullName: string;
    avatarUrl: string;
  };
  post: {
    id: number;
    title: string;
  };
};
export const PostComments: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const comments = data.comments[activeTab === 0 ? "popular" : "new"];

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
        {true && <AddCommentForm />}
        <div className="mb-20" />
        {comments.map((obj) => (
          <Comment key={obj.id} {...obj} />
        ))}
      </div>
    </Paper>
  );
};
