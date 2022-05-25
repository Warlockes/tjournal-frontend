import { Paper, Typography, Button, Avatar } from "@mui/material";
import clsx from "clsx";
import MessageIcon from "@mui/icons-material/TextsmsOutlined";
import UserAddIcon from "@mui/icons-material/PersonAddOutlined";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import styles from "./FullPost.module.scss";
import { PostActions } from "../PostActions";
import { PostItem } from "../../utils/api/types";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";

interface FullPostProps {
  post: PostItem;
}

export const FullPost: React.FC<FullPostProps> = ({ post }) => {
  const { title, body, user } = post;
  const userData = useAppSelector(selectUserData);

  const changeRating = async (action: "increment" | "decrement") => {};

  return (
    <Paper elevation={0} className={styles.paper}>
      <div className="container">
        <Typography variant="h4" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.text}>
          {body.map((obj) => (
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
              <Avatar>{user.fullName[0]}</Avatar>
              <b>{user.fullName}</b>
              {userData.id === user.id ? (
                <span>Ваш рейтинг: {userData.rating}</span>
              ) : (
                <>
                  <ArrowDropDownCircleIcon
                    className={clsx(
                      styles.changeRatingButton,
                      styles.decrementButton
                    )}
                  />
                  <span className={styles.rating}>{user.rating}</span>
                  <ArrowDropDownCircleIcon
                    className={clsx(
                      styles.changeRatingButton,
                      styles.incrementButton
                    )}
                  />
                </>
              )}
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
