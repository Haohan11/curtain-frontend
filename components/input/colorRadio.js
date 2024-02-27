import { forwardRef } from "react";
import Image from "next/image";
import { FormGroup, FormCheck, FormLabel } from "react-bootstrap";

const ColorCheck = forwardRef(function ColorCheck(
  { id, label, src, name, onClick },
  ref
) {
  return (
    <FormLabel className="text-center cursor-pointer">
      <FormCheck className="d-inline-block position-relative lh-1">
        <FormCheck.Input
          ref={ref}
          type="radio"
          name={name}
          value={id}
          onClick={onClick}
          className={`m-0 rounded-1`}
        />
        <Image alt="color radio image" fill sizes="1em" src={src} />
      </FormCheck>
      <div className="d-block m-0 fs-6-xs">{label}</div>
    </FormLabel>
  );
});

export default ColorCheck;
