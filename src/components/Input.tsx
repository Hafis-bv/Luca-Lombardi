"use client";

import clsx from "clsx";

interface InputProps {
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: () => void;
  className?: string;
}

export function Input({
  placeholder,
  type = "text",
  name,
  value,
  onChange = () => {},
  className,
}: InputProps) {
  return (
    <input
      className={clsx(
        "bg-[#f2f2f2] py-3 px-2 rounded-xl outline-none",
        className,
      )}
      type={type}
      placeholder={placeholder}
      name={name || ""}
      value={value || ""}
      onChange={onChange}
    />
  );
}
