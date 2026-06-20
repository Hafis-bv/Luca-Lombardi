"use client";

export default function Error() {
  return (
    <div className="h-screen flex flex-col items-center mt-40">
      <h1 className="text-8xl text-slate-800 font-bold border-b pb-2.5 mb-10">
        500
      </h1>
      <p className="text-2xl font-medium">Server error</p>
    </div>
  );
}
