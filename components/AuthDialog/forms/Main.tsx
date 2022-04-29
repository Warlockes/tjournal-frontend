import { Button } from "@mui/material";

import VkIcon from "../../../img/icons/vk.svg";
import GoogleIcon from "../../../img/icons/google.svg";
import MailIcon from "../../../img/icons/mail.svg";
import FacebookIcon from "../../../img/icons/facebook.svg";
import TwitterIcon from "../../../img/icons/twitter.svg";
import AppleIcon from "../../../img/icons/apple.svg";

import styles from "../AuthDialog.module.scss";

interface MainFormProps {
  onOpenLogin: () => void;
}

export const MainForm: React.FC<MainFormProps> = ({ onOpenLogin }) => {
  return (
    <>
      <div>
        <Button className="mb-15" variant="contained" fullWidth>
          <VkIcon />
          ВКонтакте
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <GoogleIcon />
          Google
        </Button>
        <Button
          onClick={onOpenLogin}
          className="mb-15"
          variant="contained"
          fullWidth
        >
          <MailIcon />
          Через почту
        </Button>
      </div>
      <div className={styles.miniButtons}>
        <Button className="mb-15" variant="contained" fullWidth>
          <FacebookIcon />
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <TwitterIcon />
        </Button>
        <Button className="mb-15" variant="contained" fullWidth>
          <AppleIcon />
        </Button>
      </div>
    </>
  );
};
