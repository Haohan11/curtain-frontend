import { forwardRef } from "react";
import { Button as BSButton } from "react-bootstrap";
import addClassName from "@/tool/addClassName";

const submitButton = forwardRef(function submitButton(props, ref) {
  const Button = addClassName(
    BSButton,
    "w-100 rounded rounded-3 border-0 fs-6-sm uni-height"
  );
  return (
    <Button
      ref={ref}
      variant="darkblue"
      type="submit"
      {...props}
    ></Button>
  );
});

export default submitButton;
