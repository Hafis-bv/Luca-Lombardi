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
    if (collection.length > showMore) setShowMore(showMore + 4);
    else setShowMore(4);
  }
  return (
    <div className="py-30">
      <Container className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {collection.slice(0, showMore).map((item) => (
          <CollectionCard key={item.id} collection={item} />
        ))}
      </Container>
      <button
        onClick={handleShowMore}
        className="bg-black rounded-3xl border border-transparent text-white font-medium text-lg py-3 px-8 block mx-auto mt-15 cursor-pointer xl:hover:bg-transparent xl:hover:border-black xl:hover:text-black transition-all duration-300 "
      >
        {collection.length < showMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
