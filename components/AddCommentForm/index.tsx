import { Input, Button } from "@mui/material";
import React from "react";

import styles from "./AddCommentForm.module.scss";

export const AddCommentForm = () => {
  const [clicked, setClicked] = React.useState<boolean>(false);
  const [text, setText] = React.useState<string>("");
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const handleFocused = () => {
    setClicked(true);
  };

  const onAddComment = () => {
    setClicked(false);
    setText("");
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
