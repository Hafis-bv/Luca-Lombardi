"use client";

import { Container } from "@/components/Container";
import Link from "next/link";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { MobileMenu } from "./MobileMenu";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSearchQuery } from "@/store/slices/searchSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { title } from "process";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  const navLinks = [
    {
      title: "Women",
      href: "/women-collection",
      id: 1,
    },
    {
      title: "Men",
      href: "/men-collection",
      id: 2,
    },
    {
      title: "Sunglasses",
      href: "/sunglasses-collection",
      id: 3,
    },
    {
      title: "New Collection",
      href: "/new-collection",
      id: 4,
    },
  ];

  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    dispatch(setSearchQuery(inputValue));
    router.push("/search");
    setInputValue("");
  };
  return (
    <nav className="sticky top-0 z-30 w-full bg-white text-gray-600 shadow-sm">
      <Container className="flex items-center justify-between p-5">
        <Link href="/" className="text-xl font-bold tracking-wide uppercase">
          LUCA LOMBARDI
        </Link>

        <div className="flex items-center gap-6 md:gap-12">
          <form
            onSubmit={handleSearch}
            className="relative hidden w-full md:block"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black/20 focus:ring-4 focus:ring-black/5"
              type="text"
            />

            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-xl p-2 text-gray-700 transition hover:bg-black/5 active:scale-[0.7]"
            >
              <IoMdSearch size={22} />
            </button>
          </form>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              className="flex cursor-pointer items-center gap-2 text-sm transition hover:opacity-50"
              href="/login"
            >
              <LuUser size={25} />
              <span className="hidden md:block">Login</span>
            </Link>
          )}

          <button
            onClick={() => setActive(!active)}
            className="z-50 cursor-pointer md:hidden"
            type="button"
          >
            {active ? <IoMdClose size={28} /> : <BiMenuAltLeft size={28} />}
          </button>
        </div>
      </Container>

      <Container className="hidden items-center justify-between border-t border-gray-300 py-6 md:flex">
        <div className="flex items-center gap-8 text-sm font-medium sm:gap-12 sm:text-md">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.id} className="hover:underline">
              {link.title}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="cursor-pointer rounded-lg bg-black px-9 py-3 text-sm font-normal text-white"
        >
          Contact Us!
        </Link>
      </Container>

      <MobileMenu navLinks={navLinks} active={active} setActive={setActive} />
    </nav>
  );
}
