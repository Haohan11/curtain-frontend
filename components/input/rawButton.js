import { forwardRef } from "react";
import { Button as BSButton } from "react-bootstrap";
import addClassName from "@/tool/addClassName";

const RawButton = forwardRef(function RawButton(props, ref) {
  const Button = addClassName(BSButton, "w-100 raw-btn");
  return <Button ref={ref} {...props}></Button>;
});

export default RawButton;
