"use client";

import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white">
      <BeatLoader color="#1d293d" size={25} speedMultiplier={5} />
    </div>
  );
}
