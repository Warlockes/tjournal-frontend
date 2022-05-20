import React from "react";
import Link from "next/link";

import styles from "./SideComments.module.scss";
import { PostItem, UserResponse } from "../../utils/api/types";

interface SideCommentItemProps {
  user: UserResponse;
  text: string;
  post: PostItem;
}

export const SideCommentItem: React.FC<SideCommentItemProps> = ({
  user,
  text,
  post,
}) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img src="https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/" />
        <Link href={`/profile/${user.id}`}>
          <a>
            <b>{user.fullName}</b>
          </a>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`/news/${post.id}`}>
        <a>
          <span className={styles.postTitle}>{post.title}</span>
        </a>
      </Link>
    </div>
  );
};
