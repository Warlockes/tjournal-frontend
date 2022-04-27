import React from "react";
import Link from "next/link";
import { Button, ListItem } from "@material-ui/core";

import { menu } from "../../constants/menu";
import styles from "./LeftMenu.module.scss";
import { useRouter } from "next/router";

export const LeftMenu: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.menu}>
      <ul>
        {menu.map((obj) => (
          <li key={obj.path}>
            <Link href={obj.path}>
              <a>
                <Button variant={pathname === obj.path ? "contained" : "text"}>
                  {obj.icon}
                  {obj.text}
                </Button>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
