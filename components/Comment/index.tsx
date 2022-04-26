import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React from "react";
import MoreIcon from "@material-ui/icons/MoreHorizOutlined";

import styles from "./Comment.module.scss";
import { CommentObj } from "../PostComments";

const handleClickRemove = () => undefined;

export const Comment: React.FC<CommentObj> = ({
  createdAt,
  id,
  text,
  user,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar style={{ marginRight: 10 }}>{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{createdAt}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      {false && (
        <>
          <span className={styles.replyBtn}>Ответить</span>
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            elevation={2}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
          >
            <MenuItem onClick={handleClickRemove}>Удалить</MenuItem>
            <MenuItem onClick={handleClose}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};
