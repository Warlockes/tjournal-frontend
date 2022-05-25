import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import MoreIcon from "@mui/icons-material/MoreHorizOutlined";
import { CommentItem } from "../../utils/api/types";

import styles from "./Comment.module.scss";
import { Api } from "../../utils/api";
import { useAppDispatch } from "../../redux/hooks";
import { setCommentData } from "../../redux/slices/comment";

interface CommentProps extends CommentItem {
  currentUserId?: number;
  onSuccessRemove: (id: number) => void;
}

//TODO:
// 1) Вынести и настроить функцию для парсинга времени коммента
// 2) Редактирование коммента + изменение времени тогда, и отображение, что коммент редактировали

export const Comment: React.FC<CommentProps> = ({
  id,
  text,
  createdAt,
  user,
  currentUserId,
  post,
  onSuccessRemove,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    if (window.confirm("Удалить комментарий?")) {
      try {
        await Api().comment.remove(id);
        onSuccessRemove(id);
      } catch (error) {
        console.warn("Delete comment error", error);
        alert("Произошла ошибка при удалении комментария");
      } finally {
        handleClose();
      }
    }
  };

  const handleClickEdit = async () => {
    try {
      const comment = await Api().comment.getById(id);
      dispatch(setCommentData(comment));
      handleClose();
    } catch (error) {
      console.warn("Edit comment error", error);
      alert("Произошла ошибка при попытке редактирования комментария");
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar style={{ marginRight: 10 }}>{user.fullName[0]}</Avatar>
        <b>{user.fullName}</b>
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      <span className={styles.replyBtn}>Ответить</span>
      {currentUserId === user.id && (
        <>
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
            <MenuItem onClick={handleClickEdit}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};
