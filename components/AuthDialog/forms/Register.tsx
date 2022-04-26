import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { FormProvider } from "react-hook-form";
import { FormField } from "../../FormField";

interface LoginFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

const form = {} as any;
const errorMessage = false;
const onSubmit = () => undefined;

export const RegisterForm: React.FC<LoginFormProps> = ({
  onOpenRegister,
  onOpenLogin,
}) => {
  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        {errorMessage && (
          <Alert severity="error" className="mb-20">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Зарегистрироваться
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
