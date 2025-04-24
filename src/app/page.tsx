"use client";

//jimport { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import Link from "next/link";

export default function LandingPage() {
  /*   const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },

    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },

    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },

    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
    },
  ]; */
  /*   const images = [
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
  ]; */

  const words2 = `This Component Will be redesign before publish to public. You can start reading and writing post by clicking "Start Reading" button.`;
  return (
    <div>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Link
          href={"/user"}
          className="px-8 py-3 bg-white text-black font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 flex items-center justify-center">
          Start Reading
        </Link>
      </div>
      {/* <ThreeDMarquee images={images} /> */}
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-2">
        <div className="max-w-5xl">
          <TextGenerateEffect words={words2} />;
        </div>
      </div>
    </div>
  );
}
