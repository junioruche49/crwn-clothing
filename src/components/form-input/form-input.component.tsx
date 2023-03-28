import { FC, InputHTMLAttributes } from "react";
import { Input, Group, FormInputLabel } from "./form-input.styles";

type FormInputType = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputType> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      <FormInputLabel
        shrink={Boolean(
          otherProps.value &&
            typeof otherProps.value === "string" &&
            otherProps.value?.length
        )}
      >
        {label}
      </FormInputLabel>
    </Group>
  );
};

export default FormInput;
