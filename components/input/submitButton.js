import { forwardRef } from "react";
import { Button } from "react-bootstrap";

const submitButton = forwardRef(function submitButton(props, ref) {
  return (
    <Button
      ref={ref}
      variant="darkblue"
      className="w-100 rounded rounded-3 border-0 fs-6-sm"
      type="submit"
      style={{ paddingBlock: ".75rem" }}
      {...props}
    ></Button>
  );
});

export default submitButton;
