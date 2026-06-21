"use client";

import clsx from "clsx";
import { ChangeEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputProps {
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  phone?: boolean;
  error?: string | null;
  onPhoneChange?: (value: string) => void;
}

export function Input({
  placeholder,
  type = "text",
  name,
  value,
  onChange = () => {},
  className,
  phone = false,
  error,
  onPhoneChange,
}: InputProps) {
  return phone ? (
    <div className="flex flex-col gap-1">
      <PhoneInput
        country="az"
        onlyCountries={["az", "ru", "tr", "us"]}
        value={value}
        onChange={onPhoneChange}
        specialLabel=""
        inputClass={clsx(
          "!bg-[#f2f2f2] !py-3 !px-2 !pl-12 !rounded-xl !outline-none !w-full !h-auto !border-none",

          className,
        )}
        buttonClass="!bg-[#f2f2f2] !border-none  !rounded-l-xl"
        containerClass="!w-full"
        dropdownClass="!rounded-xl !bg-[#f2f2f2] !shadow-lg"
      />
      {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </div>
  ) : (
    <div className="flex flex-col gap-1">
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
      {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </div>
  );
}
