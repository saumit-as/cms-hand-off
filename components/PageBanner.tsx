import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  height?: "small" | "medium" | "large";
}

export function PageBanner({ title, subtitle, imageUrl }: PageBannerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden h-48 md:h-64 mb-5 rounded-2xl`}
    >
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl lg:text-2xl text-white">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
