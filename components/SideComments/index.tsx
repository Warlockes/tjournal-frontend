import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/NavigateNextOutlined";
import clsx from "clsx";
import { SideCommentItem } from "./SideCommentItem";

import styles from "./SideComments.module.scss";
import { useComments } from "../../hooks/useComments";

export const SideComments: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [comments] = useComments();

  useEffect(() => {
    if (localStorage) {
      setVisible(!Boolean(localStorage.getItem("hideComments")));
    }
  }, []);

  const toggleVisible = () => {
    if (visible) {
      localStorage.setItem("hideComments", "true");
    } else {
      localStorage.removeItem("hideComments");
    }

    setVisible((prev) => !prev);
  };

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      <h3 onClick={toggleVisible}>
        Комментарии <ArrowRightIcon />
      </h3>
      {visible &&
        comments.map((obj) => <SideCommentItem key={obj.id} {...obj} />)}
    </div>
  );
};
