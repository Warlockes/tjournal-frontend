import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      {...register(name)}
      name={name}
      type={type}
      className="mb-20"
      size="small"
      label={label}
      variant="outlined"
      error={!!formState.errors[name]?.message}
      helperText={formState.errors[name]?.message}
      fullWidth
    />
  );
};
