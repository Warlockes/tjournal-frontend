import {
  WhatshotOutlined as FireIcon,
  SmsOutlined as MessageIcon,
  TrendingUpOutlined as TrendingIcon,
  FormatListBulletedOutlined as ListIcon,
} from "@mui/icons-material";

export const menu = [
  { text: "Лента", icon: <FireIcon />, path: "/" },
  { text: "Сообщения", icon: <MessageIcon />, path: "/messages" },
  { text: "Рейтинг RJ", icon: <TrendingIcon />, path: "/rating" },
  { text: "Подписки", icon: <ListIcon />, path: "/follows" },
];
