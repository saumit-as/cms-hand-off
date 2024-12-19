"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface NavLinksProps {
  onLinkClick?: () => void;
}

export const NavLinks = ({ onLinkClick }: NavLinksProps) => {
  const pathname = usePathname();
  const handleClick = () => {
    if (onLinkClick) onLinkClick();
  };
  // TODO: Move navLinks to DB
  const navLinks = [
    { text: "Home", url: "/" },
    { text: "Stay", url: "/stays" },
    { text: "Travels", url: "/travels" },
    { text: "Food", url: "/food" },
    { text: "Contact Us", url: "/#contact-us" },
  ];
  return (
    <div className="flex gap-5 lg:gap-9 md:flex-row items-end flex-col">
      {navLinks.map((link, idx) => (
        <Link key={"link__" + idx} className={`text-lg lg:text-base md:text-sm hover:underline hover:text-cms underline-offset-4 cursor-pointer ${pathname === link.url ? "text-cms font-bold" : "text-black"}`} onClick={handleClick} href={link.url}>
          <span>{link.text}</span>
        </Link>
      ))}
    </div>
  );
};
