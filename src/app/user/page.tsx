"use client";
import { LocationCard } from "../components/LocationCard";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loading from "../components/Loading";
import { getRegionAndContentCount } from "./action";

interface Category {
  id: number;
  name: string;
  contentCount?: number;
  imageSrc: string;
}

export default function Home() {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchCategories = async () => {
    if (hasFetched) return;
    try {
      // data comming from backend {id : 1, name: "ကချင်ပြည်နယ်", contentCount: 10, imageSrc: "/kachin.jpg"}
      const rawData = await getRegionAndContentCount();
      setCategories(rawData);
      setIsLoading(false);
      setHasFetched(true);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setIsLoading(false);
    }
  };

  // Fetch categories data from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  if (isLoading) return <Loading skeletonStyle="home" />;

  return (
    <div>
      {/* Header Section */}
      <header className="text-center my-10">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-6">
          မင်္ဂလာပါ
        </h1>
        <p
          className="p-10 lg:p-0 text-xs sm:text-sm md:text-lg text-gray-600 
                    animate-fade-in-up transition-all duration-500 hover:text-gray-800 
                    leading-relaxed tracking-wide">
          မြန်မာနိုင်ငံ၏ သမိုင်းနှင့်ယဉ်ကျေးမှုး၊ အထင်ကရနေရာများ၊
          ဒေသဆိုင်ရာအကြောင်းအရာများ ကိုလေ့လာဖတ်ရှုနိုင်ပါသည်။
        </p>
      </header>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto m-12">
        <div className="px-4 sm:px-10">
          {isMobile ? (
            <MobileView categories={categories} />
          ) : (
            <DesktopView categories={categories} />
          )}
        </div>
      </section>
    </div>
  );
}

// Mobile view component
const MobileView = ({ categories }: { categories: Category[] }) => (
  <Swiper
    modules={[Pagination, Navigation]}
    spaceBetween={20}
    slidesPerView={1}
    pagination={{ clickable: true }}
    className="mySwiper">
    {categories.map((category, index) => (
      <SwiperSlide
        key={index}
        className="pb-10 [&_.swiper-pagination-bullet]:bg-black">
        <div className="transform transition duration-300 hover:scale-105">
          <LocationCard
            title={category.name}
            href={`/user/region/${category.id}/1`}
            imageSrc={category.imageSrc}
            contentCount={category.contentCount}
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

// Desktop view component
const DesktopView = ({ categories }: { categories: Category[] }) => (
  <Swiper
    modules={[Pagination, Navigation]}
    spaceBetween={30}
    slidesPerView={1}
    navigation={true}
    pagination={{ clickable: true }}
    className="desktop-swiper">
    {Array(Math.ceil(categories.length / 4))
      .fill(0)
      .map((_, groupIndex) => (
        <SwiperSlide key={groupIndex} className="pb-12 px-20">
          <div className="grid grid-cols-2 gap-6">
            {categories
              .slice(groupIndex * 4, groupIndex * 4 + 4)
              .map((category, index) => (
                <div key={index} className="transform transition duration-300 ">
                  <LocationCard
                    title={category.name}
                    href={`/user/region/${category.id}/1`}
                    imageSrc={category.imageSrc}
                    contentCount={category.contentCount}
                  />
                </div>
              ))}
          </div>
        </SwiperSlide>
      ))}
  </Swiper>
);
