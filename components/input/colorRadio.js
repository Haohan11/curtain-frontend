import { forwardRef } from "react";
import Image from "next/image";
import { FormCheck, FormLabel } from "react-bootstrap";

const ColorRadio = forwardRef(function ColorRadio(
  { id, label, src, name, onClick, onInput, defaultChecked, disabled, showBorder },
  ref
) {
  return (
    <FormLabel
      className={`text-center cursor-pointer m-0 ${disabled ? "pe-none" : ""}`}
      style={{ userSelect: "none" }}
    >
      <FormCheck className={`d-inline-block position-relative lh-1 ${showBorder && "rounded-1 border border-2 border-checkboxblue"}`}>
        <FormCheck.Input
          ref={ref}
          type="radio"
          {...{
            name,
            onClick,
            onInput,
            defaultChecked,
            value: id,
            disabled,
          }}
          className={`m-0 rounded-1 color-input`}
        />
        <Image
          className="rounded-1"
          alt="color radio image"
          fill
          sizes="1em"
          src={src || "/color_check/brown.jpg"}
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
