"use client";

import { Container } from "@/components/Container";
import { CollectionCard } from "@/components/CollectionCard";
import { useState } from "react";
import { Collection } from "@/types/collection";

interface CollectionsProps {
  collection: Collection[];
}

export function Collections({ collection }: CollectionsProps) {
  const [showMore, setShowMore] = useState(4);

  function handleShowMore() {
    if (showMore >= collection.length) {
      setShowMore(4);
    } else {
      setShowMore((prev) => prev + 4);
    }
  }

  return (
    <div className="py-30">
      <Container className="grid justify-center gap-8 [grid-template-columns:repeat(auto-fit,300px)]">
        {collection.slice(0, showMore).map((item) => (
          <CollectionCard key={item.id} collection={item} />
        ))}
      </Container>

      {collection.length > 4 && (
        <button
          onClick={handleShowMore}
          className="mx-auto mt-15 block cursor-pointer rounded-3xl border border-transparent bg-black px-8 py-3 text-lg font-medium text-white transition-all duration-300 xl:hover:border-black xl:hover:bg-transparent xl:hover:text-black"
        >
          {showMore >= collection.length ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
