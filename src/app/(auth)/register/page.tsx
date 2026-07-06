import { Metadata } from "next";
import { RegisterForm } from "./widgets/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
