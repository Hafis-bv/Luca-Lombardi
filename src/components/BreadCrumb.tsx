import { Collection } from "@/types/collection";
import Link from "next/link";
import React from "react";

interface BreadCrumbProps {
  collection: Collection;
}

export default function BreadCrumb({ collection }: BreadCrumbProps) {
  return (
    <div className="text-sm text-zinc-500">
      <Link className="hover:text-zinc-900 cursor-pointer" href={"/"}>
        Home
      </Link>
      <span className="mx-2 text-zinc-300">/</span>
      <Link
        className="hover:text-zinc-900 cursor-pointer"
        href={collection.collection}
      >
        {collection.collection}
      </Link>
      <span className="mx-2 text-zinc-300">/</span>
      <span className="text-zinc-900 font-medium">{collection.title}</span>
    </div>
  );
}
