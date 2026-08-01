export type Size = "XS" | "S" | "M" | "L" | "XL";

export interface CollectionSize {
  id: number;
  size: string;
  stock: number;
}

export interface Collection {
  id: string;
  image: string;
  title: string;
  price: number;
  isNew: boolean;
  collection: string;
  sizes: CollectionSize[];
}
