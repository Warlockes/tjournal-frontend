import { Paper, Typography, Button } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/TextsmsOutlined";
import UserAddIcon from "@material-ui/icons/PersonAddOutlined";

import styles from "./FullPost.module.scss";
import { PostActions } from "../PostActions";

interface FullPostProps {
  title?: string;
  blocks?: any;
}

export const FullPost: React.FC<FullPostProps> = ({ title, blocks }) => {
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className="container">
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.text}>
          {[].map((obj) => (
            <Typography
              key={obj.id}
              dangerouslySetInnerHTML={{ __html: obj.data.text }}
            />
          ))}

          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions />
          </div>
          <div className="d-flex justify-between align-center mt-30 mb-30">
            <div className={styles.userInfo}>
              <img
                src="https://leonardo.osnova.io/104b03b4-5173-fd9f-2af9-b458dddc4a23/-/scale_crop/108x108/-/format/webp/"
                alt="Avatar"
              />
              <b>Donnie Darko</b>
              <span>+1685</span>
            </div>
            <div>
              <Button variant="contained" className="mr-15">
                <MessageIcon />
              </Button>
              <Button variant="contained">
                <UserAddIcon />
                <b className="ml-10">Подписаться</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};
