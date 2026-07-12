import { BeatLoader } from "react-spinners";

export function CustomLoading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white">
      <BeatLoader color="#1d293d" size={25} speedMultiplier={5} />
    </div>
  );
}
