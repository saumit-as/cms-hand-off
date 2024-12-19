"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DBImageFile } from "@/types";

interface ImageCarouselProps {
  images: DBImageFile[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      className="w-full max-w-xl mx-auto"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={"image__" + index}>
            <div className="relative aspect-video">
              <Image
                src={image.firebaseUrl}
                alt="Stay vendor image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
