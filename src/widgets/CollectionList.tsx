"use client";

import { useAppSelector } from "@/hooks/redux";
import { CollectionCard } from "@/components/CollectionCard";
import { Container } from "@/components/Container";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Collection } from "@/types/collection";
import { getAllProducts } from "@/utils/products";

export function CollectionList() {
  const { query } = useAppSelector((state) => state.search);

  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    async function getCollections() {
      try {
        const res = await getAllProducts();
        setCollections(res);
      } catch (err) {
        console.log(err);
      }
    }

    getCollections();
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(collections, {
      keys: ["title", "collection"],
      threshold: 0.5,
    });
  }, [collections]);

  const filteredCollections = query
    ? fuse.search(query).map((r) => r.item)
    : collections;

  return (
    <Container className="py-15">
      {query && (
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Search results for “{query}”
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
            No products found for "{query}"
          </p>
        </div>
      )}
    </Container>
  );
}
