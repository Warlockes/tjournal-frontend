import * as yup from "yup";
import { LoginFormSchema } from "./loginForm";

export const RegisterFormSchema = yup
  .object()
  .shape({
    fullname: yup.string().required("Поле обязательно"),
  })
  .concat(LoginFormSchema);
