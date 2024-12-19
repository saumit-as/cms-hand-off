"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export const PlacesToVisit = () => {
  const placesToVisitDetails = [
    {
      name: "Boat House",
      url: "/assets/BPTV/boatHouse.jpg",
    },
    {
      name: "Botanical Garden",
      url: "/assets/BPTV/botanicalGarden.jpg",
    },
    {
      name: "Rose Garden",
      url: "/assets/BPTV/roseGarden.jpg",
    },
  ];
  return (
    <div className="flex flex-col items-center lg:gap-20 gap-10 font-poppins">
      <p className="text-center lg:text-4xl font-medium text-xl ">
        Best Places to Visit
      </p>
      <div className="flex flex-col gap-5 justify-around lg:flex-row xl:gap-10">
        {placesToVisitDetails.map((image, index) => {
          return (
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, amount: 0.8 }}
              initial={{ opacity: 0, y: 20 * index, scale: 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center gap-3"
              key={image.name}
            >
              <motion.div className="w-[300px] h-[180px] xl:w-[450px] xl:h-[250px] relative overflow-hidden rounded-3xl border-white border-4 border-solid drop-shadow-xl">
                <Image
                  className="w-full h-full object-center absolute object-cover"
                  width={1000}
                  height={1000}
                  alt={image.name}
                  src={image.url}
                />
              </motion.div>
              <p className="font-medium font-poppins mt-1">{image.name}</p>
            </motion.div>
          );
        })}
      </div>
      <Button className=" bg-cms hover:bg-green-600">View More</Button>
    </div>
  );
};
