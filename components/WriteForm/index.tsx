import React from "react";
import { Button, Input } from "@mui/material";
import styles from "./WriteForm.module.scss";
import dynamic from "next/dynamic";
import { OutputData } from "@editorjs/editorjs";
import { Api } from "../../utils/api";
import { PostItem } from "../../utils/api/types";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("../Editor").then((m) => m.Editor), {
  ssr: false,
});

interface WriteFormProps {
  data?: PostItem;
}

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(data?.title || "");
  const [blocks, setBlocks] = React.useState(data?.body || []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeEditor = (blocks: OutputData["blocks"]) => {
    setBlocks(blocks);
  };

  const onAddPost = async () => {
    try {
      setLoading(true);
      const dto = {
        title,
        body: blocks,
      };

      if (!data) {
        const post = await Api().post.createPost(dto);
        await router.push(`/write/${post.id}`);
      } else {
        await Api().post.updatePost(data.id, dto);
      }
    } catch (error) {
      console.warn("Create post error", error);
      alert("ОшибОчка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        value={title}
        onChange={onChangeTitle}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor initialBlocks={data?.body} onChange={onChangeEditor} />
      </div>
      <Button
        disabled={isLoading || !blocks.length || !title}
        variant="contained"
        color="primary"
        onClick={onAddPost}
      >
        {data ? "Сохранить" : "Опубликовать"}
      </Button>
    </div>
  );
};
