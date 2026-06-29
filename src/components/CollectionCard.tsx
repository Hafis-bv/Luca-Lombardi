import { Collection } from "@/types/collection";
import Link from "next/link";

interface CardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CardProps) {
  return (
    <Link
      className="flex flex-col items-center justify-center text-center max-w-85 mx-auto"
      href={`/${collection.collection}/${collection.id}`}
    >
      <div className="relative w-full">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-auto xl:h-100 object-cover rounded-xl w-full shadow-2xl"
        />
        {collection.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            New
          </span>
        )}
      </div>
      <div className="flex items-center justify-between mt-7 w-full px-2">
        <h2>{collection.title}</h2>
        <span className="text-sm">{collection.price}$</span>
      </div>
    </Link>
  );
}
