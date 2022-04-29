import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { LoginForm } from "./forms/Login";
import { MainForm } from "./forms/Main";
import { RegisterForm } from "./forms/Register";
import styles from "./AuthDialog.module.scss";

interface AuthDialogProps {
  visible: boolean;
  onClose: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ visible, onClose }) => {
  const [formType, setFormType] = React.useState<"main" | "login" | "register">(
    "main"
  );

  const handleOpenLogin = () => {
    setFormType("login");
  };

  const handleOpenRegister = () => {
    setFormType("register");
  };

  const handleOpenMain = () => {
    setFormType("main");
  };

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <Typography className={styles.title}>
              {formType === "main" ? (
                "Вход в TJ"
              ) : (
                <p onClick={handleOpenMain} className={styles.backTitle}>
                  <ArrowBackIcon /> К авторизации
                </p>
              )}
            </Typography>
            {formType === "main" && <MainForm onOpenLogin={handleOpenLogin} />}
            {formType === "login" && (
              <LoginForm onOpenRegister={handleOpenRegister} />
            )}
            {formType === "register" && (
              <RegisterForm onOpenLogin={handleOpenLogin} />
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
