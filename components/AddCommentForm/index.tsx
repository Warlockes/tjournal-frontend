import { Input, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCommentData, setCommentData } from "../../redux/slices/comment";
import { Api } from "../../utils/api";
import { CommentItem } from "../../utils/api/types";

import styles from "./AddCommentForm.module.scss";

interface AddCommentFormProps {
  postId: number;
  onSuccessAdd: (comment: CommentItem) => void;
  onSuccessEdit: (commentId: number, text) => void;
}

//TODO:
// 1) ошибка в консоли to many re-renders

export const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onSuccessAdd,
  onSuccessEdit,
}) => {
  const [clicked, setClicked] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const commentData = useAppSelector(selectCommentData);

  useEffect(() => {
    if (commentData) {
      setClicked(true);
      setText(commentData.text);
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [commentData]);

  useEffect(() => {
    inputRef.current.style.minHeight = clicked ? "155px" : "23px";
  }, [clicked]);

  const handleFocused = () => {
    setClicked(true);
    inputRef.current.style.minHeight = "115px";
  };

  const handleClick = async () => {
    setLoading(true);

    try {
      if (commentData) {
        await Api().comment.edit(commentData.id, {
          text,
        });
        onSuccessEdit(commentData.id, text);
        setText("");
        setClicked(false);
        dispatch(setCommentData(null));
      } else {
        const comment = await Api().comment.create({
          postId,
          text,
        });
        onSuccessAdd(comment);
        setText("");
        setClicked(false);
      }
    } catch (error) {
      console.warn("Create/edit comment error", error);
      alert("Произошла ошибка при создании/редактировании комментария");
    } finally {
      setLoading(false);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className={styles.form}>
      <Input
        inputRef={inputRef}
        disabled={isLoading}
        onChange={onChangeInput}
        value={text}
        onFocus={handleFocused}
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий..."
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          disabled={isLoading}
          className={styles.addButton}
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          {commentData ? "Редактировать" : "Опубликовать"}
        </Button>
      )}
    </div>
  );
};
