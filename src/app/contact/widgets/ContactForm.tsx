"use client";

import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import {
  ContactFormData,
  contactSchema,
  ErrorContactState,
} from "@/schemas/contact";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ErrorContactState>({
    name: null,
    phone: null,
    email: null,
    message: null,
    general: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>("akjeqwoiehqwoiu");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] ?? null,
        phone: fieldErrors.phone?.[0] ?? null,
        email: fieldErrors.email?.[0] ?? null,
        message: fieldErrors.message?.[0] ?? null,
        general: null,
      });
      return;
    }

    const validatedData = result.data;

    setLoading(true);

    try {
      await axios.post("/api/contact", validatedData);
      setSuccess("Your message has been successfully sent!");
      setFormData({ name: "", phone: "", email: "", message: "" });

      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.log(err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.err ||
        "Something went wrong";

      setErrors({ ...errors, general: message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center text-center gap-5 pt-20">
        <h1 className="text-4xl font-semibold">Get In Touch With Us!</h1>
        <p className="max-w-150">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          aspernatur blanditiis earum expedita nobis qui repellendus tenetur
          unde ut voluptate.
        </p>
      </div>
      <Container className="pt-15 pb-30 mx-4 p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-8 shadow-2xl rounded-3xl w-full p-8 md:w-140 mx-auto "
        >
          <div className="flex flex-col relative col-span-2 md:col-span-1">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              error={errors.name}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              name="phone"
              value={formData.phone}
              onPhoneChange={handlePhoneChange}
              phone={true}
              placeholder=""
              error={errors.phone}
            />
          </div>
          <div className="flex flex-col relative col-span-2">
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              error={errors.email}
            />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message..."
              className="bg-[#f2f2f2] py-3 px-2 rounded-xl h-40 outline-none resize-none"
            />
            {errors.message && (
              <span className="text-red-600 text-xs mt-1">
                {errors.message}
              </span>
            )}
          </div>
          {errors.general && (
            <span className="text-red-600 text-sm">{errors.general}</span>
          )}
          {success && <span className="text-xl text-blue-600">{success}</span>}
          <button
            disabled={loading}
            className="bg-black col-span-2 text-white w-full font-medium tracking-[2px] py-3 rounded-3xl cursor-pointer"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </Container>
    </div>
  );
}
