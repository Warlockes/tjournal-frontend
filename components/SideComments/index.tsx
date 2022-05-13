import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/NavigateNextOutlined";
import data from "../../data";
import clsx from "clsx";
import { CommentItem } from "./CommentItem";

import styles from "./SideComments.module.scss";

export const SideComments = () => {
  const [visible, setVisible] = useState<boolean>(false);

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
        data.comments.popular.map((obj) => (
          <CommentItem key={obj.id} {...obj} />
        ))}
    </div>
  );
};
