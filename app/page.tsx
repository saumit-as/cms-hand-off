import { AboutUs } from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import HomeCarousel from "@/components/HomeCarousel";
import { OurServices } from "@/components/OurSevices";
import { PlacesToVisit } from "@/components/PlacesToVisit";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div>
        <HomeCarousel />
      </div>
      <div className="container mx-auto">
        <section className="py-12 lg:py-20">
          <OurServices />
        </section>
        <section className="py-12 lg:py-24">
          <PlacesToVisit />
        </section>
        <section className="pt-12 lg:py-24">
          <AboutUs />
        </section>
        <section className="py-12 lg:py-24 md:px-0 px-6">
          <ContactUs />
        </section>
      </div>
    </main>
  );
}
