"use client";
import { LocationCard } from "./components/LocationCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const categories = [
    { name: "ကချင်ပြည်နယ်", href: "/kachin", imageSrc: "/kachin.jpg" },
    { name: "ကယားပြည်နယ်", href: "/kayar", imageSrc: "/kayah.jpg" },
    { name: "ကရင်ပြည်နယ်", href: "/kayin", imageSrc: "/kayin.jpg" },
    { name: "ချင်းပြည်နယ်", href: "/chin", imageSrc: "/chin.jpg" },
    { name: "မွန်ပြည်နယ်", href: "/mon", imageSrc: "/mon.jpg" },
    { name: "ရခိုင်ပြည်နယ်", href: "/rakhine", imageSrc: "/rakhine.jpeg" },
    { name: "ရှမ်းပြည်နယ်", href: "/shan", imageSrc: "/shan.jpg" },
    { name: "ရန်ကုန်တိုင်းဒေသကြီး", href: "/yangon", imageSrc: "/yangon.jpg" },
    { name: "မန္တလေးတိုင်းဒေသကြီး", href: "/mandalay", imageSrc: "/mandalay.jpg" },
    { name: "မကွေးတိုင်းဒေသကြီး", href: "/magway", imageSrc: "/magway.jpg" },
    { name: "စစ်ကိုင်းတိုင်းဒေသကြီး", href: "/sagaing", imageSrc: "/sagaing.jpg" },
    { name: "ဧရာဝတီတိုင်းဒေသကြီး", href: "/ayeyarwady", imageSrc: "/ayeyarwady.jpg" },
    { name: "ပဲခူးတိုင်းဒေသကြီး", href: "/bago", imageSrc: "/bago.jpg" },
    { name: "တနင်္သာရီတိုင်းဒေသကြီး", href: "/tanintharyi", imageSrc: "/tanintharyi.jpg" },
    { name: "နေပြည်တော်", href: "/naypyidaw", imagesrc:"/naypyidaw.jpeg" }
  ];
  console.log("categories", categories);
  return (
    <div>
      <h1 className="my-10 text-center text-3xl md:text-5xl font-bold text-gray-800">
       You're Welcome.
      </h1>
      <p className="my-6 text-center text-lg md:text-xl text-gray-600
        animate-fade-in-up transition-all duration-500 hover:text-gray-800
        leading-relaxed tracking-wide">
        Explore the beauty, culture, and history of Myanmar through our curated
        content.
      </p>
      <div className="max-w-7xl mx-auto m-12">
        {isMobile ? (
          <div className="px-4 sm:px-10">
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {categories.map((category, index) => (
                <SwiperSlide key={index} className="pb-10">
                  <div className="transform transition duration-300 hover:scale-105">
                    <LocationCard
                      title={category.name}
                      href={category.href}
                      imageSrc={category.imageSrc}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10">
            {categories.map((category, index) => (
              <div key={index} className="transform transition duration-300 hover:scale-105">
                <LocationCard
                  title={category.name}
                  href={category.href}
                  imageSrc={category.imageSrc}
                  contentCount={index + 1}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className=" text-center text-gray-500 bg-white">
        <p className="text-sm">© {new Date().getFullYear()} Discover Myanmar. All rights reserved.</p>
      </footer>
    </div>
  );
}
