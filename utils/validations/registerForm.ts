import * as yup from "yup";
import { LoginFormSchema } from "./loginForm";

export const RegisterFormSchema = yup
  .object()
  .shape({
    fullName: yup.string().required("Поле обязательно"),
  })
  .concat(LoginFormSchema);
