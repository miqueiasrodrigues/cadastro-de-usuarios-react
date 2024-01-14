import React from "react";
import "./button.css";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  action?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      className="button"
      onClick={props?.action}
    >
      {props.children}
    </button>
  );
};

export default Button;