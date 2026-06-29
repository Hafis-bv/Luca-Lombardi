import { Metadata } from "next";
import { ContactForm } from "./widgets/ContactForm";

export const metadata: Metadata = {
  title: {
    absolute: "Contact us",
  },
};

export default function Contact() {
  return (
    <>
      <ContactForm />
    </>
  );
}
