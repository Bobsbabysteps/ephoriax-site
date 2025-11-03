import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 text-white hover:from-indigo-800 hover:to-indigo-600 focus:ring-indigo-500 shadow-md hover:shadow-lg"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;