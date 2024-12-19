import { Menu } from "lucide-react";
import { NavLinks } from "./NavLinks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="hidden md:block">
        <NavLinks />
      </div>
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="w-64 pt-10">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {/* <SheetDescription></SheetDescription> */}
            </SheetHeader>
            <NavLinks onLinkClick={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
