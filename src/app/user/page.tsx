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
import TopBar from "../components/TopBar";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Check if the screen is mobile size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const categories = [
        { name: "ကချင်ပြည်နယ်", href: "/x", imageSrc: "/kachin.jpg" },
        { name: "ကယားပြည်နယ်", href: "/kayar", imageSrc: "/kayah.jpg" },
        { name: "ကရင်ပြည်နယ်", href: "/kayin", imageSrc: "/kayin.jpg" },
        { name: "ချင်းပြည်နယ်", href: "/chin", imageSrc: "/chin.jpg" },
        { name: "မွန်ပြည်နယ်", href: "/mon", imageSrc: "/mon.jpg" },
        { name: "ရခိုင်ပြည်နယ်", href: "/rakhine", imageSrc: "/rakhine.jpeg" },
        { name: "ရှမ်းပြည်နယ်", href: "/shan", imageSrc: "/shan.jpg" },
        { name: "ရန်ကုန်တိုင်းဒေသကြီး", href: "/yangon", imageSrc: "/yangon.jpg" },
        {
            name: "မန္တလေးတိုင်းဒေသကြီး",
            href: "/mandalay",
            imageSrc: "/mandalay.jpg",
        },
        { name: "မကွေးတိုင်းဒေသကြီး", href: "/magway", imageSrc: "/magway.jpg" },
        {
            name: "စစ်ကိုင်းတိုင်းဒေသကြီး",
            href: "/sagaing",
            imageSrc: "/sagaing.jpg",
        },
        {
            name: "ဧရာဝတီတိုင်းဒေသကြီး",
            href: "/ayeyarwady",
            imageSrc: "/ayeyarwady.jpg",
        },
        { name: "ပဲခူးတိုင်းဒေသကြီး", href: "/bago", imageSrc: "/bago.jpg" },
        {
            name: "တနင်္သာရီတိုင်းဒေသကြီး",
            href: "/tanintharyi",
            imageSrc: "/tanintharyi.jpg",
        },
    ];
    console.log("categorie", categories[0]);
    if (loading) return <Loading skeletonStyle="home" />;
    return (
        <div>
            <div className="h-16"></div>
            <div>
                <h1 className="my-10 text-center text-3xl md:text-5xl font-bold text-gray-800">
                    မင်္ဂလာပါ
                </h1>
                <p
                    className="my-6 text-center text-sm md:text-xl text-gray-600
        animate-fade-in-up transition-all duration-500 hover:text-gray-800
        leading-relaxed tracking-wide">
                    မြန်မာနိုင်ငံ၏ သမိုင်းနှင့်ယဉ်ကျေးမှုး၊ အထင်ကရနေရာများ၊
                    ဒေသဆိုင်ရာအကြောင်းအရာများ ကိုလေ့လာဖတ်ရှုနိုင်ပါသည်။
                </p>
            </div>
            <div className="max-w-7xl mx-auto m-12">
                {isMobile ? (
                    <div className="px-4 sm:px-10">
                        <Swiper
                            modules={[Pagination, Navigation]}
                            spaceBetween={20}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            className="mySwiper ">
                            {categories.map((category, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="pb-10 [&_.swiper-pagination-bullet]:bg-black">
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
                    <div className="px-4 sm:px-10">
                        <Swiper
                            modules={[Pagination, Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ clickable: true }}
                            className="desktop-swiper">
                            {/* Group categories into sets of 4 for a 2x2 grid */}
                            {Array(Math.ceil(categories.length / 4))
                                .fill(0)
                                .map((_, groupIndex) => (
                                    <SwiperSlide key={groupIndex} className="pb-12 px-20">
                                        <div className="grid grid-cols-2 gap-6">
                                            {categories
                                                .slice(groupIndex * 4, groupIndex * 4 + 4)
                                                .map((category, index) => (
                                                    <div
                                                        key={index}
                                                        className="transform transition duration-300 hover:scale-105">
                                                        <LocationCard
                                                            title={category.name}
                                                            href={category.href}
                                                            imageSrc={category.imageSrc}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
}
