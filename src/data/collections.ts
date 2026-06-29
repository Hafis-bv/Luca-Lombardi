export const womenCollection = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Quiet Luxury",
  price: 557,
  image: "/women.jpeg",
  isNew: i % 2 === 0,
  collection: "women-collection",
}));

export const menCollection = Array.from({ length: 10 }, (_, i) => ({
  id: i + 11,
  title: "Abbas",
  price: 557,
  image: "https://luca-lombardi-three.vercel.app/men/urban.png",
  isNew: i % 2 === 0,
  collection: "men-collection",
}));

export const sunglassesCollection = Array.from({ length: 10 }, (_, i) => ({
  id: i + 21,
  title: "Sunglasses",
  price: 557,
  image:
    "https://luca-lombardi-three.vercel.app/sunglasses/sunglasses-milan.png",
  isNew: i % 2 === 0,
  collection: "sunglasses-collection",
}));

export const collections = [
  ...womenCollection,
  ...menCollection,
  ...sunglassesCollection,
];
