import { Fragment, useRef } from "react";
import FormInput from "./formInput";

const allowKeyList = [
  "Delete", "Backspace", "Shift", "Tab"
]

const AuthCodeInput = ({onChange}) => {
  const numberRef = useRef([]);
  const numbers = numberRef.current;

  const getValue = () => numbers.reduce((str, el) => str += el.value, "")

  return (
    <>
      {[0, 1, 2, 3].map((n) => (
        <Fragment key={n}>
          <FormInput
            ref={(ref) => ref && (numbers[n] = ref)}
            style={{ width: "var(--uni-height)" }}
            className="text-center text-indent-0"
            placeholder=""
            onKeyDown={(e) => {
              const regex = /^\d$/;
              const valid = regex.test(e.key)
              if (!valid && !allowKeyList.includes(e.key) ) e.preventDefault();
              if(valid) e.target.value = e.key
            }}
            onInput={({ target }) => {
              const value = target.value;
              if (value === "") return;
              target.value %= value < 0 ? value : 10;
              target.blur();
              for (let node of numbers) {
                if (node.value === "") return node.focus();
              }
            }}
            onChange={() => onChange(getValue())}
          ></FormInput>
          <input name="auth_code" hidden readOnly value={getValue()}/>
          {n !== 3 && <span className="fw-bold text-linegrey fs-5">-</span>}
        </Fragment>
      ))}
    </>
  );
};

export default AuthCodeInput;
