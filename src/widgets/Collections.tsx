import Link from "next/link";

export function Collections() {
  const collections = [
    {
      id: 1,
      title: "Men's collection",
      img: "https://www.fashionbeans.com/wp-content/uploads/2024/04/lucafaloni_manwithsunglasseswearinganavyblazerandjeans.jpg",
      href: "/men-collection",
    },
    {
      id: 2,
      title: "Women's collection",
      img: "https://i.pinimg.com/564x/e6/3e/ef/e63eef54f74009dbb7709e24d26e35af.jpg",
      href: "/women-collection",
    },
    {
      id: 3,
      title: "Sunglasses collection",
      img: "https://i.pinimg.com/564x/d2/5b/43/d25b43172c1daed4bb00678f7bc64d0a.jpg",
      href: "/sunglasses-collection",
    },
    {
      id: 4,
      title: "New collection",
      img: "https://www.fashionbeans.com/wp-content/uploads/2024/04/lucafaloni_manwearingaskilcashmereblendzipupsweaterandscarf.jpg",
      href: "/new-collection",
    },
  ];
  return (
    <div className="grid grid-cols-1 py-20 mx-4 gap-4 lg:grid-cols-2 lg:mx-12">
      {collections.map((c) => (
        <div className="h-100 sm:h-175 relative" key={c.id}>
          <img
            src={c.img}
            alt={c.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-15 text-center text-[#f6f6f6] w-full">
            <h1 className="font-semibold text-2xl sm:text-4xl mb-15">
              {c.title}
            </h1>
            <Link
              className="border border-white py-3 px-8 sm:py-4 sm:px-20 text-lg sm:text-xl font-semibold xl:hover:bg-white xl:hover:text-gray-600 duration-300"
              href={c.href}
            >
              Learn more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
