import { forwardRef } from "react";
import { Button as BSButton } from "react-bootstrap";
import addClassName from "@/tool/addClassName";

const GeneralButton = forwardRef(function GeneralButton(props, ref) {
  const Button = addClassName(
    BSButton,
    "rounded rounded-3 border-0 fs-6-sm uni-height px-6"
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

export default GeneralButton;
