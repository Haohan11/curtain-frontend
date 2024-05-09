import { forwardRef } from "react";
import { Button as BSButton } from "react-bootstrap";
import Link from "next/link";
import addClassName from "@/tool/addClassName";

const LinkButton = forwardRef(function LinkButton({ children, ...props }, ref) {
  const { variant, className, type, ...linkProps } = props;
  const Button = addClassName(
    BSButton,
    "rounded rounded-3 border-0 fs-6-sm uni-height px-6"
  );
  return (
    <Link {...linkProps} ref={ref}>
      <Button
        variant="darkblue"
        type="button"
        {...(variant && { variant })}
        {...(className && { className })}
        {...(type && { type })}
      >
        {children}
      </Button>
    </Link>
  );
});

export default LinkButton;
