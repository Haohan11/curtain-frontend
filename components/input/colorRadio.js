import { forwardRef } from "react";
import Image from "next/image";
import { FormCheck, FormLabel } from "react-bootstrap";

const ColorRadio = forwardRef(function ColorRadio(
  { id, label, src, name, onClick, defaultChecked },
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
          className={`m-0 rounded-1 color-input`}
          defaultChecked={defaultChecked}
        />
        <Image
          className="rounded-1"
          alt="color radio image"
          fill
          sizes="1em"
          src={
            src ||
            `/color_check/${
              (id % 2 === 0 && "red") ||
              (id % 3 === 0 && "green") ||
              (id % 5 === 0 && "blue") ||
              "brown"
            }.jpg`
          }
        />
      </FormCheck>
      {label && (
        <div className="d-block fs-6-xs text-break" style={{ width: "50px" }}>
          {label}
        </div>
      )}
    </FormLabel>
  );
});

export default ColorRadio;
