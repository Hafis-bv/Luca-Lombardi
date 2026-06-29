import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center mt-40">
      <h1 className="text-8xl text-slate-800 font-bold border-b pb-2.5 mb-10">
        404
      </h1>
      <p className="text-2xl font-medium">Page not found</p>
    </div>
  );
}
