import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Неверная почта").required("Поле обязательно"),
  password: yup
    .string()
    .min(6, "Минимальная длина пароля - 6 символов")
    .required("Поле обязательно"),
});
