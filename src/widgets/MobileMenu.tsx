import { NavLink } from "@/types/navLink";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";

interface MobileMenuProps {
  navLinks: NavLink[];
  active: boolean;
  setActive: (value: boolean) => void;
}

export function MobileMenu({ navLinks, active, setActive }: MobileMenuProps) {
  return (
    <div
      onClick={() => setActive(false)}
      className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`fixed left-0 top-0 z-50 h-dvh w-[88%] max-w-sm bg-white/90 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition-transform duration-300 ease-out ${
          active ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-full flex-col">
          <div className="top-0 z-10 bg-white/70 backdrop-blur-xl px-5 p-4 border-b border-black/5">
            <form className="relative md:block w-full ">
              <input
                className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 pr-12 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-black/20 focus:ring-4 focus:ring-black/5 transition"
                type="text"
                placeholder="Search..."
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 text-gray-700 hover:bg-black/5 active:scale-[0.7] transition">
                <IoMdSearch size={22} />
              </button>
            </form>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-[18px] font-medium text-gray-900 hover:bg-black/5 transition"
                >
                  {link.title}
                  <span className="text-gray-400">→</span>
                </Link>
              ))}
            </div>
          </nav>
          <div className="px-5 pb-6">
            <div className="flex items-center gap-3">
              <Link
                href={"/"}
                className="flex-1 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-black/5 transition flex items-center justify-center gap-2"
              >
                <FiShoppingCart size={18} /> <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
