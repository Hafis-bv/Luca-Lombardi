import { Hero } from "@/components/Hero";
import NewCollection from "@/components/NewCollection";
import React from "react";

export default function NewCollectionPage() {
  return (
    <>
      <Hero
        title="New Collection"
        description="A new collection shaped by modern elegance — contemporary pieces for men and women, crafted with attention to detail and form."
        className="bg-new-collection"
      />
      <NewCollection />
    </>
  );
}
