import {
  WhatshotOutlined as FireIcon,
  SmsOutlined as MessageIcon,
  TrendingUpOutlined as TrendingIcon,
  FormatListBulletedOutlined as ListIcon,
} from "@material-ui/icons";

export const menu = [
  { text: "Лента", icon: <FireIcon />, path: "/" },
  { text: "Сообщения", icon: <MessageIcon />, path: "/messages" },
  { text: "Рейтинг RJ", icon: <TrendingIcon />, path: "/rating" },
  { text: "Подписки", icon: <ListIcon />, path: "/follows" },
];
