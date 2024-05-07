import { forwardRef } from "react";
import { Button as BSButton } from "react-bootstrap";
import addClassName from "@/tool/addClassName";

const loginButton = forwardRef(function loginButton(props, ref) {
  const Button = addClassName(
    BSButton,
    "w-100 rounded rounded-3 border-0 fs-6-sm uni-height"
  );
  return (
    <Button
      ref={ref}
      variant="darkblue"
      type="button"
      {...props}
    ></Button>
  );
});

export default loginButton;
