import Star from "@/icon/star-outline";
import { FormLabel } from "react-bootstrap";

const Stars = ({name}) => {
  return (
    <div className="hstack rating flex-row-reverse justify-content-end align-items-center">
      {[1, 2, 3, 4, 5].map((score) => (
        <>
          <input key={score} type="radio" id={`sr_${name}_${score}`} name={name} hidden />
          <FormLabel htmlFor={`sr_${name}_${score}`} className={`d-inline-block lh-1 cursor-pointer m-0 ${score !== 1 && "pe-1"}`}>
            <Star />
          </FormLabel>
        </>
      ))}
    </div>
  );
};

export default Stars;
