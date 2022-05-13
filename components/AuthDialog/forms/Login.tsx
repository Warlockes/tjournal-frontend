import React, { useState } from "react";
import Alert from "@mui/lab/Alert";
import { setCookie } from "nookies";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormField } from "../../FormField";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormSchema } from "../../../utils/validations/loginForm";
import { LoginUserDto } from "../../../utils/api/types";
import { UserApi } from "../../../utils/api";

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (formData: LoginUserDto) => {
    try {
      const response = await UserApi.login(formData);
      setCookie(null, "tjournalAuthToken", response.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage(null);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }

      console.warn("Login error", error);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" type="password" />
          {errorMessage && (
            <Alert severity="error" className="mb-20">
              {errorMessage}
            </Alert>
          )}
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              color="primary"
              variant="contained"
            >
              {form.formState.isSubmitting ? "Загрузка..." : "Войти"}
            </Button>
            <Button onClick={onOpenRegister} color="primary" variant="text">
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
