import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  List,
  ListItem,
} from "@mui/material";
import {
  SearchOutlined as SearchIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  AccountCircleOutlined as UserIcon,
} from "@mui/icons-material";

import styles from "./Header.module.scss";
import Link from "next/link";
import { AuthDialog } from "../AuthDialog";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { PostItem } from "../../utils/api/types";
import { Api } from "../../utils/api";

export const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    if (modalVisible && userData) {
      setModalVisible(false);
    }
  }, [modalVisible, userData]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleBlurInput = () => {
    setPosts([]);
  };

  const handleChangeInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);

    try {
      const { posts } = await Api().post.search({
        title: event.target.value,
      });

      setPosts(posts);
    } catch (error) {
      console.warn("Search error", error);
    }
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img
              height={35}
              className="mr-20"
              src="/static/img/logo.svg"
              alt="Logo"
            />
          </a>
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input
            value={searchValue}
            onBlur={handleBlurInput}
            onChange={handleChangeInput}
            placeholder="Поиск"
          />
          {posts.length > 0 && (
            <Paper className={styles.searchBlockPopup}>
              <List>
                {posts.map((obj) => (
                  <Link key={obj.id} href={`/news/${obj.id}`}>
                    <a>
                      <ListItem button>{obj.title}</ListItem>
                    </a>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>

        <Link href="/write">
          <a>
            <Button variant="contained" className={styles.penButton}>
              Новая запись
            </Button>
          </a>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href="/profile/1">
            <a className="d-flex align-center">
              <Avatar
                className={styles.avatar}
                alt="Remy Sharp"
                src="https://leonardo.osnova.io/5ffeac9a-a0e5-5be6-98af-659bfaabd2a6/-/scale_crop/108x108/-/format/webp/"
              />
              <ArrowBottom />
            </a>
          </Link>
        ) : (
          <div className={styles.loginButton} onClick={handleOpenModal}>
            <UserIcon />
            Войти
          </div>
        )}
      </div>
      <AuthDialog visible={modalVisible} onClose={handleCloseModal} />
    </Paper>
  );
};
