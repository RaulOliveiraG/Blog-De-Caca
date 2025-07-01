import React from "react";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
  <button
    type="submit"
    className="text-[#8A7300] bg-[#00003C] text-xl py-4 px-20 mb-6 rounded-[5px] w-[400px]"
  >
    {label}
  </button>
);

export default SubmitButton;
