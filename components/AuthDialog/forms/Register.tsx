import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Alert } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormSchema } from "../../../utils/validations/registerForm";

import { FormField } from "../../FormField";

interface LoginFormProps {
  onOpenLogin: () => void;
}

const errorMessage = false;

export const RegisterForm: React.FC<LoginFormProps> = ({ onOpenLogin }) => {
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullname" label="Имя и фамилия" />
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
