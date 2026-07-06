import { CollectionList } from "@/widgets/CollectionList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <>
      <CollectionList />
    </>
  );
}
