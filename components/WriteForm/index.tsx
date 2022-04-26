import React from "react";
import { Button, Input } from "@material-ui/core";
import styles from "./WriteForm.module.scss";
import dynamic from "next/dynamic";
import { PostItem } from "../../utils/api/types";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("../Editor").then((m) => m.Editor), {
  ssr: false,
});

interface WriteFormProps {
  data?: PostItem;
}

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(data?.title || "");
  const [blocks, setBlocks] = React.useState(data?.body || []);

  return (
    <div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor initialBlocks={data?.body} onChange={(arr) => setBlocks(arr)} />
      </div>
      <Button
        disabled={isLoading || !blocks.length || !title}
        variant="contained"
        color="primary"
      >
        {data ? "Сохранить" : "Опубликовать"}
      </Button>
    </div>
  );
};
