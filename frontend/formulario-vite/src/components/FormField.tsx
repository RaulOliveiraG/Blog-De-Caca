import React from "react";


interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styleInput?: React.CSSProperties;
  styleLabel?: React.CSSProperties;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", value, onChange, placeholder, styleInput, styleLabel, required }) => (
  <>
    <label style={styleLabel}>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      style={styleInput}
      placeholder={placeholder}
    />
  </>
);

export default FormField;
