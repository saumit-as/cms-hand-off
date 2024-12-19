import Link from "next/link";
import { Logo } from "./Logo";
import { Instagram, Facebook, Twitter } from "lucide-react";
export const Footer = () => {
  return (
    <div className="border border-t py-4 lg:py-12 lg:px-24 px-6 flex lg:flex-row lg:items-end lg:justify-between flex-col bg-gray-100">
      <div>
        <div className="max-w-lg">
          <Logo showText textProperties={["text-csm"]} />
        </div>
        <div className="flex space-x-6 lg:mt-6 mt-4 lg:text-sm text-xs text-gray-600">
          <p>@ 2024 Chill Mount Stays. All rights reserved.</p>
          <Link href={"/policy"}>Privacy Policy</Link>
          <Link href={"/terms"}>Terms and Conditions</Link>
        </div>
      </div>
      <div className="flex lg:space-x-6 space-x-2 mt-4 lg:mt-0 text-gray-700">
        <Link href={"/"}>
          <Instagram />
        </Link>
        <Link href={"/"}>
          <Facebook />
        </Link>
        <Link href={"/"}>
          <Twitter />
        </Link>
      </div>
    </div>
  );
};
