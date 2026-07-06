"use client";

import { collections } from "@/data/collections";
import { useAppSelector } from "@/hooks/redux";
import { CollectionCard } from "@/components/CollectionCard";
import { Container } from "@/components/Container";

export function CollectionList() {
  const searchValue = useAppSelector((state) => state.search.query);

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Container className="py-15">
      {searchValue && (
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Search results for “{searchValue}”
        </h1>
      )}
      {filteredCollections.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-lg">
            No products found for "{searchValue}"
          </p>
        </div>
      )}
    </Container>
  );
}
