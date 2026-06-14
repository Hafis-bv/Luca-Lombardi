import { Container } from "@/components/Container";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  const footerLinks = [
    {
      id: 1,

      title: "Company",

      links: [
        { id: 1, label: "Women", href: "/women" },
        { id: 2, label: "Men", href: "/men" },
        { id: 3, label: "New Arrivals", href: "/new-arrivals" },
        { id: 4, label: "About", href: "/about" },
      ],
    },

    {
      id: 2,
      title: "Feedback",
      links: [
        { id: 1, label: "Contact us", href: "/contact" },
        { id: 2, label: "+1 (773) 303-6006", href: "tel:+17733036006" },
        { id: 3, label: "info@lombardi.com", href: "mailto:info@lombardi.com" },
      ],
    },

    {
      id: 3,
      title: "Legal",
      links: [
        { id: 1, label: "Terms of Service", href: "/terms-of-service" },
        { id: 2, label: "Privacy Policy", href: "/privacy-policy" },
        { id: 3, label: "Privacy Preferences", href: "/privacy-preferences" },
      ],
    },
  ];
  return (
    <footer className="bg-slate-800 py-15 sm:py-30 px-5 text-white">
      <Container className="px-3 flex flex-col sm:flex-row sm:flex-wrap gap-10 justify-center text-center lg:flex-nowrap lg:justify-between lg:text-left">
        <div>
          <Link className="text-3xl font-bold tracking-wide" href={"/"}>
            LUCA LOMBARDI
          </Link>
          <div className="flex items-center justify-center lg:justify-start gap-4 mt-7">
            <FaInstagram size={25} />
            <FaTelegram size={25} />
            <FaWhatsapp size={25} />
          </div>
        </div>
        <div className="flex flex-col flex-wrap sm:flex-row gap-12 text-center sm:text-left">
          {footerLinks.map(({ id, title, links }) => (
            <div className="text-center sm:text-start" key={id}>
              <h1 className="text-2xl mb-8 font-light">{title}</h1>
              <ul className="flex flex-col gap-3 text-center sm:text-start">
                {links.map((link) => (
                  <Link
                    className="text-gray-200"
                    key={link.id}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-light">Subscribe to our newsletter!</h1>
          <p className="max-w-90 text-center lg:text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, atque.
          </p>
          <form className="relative">
            <input
              className="bg-[#e5e5e5] p-3 w-full text-gray-700 outline-none rounded-l-lg"
              type="text"
              placeholder="Enter your email..."
            />
            <button className="absolute -right-2 top-0 py-3 px-5 bg-black text-white cursor-pointer rounded-r-lg">
              SUBMIT
            </button>
          </form>
        </div>
      </Container>
    </footer>
  );
}
