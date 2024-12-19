import { Headers } from "@/lib/content";
import { StaysEnquiry } from "./StaysEnquiry";
import Image from "next/image";
import { FoodEnquiry } from "./FoodEnquiry";
import { TravelsEnquiry } from "./TravelsEnquiry";

interface PageHeaderProps {
  service: "stays" | "travels" | "food";
}

export default function PageHeader({ service }: PageHeaderProps) {
  const content = Headers.find((header) => header.page === service);
  if (!content) {
    return null;
  }
  return (
    <header className="relative lg:aspect-[4/1] aspect-[16/9] overflow-hidden">
      <Image src={content.imgUrl} alt={`${service} header image`} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex flex-col p-4 justify-end">
        <div className="container mx-auto lg:px-4 lg:py-8">
          <p className="text-2xl font-semibold text-white">{content.title || `Find Your Perfect ${service.charAt(0).toUpperCase() + service.slice(1)}`}</p>
          <p className="text-lg font-medium text-white">{content.description}</p>
        </div>
      </div>
    </header>
  );
}
