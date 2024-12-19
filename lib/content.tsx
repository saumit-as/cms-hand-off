import { FoodSvg } from "@/components/SVGIcons/food";
import { StaysSVG } from "@/components/SVGIcons/stays";
import { TravelSVG } from "@/components/SVGIcons/travel";

export const Sections = [
  {
    page: "stays",
    title: "Stays That Suit You",
    description: "Find accommodations that match your style and comfort.",
  },
  {
    page: "travels",
    title: "Travel Made Simple",
    description: "Discover seamless options to get you where you want to go.",
  },
  {
    page: "food",
    title: "Savor Every Bite",
    description: "Explore culinary delights to satisfy every craving.",
  },
];

export const Headers = [
  {
    page: "stays",
    imgUrl: "/assets/stays-header-bg.webp",
    title: "Stays Simplified",
    description: "Pre-Book Your Perfect Stay",
  },
  {
    page: "travels",
    imgUrl: "/assets/travels-header-bg.webp",
    title: "Travel Made Easy",
    description: "Reserve Your Journey in Advance",
  },
  {
    page: "food",
    imgUrl: "/assets/foods-header-bg.webp",
    title: "Savor the Journey",
    description: "Pre-Plan Your Dining Experience",
  },
];

export const AboutUsContent = () => {
  return (
    <div className="flex flex-col gap-5">
      <p>Chillmountstays offers a pleasant stay, homemade food, and travel experiences for you, your family, friends, and loved ones. Here, you'll find everything you need in one place.</p>
      <p>We provide the best customer support and guidance to ensure a seamless experience.</p>
    </div>
  );
};

export const WhyUsContent = () => {
  return (
    <div className="flex flex-col gap-5">
      <p>Chillmountstays offers comfort, pleasant stays, homemade food, and travel services—all in one place. We are committed to ensuring your safety and a joyful journey.</p>
      <p>Our team provides the best customer support throughout your entire experience. At Chillmountstays, we are always with you, making sure your needs are met every step of the way.</p>
      <p>Thank you for visiting our page!</p>
    </div>
  );
};

export const OurServicesContent = () => {
  return (
    <div className="max-w-lg">
      <p className="text-center md:text-xl">Chillmountstays offers everything you need in one place accommodation,travel, and food services. Our goal is to satisfy all your needs, ensuring a seamless and enjoyable experience from start to finish.</p>
    </div>
  );
};

export const banners = [
  {
    bannerId: 1,
    title: "Top-Class Rooms for Your Stay",
    imgUrl: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp",
    description: "Enjoy a memorable stay with exceptional service at Chillmount Stays. Perfect for families and loved ones.",
    buttonText: "Book Now",
    buttonLink: "/stays",
  },
  {
    bannerId: 2,
    title: "Your Custom Travel Experience",
    imgUrl: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp",
    description: "Affordable travel with well-trained drivers and comfortable vehicles. No hidden charges—just a memorable journey.",
    buttonText: "Make Your Trip",
    buttonLink: "/travels",
  },
  {
    bannerId: 3,
    title: "Authentic Homemade Meals",
    imgUrl: "https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/ooty-1655457424_bca80f81e8391ebdaaca.webp",
    description: "Enjoy fresh, sustainable meals delivered to your doorstep. No waste, just pure homemade goodness.",
    buttonText: "Check Now",
    buttonLink: "/food",
  },
];

export const OurSevicesIcons = [
  { svg: <StaysSVG height="100" />, heading: "Stays", url: "/stays" },
  { svg: <TravelSVG height="100" />, heading: "Travels", url: "/travels" },
  { svg: <FoodSvg height="100" />, heading: "Food", url: "/food" },
];
