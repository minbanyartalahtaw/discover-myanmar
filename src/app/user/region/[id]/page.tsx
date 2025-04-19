"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import InvalidLink from "@/app/components/InvalidLink";
import { PostCard } from "@/app/components/PostCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLimit, getPost } from "./action";
import Link from "next/link";

import { Pencil } from "lucide-react";
import Loading from "@/app/components/Loading";

interface Post {
  id: number;
  title: string;
  image: string;
  regionId: number;
  categoryId: number;
}

export default function Home() {
  const params = useParams();

  const { id } = params;
  const regionId = Number(id);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentGroupId, setCurrentGroupId] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [limit, setLimit] = useState<number>(1);

  /*   const sampleData = [

      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
      {
        id: 1,
        title: "ဗိုလ်ချုပ်အောင်ဆန်း",
        createdAt: "2025-04-12 06:28:21.666",
        isApprove: true,
        regionId: 10,
        categoryId: 1,
        image:
          "https://res.cloudinary.com/dgotgr9jk/image/upload/v1744439301/rz6nvlmuvitgrvw1kvd4.jpg",
      },
  
    ]; */

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts and limit in parallel to reduce server calls
        const [postResponse, limitResponse] = await Promise.all([
          getPost(regionId, currentGroupId),
          getLimit(regionId),
        ]);
        setPosts(postResponse.data);
        setLimit(limitResponse.limit);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [regionId, currentGroupId]); // Add dependencies to prevent unnecessary re-renders

  const getPreviousPost = async () => {
    if (currentGroupId <= 1) return;
    setLoading(true);
    try {
      const response = await getPost(regionId, currentGroupId - 1);
      setPosts(response.data);
      setCurrentGroupId(currentGroupId - 1);
    } catch (error) {
      console.error("Error fetching previous posts:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const getNextPost = async () => {
    if (currentGroupId >= limit) return;
    setLoading(true);
    try {
      const response = await getPost(regionId, currentGroupId + 1);
      setPosts(response.data);
      setCurrentGroupId(currentGroupId + 1);
    } catch (error) {
      console.error("Error fetching next posts:", error);
    } finally {
    }
  };

  if (isNaN(regionId) || regionId < 1 || regionId > 14) return <InvalidLink />;

  // Generate pagination numbers
  const renderPaginationItems = () => {
    const items = [];

    // Always show current page
    const showFirst = currentGroupId > 2;
    const showLast = limit > 0 && currentGroupId < limit - 1;

    if (showFirst) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => setCurrentGroupId(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentGroupId > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    // Previous page if not first page
    if (currentGroupId > 1) {
      items.push(
        <PaginationItem key="prev-page">
          <PaginationLink>{currentGroupId - 1}</PaginationLink>
        </PaginationItem>
      );
    }

    // Current page
    items.push(
      <PaginationItem key="current">
        <PaginationLink className="border-2 border-primary">
          {currentGroupId}
        </PaginationLink>
      </PaginationItem>
    );

    // Next page if not last page
    if (currentGroupId < limit) {
      items.push(
        <PaginationItem key="next-page">
          <PaginationLink>{currentGroupId + 1}</PaginationLink>
        </PaginationItem>
      );
    }

    if (showLast) {
      if (currentGroupId < limit - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => setCurrentGroupId(limit)}>
            {limit}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };
  const region = [
    "ကချင်ပြည်နယ်",
    "ကယားပြည်နယ်",
    "ကရင်ပြည်နယ်",
    "ချင်းပြည်နယ်",
    "မွန်ပြည်နယ်",
    "ရခိုင်ပြည်နယ်",
    "ရှမ်းပြည်နယ်",
    "ရန်ကုန်တိုင်းဒေသကြီး",
    "မန္တလေးတိုင်းဒေသကြီး",
    "မကွေးတိုင်းဒေသကြီး",
    "စစ်ကိုင်းတိုင်းဒေသကြီး",
    "ဧရာဝတီတိုင်းဒေသကြီး",
    "ပဲခူးတိုင်းဒေသကြီး",
    "တနင်္သာရီတိုင်းဒေသကြီး",
  ];
  if (loading) return <Loading />;
  return (
    <div className="mx-auto px-4 py-8 max-w-7xl animate-fade-in animate-move-down h-screen">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          {region[regionId - 1]}
        </h1>
      </header>

      {posts.length === 0 ? (
        <div className="flex flex-col justify-between items-center min-h-[200px] mt-50">
          <div className="text-center py-12 border-2 border-red-500 rounded-lg mx-4 w-full max-w-md">
            <p className="text-red-500 font-medium">
              No posts available for this region yet.
            </p>
          </div>
          <Link href={"/user/write-post"} className="underline mt-4">
            Write Post
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-center max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
              {posts.map((post, index) => (
                <div
                  key={`post-${index}`}
                  className={`transform transition duration-300 hover:shadow-md rounded-lg overflow-hidden h-full`}>
                  <PostCard
                    title={post.title}
                    href={`/user/post/${post.id}`}
                    imageSrc={post.image}
                  />
                </div>
              ))}

              {/* Add skeleton placeholders if fewer than 6 posts */}
              {posts.length > 0 &&
                posts.length < 6 &&
                Array.from({ length: 6 - posts.length }).map((_, index) => (
                  <Link
                    href={"/user/write-post"}
                    key={`skeleton-${index}`}
                    className="transform transition rounded-lg overflow-hidden h-full bg-gray-200">
                    <div className="aspect-video bg-gray-300 flex items-center justify-center">
                      <Pencil color="gray" size={50} />
                    </div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="flex justify-center mt-4">
                        <span className="text-gray-400">Write Post</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          <div className="my-10 ">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={getPreviousPost}
                    className={`cursor-pointer ${
                      currentGroupId <= 1
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    onClick={getNextPost}
                    className={`cursor-pointer ${
                      currentGroupId >= limit
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
}
