import { FormControl } from "react-bootstrap";
import addClassName from "@/tool/addClassName";

const FormInput = addClassName(
  FormControl,
  "border border-1 border-linegrey p-2 text-textgrey text-indent-5"
);

export default FormInput;
