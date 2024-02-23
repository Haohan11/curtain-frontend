import { forwardRef } from "react";
import FormInput from "./formInput";

const FormPassword = forwardRef(function FormPassword(props, ref) {
  return (
    <FormInput
      {...props}
      ref={ref}
      type="password"
      className="letter-spacing-3"
    />
  );
});

export default FormPassword;
