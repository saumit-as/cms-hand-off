"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { banners } from "@/lib/content";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";

const HomeCarousel = () => {
  const router = useRouter();
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="relative lg:aspect-[2.39/1] aspect-[16/9] flex items-center justify-center  text-center">
                  <Image
                    src={banner.imgUrl}
                    alt=""
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 max-w-xl">
                    <h2 className="md:text-4xl text-sm font-bold text-white mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-white/90 mb-4 md:text-base text-xs">
                      {banner.description}
                    </p>
                    <Button
                      className="bg-cms hover:bg-green-600"
                      onClick={() => router.push(`${banner.buttonLink}`)}
                    >
                      {banner.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeCarousel;
