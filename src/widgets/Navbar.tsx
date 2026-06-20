"use client";

import { Container } from "@/components/Container";
import Link from "next/link";
import { title } from "process";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { MobileMenu } from "./MobileMenu";

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
  return (
    <nav className="sticky top-0 z-30 w-full bg-white text-gray-600 shadow-sm">
      <Container className="flex items-center justify-between p-5">
        <Link href={"/"} className="text-xl font-bold tracking-wide uppercase">
          LUCA LOMBARDI
        </Link>
        <div className="flex items-center gap-6 md:gap-12">
          <form className="relative hidden md:block w-full ">
            <input
              placeholder="Search..."
              className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 pr-12 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
              type="text"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-700 hover:bg-black/5 active:scale-[0.7] transition">
              <IoMdSearch size={22} />
            </button>
          </form>
          <Link
            className="flex cursor-pointer items-center gap-2 text-sm transition hover:opacity-50"
            href={"/login"}
          >
            <LuUser size={25} />
            <span className="hidden md:block">Login</span>
          </Link>
          <button
            onClick={() => setActive(!active)}
            className="md:hidden cursor-pointer z-50"
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
          href={"/contact"}
          className="cursor-pointer rounded-lg bg-black px-9 py-3 text-sm font-normal text-white"
        >
          Contact Us!
        </Link>
      </Container>
      <MobileMenu navLinks={navLinks} active={active} setActive={setActive} />
    </nav>
  );
}
