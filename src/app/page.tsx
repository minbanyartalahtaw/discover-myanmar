"use client";
import { LocationCard } from "./components/LocationCard";

export default function Home() {
  const categories = [
    { name: "ကချင်ပြည်နယ်", href: "/kachin", imageSrc: "" },
    { name: "ကယားပြည်နယ်", href: "/kayar", imageSrc: "" },
    { name: "ကရင်ပြည်နယ်", href: "/kayin", imageSrc: "" },
    { name: "ချင်းပြည်နယ်", href: "/chin", imageSrc: "" },
    { name: "မွန်ပြည်နယ်", href: "/mon", imageSrc: "" },
    { name: "ရခိုင်ပြည်နယ်", href: "/rakhine", imageSrc: "" },
    { name: "ရှမ်းပြည်နယ်", href: "/shan", imageSrc: "" },
    { name: "ရန်ကုန်တိုင်းဒေသကြီး", href: "/yangon", imageSrc: "" },
    { name: "မန္တလေးတိုင်းဒေသကြီး", href: "/mandalay", imageSrc: "" },
    { name: "မကွေးတိုင်းဒေသကြီး", href: "/magway", imageSrc: "" },
    { name: "စစ်ကိုင်းတိုင်းဒေသကြီး", href: "/sagaing", imageSrc: "" },
    { name: "ဧရာဝတီတိုင်းဒေသကြီး", href: "/ayeyarwady", imageSrc: "" },
    { name: "ပဲခူးတိုင်းဒေသကြီး", href: "/bago", imageSrc: "" },
    { name: "တနင်္သာရီတိုင်းဒေသကြီး", href: "/tanintharyi", imageSrc: "" },
  ];
  console.log("categories", categories);
  return (
    <div>
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-900">
        Welcome to Discover-Myanmar
      </h1>
      <p className="mt-4 text-center text-lg md:text-xl text-gray-600">
        Explore the beauty, culture, and history of Myanmar through our curated
        content.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6 lg:px-8 xl:px-12">
        {categories.map((caetgory, index) => (
          <LocationCard
            key={index}
            title={caetgory.name}
            href={caetgory.href}
            imageSrc={caetgory.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}
