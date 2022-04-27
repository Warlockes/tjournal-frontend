import {
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
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

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <Typography className={styles.title}>
              {formType === "main" ? (
                "Вход в TJ"
              ) : (
                <p
                  onClick={() => setFormType("main")}
                  className={styles.backTitle}
                >
                  <ArrowBackIcon /> К авторизации
                </p>
              )}
            </Typography>
            {formType === "main" && <MainForm onOpenLogin={handleOpenLogin} />}
            {formType === "login" && <LoginForm />}
            {formType === "register" && (
              <RegisterForm
                onOpenRegister={() => setFormType("register")}
                onOpenLogin={() => setFormType("login")}
              />
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
