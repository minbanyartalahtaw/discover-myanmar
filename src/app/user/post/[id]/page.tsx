"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPost } from "./action";
import InvalidLink from "@/app/components/InvalidLink";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categoryId: number;
  regionId: number;
  image: string;
}

export default function Home() {
  const params = useParams();
  const { id } = params;
  const postId = Number(id);
  const [loading, setLoading] = useState(true);
  /*   const [loadMore, setLoadMore] = useState(false);
  const [groupId, setGroupId] = useState(1); */
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "****",
    content: `***************************************`,
    image: "/placeholder.png",
    createdAt: "****",
    regionId: 0,
    categoryId: 0,
  });

  //const [relatedPost , setRelatedPost ] =

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { status, data } = await getPost(postId);
      if (!status) {
        setPost({
          id: 0,
          title: "****",
          content: `***************************************`,
          image: "/placeholder.png",
          createdAt: "****",
          regionId: 0,
          categoryId: 0,
        });
        setLoading(false);
        return;
      }
      const finalData = {
        id: data?.id || 0,
        title: data?.title || "****",
        content: data?.content || `***************************************`,
        createdAt: data?.createdAt.toISOString(),
        categoryId: data?.categoryId || 0,
        regionId: data?.regionId || 0,
        image: data?.image || "/placeholder.png",
      };
      setPost(finalData as Post);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    fetch();
  }, [postId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex justify-center p-5">
        <div className="max-w-7xl flex flex-col items-center border-b-2 space-y-4 p-8">
          <div className="w-[700px] h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-3/4 h-8 bg-gray-200 animate-pulse rounded-md"></div>
          <div className="w-full space-y-3">
            <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-4/6 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );

  if (post.id === 0) return <InvalidLink />;

  return (
    <div className="p-5 w-screen">
      <div className="max-w-7xl flex flex-col items-center border-b-2 mx-auto">
        <div className="overflow-hidden rounded-sm shadow-lg ">
          <Image
            src={`${post.image}`}
            width={500}
            height={500}
            alt="wd"
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className=" md:flex md:items-center md:justify-start max-w-5xl">
          <h1 className="my-10 text-2xl md:text-4xl w-full">{post.title}</h1>
        </div>
        {/* Content with images interspersed */}
        <div className="prose prose-slate max-w-5xl min-h-[400px]">
          <ReactQuill
            value={post.content}
            readOnly={true}
            className="select-none"
            theme="snow"
            modules={{ toolbar: false }}
          />
        </div>

        <p className="my-8 text-sm font-light text-gray-400">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(post.createdAt))}
        </p>
        <div className="flex justify-end gap-4 my-4 w-full">
          <Button
            variant="outline"
            className="group relative"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              const button = document.getElementById("copyButton");
              if (button) {
                button.classList.add("animate-bounce");
                setTimeout(() => {
                  button.classList.remove("animate-bounce");
                }, 1000);
              }
            }}
            id="copyButton">
            <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white text-xs px-2 py-1 rounded transition-opacity duration-200">
              Copy Post Link
            </span>
            Share
          </Button>
        </div>
      </div>

      {/* Related Post */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mt-10 mb-4 text-center">
          Related Post
        </h1>
        {/*         <div className="flex flex-col justify-center max-w-6xl mx-auto px-4 py-8s">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-3 w-full">
            {relatedPosts.map((relatedPost, index) => (
              <div
                key={index}
                className={`transform transition duration-300 hover:shadow-md rounded-lg overflow-hidden h-full min-w-full`}>
                <PostCard
                  key={index}
                  title={relatedPost.title}
                  href={`/user/post/${relatedPost.id}`}
                  imageSrc={relatedPost.image}
                />
              </div>
            ))}
          </div>
          <Button
            disabled={groupId === 7}
            variant={"outline"}
            className={`
              mt-5
              w-60
              mx-auto
              ${loadMore ? "animate-fade animate-infinite" : ""}
            `.trim()}
            onClick={getMorePost}>
            {loadMore ? "Loading..." : "Load More"}
          </Button>
        </div> */}
      </div>

      {/* Read Post button */}
      <div className="flex justify-center my-12">
        <Button
          variant="outline"
          className="px-8 py-6 rounded-full border-2 border-primary shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="text-lg font-medium group-hover:text-primary">
            Read Post
          </span>
        </Button>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-md"
          onClick={scrollToTop}
          aria-label="Scroll to top">
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
