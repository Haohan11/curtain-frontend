import { FormControl } from "react-bootstrap";
import addClassName from "@/tool/addClassName";

const FormInput = addClassName(
  FormControl,
  "border border-1 border-linegrey text-textgrey text-indent-5 uni-height"
);

export default FormInput;
