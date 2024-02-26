import { Fragment, useRef } from "react";
import FormInput from "./formInput";

const AuthCodeInput = () => {
  const numberRef = useRef([]);
  const numbers = numberRef.current;

  return (
    <>
      {[0, 1, 2, 3].map((n) => (
        <Fragment key={n}>
          <FormInput
            ref={(ref) => ref && (numbers[n] = ref)}
            style={{ width: "48px" }}
            className="text-center text-indent-0"
            placeholder=""
            name={`authCode${n}`}
            onKeyDown={(e) => {
              const regex = /^\d$/;
              if (regex.test(e.key)) return;
              e.preventDefault();
            }}
            onInput={({ target }) => {
                const value = target.value
              if (value === "") return;
              target.value %= value < 0 ? value : 10
              target.blur();
              for (let node of numbers) {
                if (node.value === "") return node.focus();
              }
            }}
          ></FormInput>
          {n !== 3 && <span className="fw-bold text-linegrey fs-5">-</span>}
        </Fragment>
      ))}
    </>
  );
};

export default AuthCodeInput;
