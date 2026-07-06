export const womenCollection = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Quiet Luxury",
  price: 557,
  image: "/women.jpeg",
  isNew: i % 2 === 0,
  collection: "women-collection",
  popular: i % 3 === 0,
  sizes: [
    { id: 1, size: "XS", stock: 10 },
    { id: 2, size: "S", stock: 10 },
    { id: 3, size: "M", stock: 10 },
    { id: 4, size: "L", stock: 10 },
    { id: 5, size: "XL", stock: 0 },
  ],
}));

export const menCollection = Array.from({ length: 10 }, (_, i) => ({
  id: i + 11,
  title: "Abbas",
  price: 557,
  image: "https://luca-lombardi-three.vercel.app/men/urban.png",
  isNew: i % 2 === 0,
  collection: "men-collection",
  popular: i % 3 === 0,
  sizes: [
    { id: 1, size: "XS", stock: 10 },
    { id: 2, size: "S", stock: 10 },
    { id: 3, size: "M", stock: 10 },
    { id: 4, size: "L", stock: 15 },
    { id: 5, size: "XL", stock: 0 },
  ],
}));

export const sunglassesCollection = Array.from({ length: 10 }, (_, i) => ({
  id: i + 21,
  title: "Sunglasses",
  price: 557,
  image:
    "https://luca-lombardi-three.vercel.app/sunglasses/sunglasses-milan.png",
  isNew: i % 2 === 0,
  collection: "sunglasses-collection",
  popular: i % 3 === 0,
  sizes: [
    { id: 1, size: "XS", stock: 0 },
    { id: 2, size: "S", stock: 10 },
    { id: 3, size: "M", stock: 10 },
    { id: 4, size: "L", stock: 10 },
    { id: 5, size: "XL", stock: 10 },
  ],
}));

export const collections = [
  ...womenCollection,
  ...menCollection,
  ...sunglassesCollection,
];
