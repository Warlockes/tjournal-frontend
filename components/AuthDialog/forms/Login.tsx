import React from "react";
import Alert from "@mui/lab/Alert";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormField } from "../../FormField";
import { FormProvider, useForm } from "react-hook-form";
import { LoginFormSchema } from "../../../utils/validations/loginForm";

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOpenRegister }) => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 5000));
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" type="password" />
          {false && (
            <Alert severity="error" className="mb-20">
              {false}
            </Alert>
          )}
          <div className="d-flex align-center justify-between">
            <Button
              // disabled={!form.formState.isValid || form.formState.isSubmitting}
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
