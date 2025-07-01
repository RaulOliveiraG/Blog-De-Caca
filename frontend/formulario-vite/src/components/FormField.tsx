import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <>
    <label className="text-black text-2xl ml-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="bg-[#F1F1F1] text-xl p-4 mb-6 rounded-[5px] w-[400px]"
      placeholder={placeholder}
    />
  </>
);

export default FormField;
