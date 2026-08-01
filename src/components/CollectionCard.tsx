import { Collection } from "@/types/collection";
import Link from "next/link";

interface CardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CardProps) {
  return (
    <Link
      href={`/${collection.collection}/${collection.id}`}
      className="flex w-75 flex-col"
    >
      <div className="relative h-[400px] w-75 overflow-hidden rounded-xl shadow-2xl">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-full w-full object-cover"
        />

        {collection.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            New
          </span>
        )}
      </div>

      <div className="mt-7 flex w-full items-center justify-between gap-3 px-2">
        <h2 className="truncate">{collection.title}</h2>
        <span className="shrink-0 text-sm">{collection.price}$</span>
      </div>
    </Link>
  );
}
