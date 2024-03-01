import { forwardRef } from "react";
import Image from "next/image";
import { FormCheck, FormLabel } from "react-bootstrap";

const ColorCheck = forwardRef(function ColorCheck(
  { id, label, src, name, onClick },
  ref
) {
  return (
    <FormLabel className="text-center cursor-pointer m-0">
      <FormCheck className="d-inline-block position-relative lh-1">
        <FormCheck.Input
          ref={ref}
          type="radio"
          name={name}
          value={id}
          onClick={onClick}
          className={`m-0 rounded-1 bg-${Math.random() < 0.5 && "primary" || Math.random() < 0.5 && "orange" || Math.random() > 0.5 && "red" || "success"}`}
        />
        {src && <Image alt="color radio image" fill sizes="1em" src={src} />}
      </FormCheck>
      <div className="d-block fs-6-xs">{label}</div>
    </FormLabel>
  );
});

export default ColorCheck;
