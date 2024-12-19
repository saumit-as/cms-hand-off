"use client";
import { OurServicesContent, OurSevicesIcons } from "@/lib/content";
import { color, motion } from "motion/react";
import { useRouter } from "next/navigation";

export const OurServices = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center md:gap-10 gap-6">
      <span className="lg:text-4xl font-medium text-xl mt-5">Our Sevices</span>
      <div className="mx-4">
        <OurServicesContent />
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-60">
        {OurSevicesIcons.map((services, __idx) => (
          <motion.div
            whileHover={{
              border: "dotted 1px rgba(36, 133, 18, 1)",
              borderRadius: "5px",
              scale: 1.1,
            }}
            whileTap={{
              border: "dotted 1px rgba(36, 133, 18, 1)",
              borderRadius: "5px",
            }}
            key={__idx}
            className="flex flex-col items-center cursor-pointer p-5"
            onClick={() => {
              router.push(services.url);
            }}
          >
            {services.svg}
            <span className="font-poppins text-xl font-semibold">
              {services.heading}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
