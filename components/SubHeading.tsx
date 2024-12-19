import { Sections } from "@/lib/content";
import React from "react";
interface SubHeadingProps {
  page: string;
}
const SubHeading = ({ page }: SubHeadingProps) => {
  const content = Sections.find((section) => section.page === page);
  return (
    <div>
      <p className="font-medium lg:text-4xl text-center text-xl">{content?.title}</p>
      <p className="text-center lg:text-lg lg:mt-4 text-sm mt-1">{content?.description}</p>
    </div>
  );
};

export default SubHeading;
