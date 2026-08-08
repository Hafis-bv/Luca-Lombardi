"use client";

import { useAuth } from "@/hooks/useAuth";
import { IUser } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaFirstOrder } from "react-icons/fa";
import { FiLogOut, FiShoppingBag, FiUser } from "react-icons/fi";
import { LuNotepadText } from "react-icons/lu";

interface UserMenuProps {
  user: IUser;
}

export function UserMenu({ user }: UserMenuProps) {
  const [dropDownActive, setDropDownActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { handleLogout } = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropDownActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const authorizedNavLinks = [
    { id: 1, title: "Cart", href: "/cart", icon: FiShoppingBag },
    { id: 2, title: "Orders", href: "/orders", icon: LuNotepadText },
    { id: 3, title: "Profile", href: "/profile", icon: FiUser },
  ];

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setDropDownActive((prev) => !prev)}
        type="button"
        className="block cursor-pointer size-10 md:size-12"
      >
        {user.photoURL ? (
          <Image
            width={48}
            height={48}
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="rounded-full border-2 border-gray-600 size-10 md:size-12"
          />
        ) : (
          <div className="flex items-center justify-center rounded-full border-2 border-gray-600 bg-gray-700 size-10 md:size-12">
            <FiUser className="text-gray-300 size-5 md:size-6" />
          </div>
        )}
      </button>

      <div
        className={`absolute top-[calc(100%+12px)] right-0 z-50 w-56 origin-top-right rounded-2xl border border-black/10 bg-white/95 py-2 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition duration-200 ease-out ${
          dropDownActive
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-black/5 px-4 py-3">
          <p className="truncate text-sm font-medium text-gray-900">
            {user.displayName || "User"}
          </p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
        </div>

        <div className="py-1">
          {authorizedNavLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setDropDownActive(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-black/5"
            >
              <link.icon size={16} />
              {link.title}
            </Link>
          ))}

          <button
            onClick={() => {
              setDropDownActive(false);
              handleLogout();
            }}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
