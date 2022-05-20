import React from "react";
import { Paper, Typography } from "@mui/material";
import Image from "next/image";

import styles from "./Post.module.scss";
import { PostActions } from "../PostActions";

interface PostProps {
  title: string;
  id: number;
  description: string;
  imageUrl?: string;
}

// TODO:
// 1) Прикрутить просмоты на статью

export const Post: React.FC<PostProps> = ({
  id,
  title,
  description,
  imageUrl,
}) => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={styles.title}>
        <a href={`/news/${id}`}>{title}</a>
      </Typography>
      <Typography className="mt-10 mb-15">{description}</Typography>
      {imageUrl && (
        <Image src={imageUrl} height={500} width={600} alt={title} />
      )}
      <PostActions />
    </Paper>
  );
};
