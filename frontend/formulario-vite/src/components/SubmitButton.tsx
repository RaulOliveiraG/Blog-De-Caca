import React from "react";


interface SubmitButtonProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, style, textStyle, type = "submit" }) => (
  <button
    type={type}
    style={style}
  >
    <span style={textStyle}>{children}</span>
  </button>
);

export default SubmitButton;
