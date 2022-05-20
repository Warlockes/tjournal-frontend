import { Input, Button } from "@mui/material";
import React from "react";
import { Api } from "../../utils/api";
import { CommentItem } from "../../utils/api/types";

import styles from "./AddCommentForm.module.scss";

interface AddCommentFormProps {
  postId: number;
  onSuccessAdd: (comment: CommentItem) => void;
}

//TODO:
// 1) ошибка в консоли to many re-renders

export const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onSuccessAdd,
}) => {
  const [clicked, setClicked] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleFocused = () => {
    setClicked(true);
  };

  const onAddComment = async () => {
    setLoading(true);

    try {
      const comment = await Api().comment.create({
        postId,
        text,
      });
      onSuccessAdd(comment);
      setText("");
      setClicked(false);
    } catch (error) {
      console.warn("Create comment error", error);
      alert("Произошла ошибка при создании комментария");
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
        disabled={isLoading}
        onChange={onChangeInput}
        value={text}
        onFocus={handleFocused}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий..."
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          disabled={isLoading}
          className={styles.addButton}
          onClick={onAddComment}
          variant="contained"
          color="primary"
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};
