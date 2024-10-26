import React from "react";

type Props = {
  children: React.ReactNode;
  formAction?: (formData: FormData) => Promise<void>;
};

const Button = ({ children, formAction }: Props) => {
  return (
    <button
      type="submit"
      className="w-48 h-14 bg-primary rounded-3xl text-white border border-accent shadow"
      formAction={formAction}
    >
      <h2>{children}</h2>
    </button>
  );
};

export default Button;
