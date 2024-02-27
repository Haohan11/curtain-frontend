import Star from "@/icon/star-outline";
import { FormLabel } from "react-bootstrap";

const Stars = ({name}) => {
  return (
    <div className="hstack h-100 rating flex-row-reverse justify-content-end">
      {[1, 2, 3, 4, 5].map((score) => (
        <>
          <input key={score} type="radio" id={`sr_${name}_${score}`} name={name} hidden />
          <FormLabel htmlFor={`sr_${name}_${score}`} className={`d-inline-block lh-1 cursor-pointer ${score !== 1 && "pe-1"}`}>
            <Star className={`${score !== 5 && "me-1"}`} />
          </FormLabel>
        </>
      ))}
    </div>
  );
};

export default Stars;
