import { CollectionSize } from "@/types/collection";
import clsx from "clsx";

interface SizeSelectorProps {
  sizes: CollectionSize[];
  selectedSizeId: number | null;
  onSelect: (sizeId: number) => void;
}

export function SizeSelector({
  sizes,
  selectedSizeId,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="mt-6">
      <h1 className="text-xs font-semibold text-zinc-900 mb-2">Size</h1>
      <div className="flex gap-2">
        {sizes.map((size) => {
          const isOutOfStock = size.stock == 0;
          const isSelected = selectedSizeId == size.id;
          return (
            <button
              key={size.id}
              disabled={isOutOfStock}
              onClick={() => onSelect(size.id)}
              className={clsx(
                "h-11 w-11 rounded-xl border text-sm font-semibold transition duration-300 cursor-pointer bg-white text-zinc-900",
                isSelected
                  ? "bg-black! border-black! text-white!"
                  : "border-zinc-200! hover:border-zinc-400!",
                isOutOfStock && "cursor-not-allowed! opacity-40",
              )}
            >
              {size.size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
