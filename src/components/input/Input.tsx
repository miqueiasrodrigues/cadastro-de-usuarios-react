import React from "react";
import "./input.css";

interface InputProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  label?: string;
  value: number | string;
  type: "text" | "number" | "date" | "password" | "file";
  readOnly: boolean;
  colorError?: boolean;
  placeholder?: string;
  isRequired: boolean;
  maxlength?: number;
  valueChange?: (value: any) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-box">
      <input
        style={props.colorError ? { borderColor: "red" } : {}}
        className="input"
        placeholder={props.placeholder}
        ref={props.inputRef}
        id={props.label?.toLowerCase()}
        type={props.type}
        value={props.value}
        readOnly={props.readOnly}
        onChange={(e) => props.valueChange?.(e.target.value)}
        required={props.isRequired}
        maxLength={props.maxlength}
      />
    </div>
  );
};

export default Input;
