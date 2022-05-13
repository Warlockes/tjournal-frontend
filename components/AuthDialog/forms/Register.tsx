import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { setCookie } from "nookies";
import { Button, Alert } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { UserApi } from "../../../utils/api";
import { CreateUserDto } from "../../../utils/api/types";
import { RegisterFormSchema } from "../../../utils/validations/registerForm";

import { FormField } from "../../FormField";

interface LoginFormProps {
  onOpenLogin: () => void;
}

export const RegisterForm: React.FC<LoginFormProps> = ({ onOpenLogin }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (formData: CreateUserDto) => {
    try {
      const response = await UserApi.register(formData);
      setCookie(null, "tjournalAuthToken", response.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage(null);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }

      console.warn("Register error", error);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" type="password" />
        {errorMessage && (
          <Alert severity="error" className="mb-20">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
              color="primary"
              variant="contained"
            >
              {form.formState.isSubmitting
                ? "Загрузка..."
                : "Зарегистрироваться"}
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
