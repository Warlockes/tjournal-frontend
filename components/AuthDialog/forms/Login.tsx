import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { FormProvider } from "react-hook-form";
import { FormField } from "../../FormField";

const form = {} as any;
const onOpenRegister = () => undefined;
const onSubmit = () => undefined;
const errorMessage = false;

export const LoginForm = () => {
  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Почта" />
          <FormField name="password" label="Пароль" />
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
              Войти
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
