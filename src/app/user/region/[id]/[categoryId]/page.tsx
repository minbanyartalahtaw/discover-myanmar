"use client"

import { PostCard } from "@/app/components/PostCard";
import { useParams } from "next/navigation";
import { getPost } from "./action";
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Loading from "@/app/components/Loading";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  title: string;
  image: string;
}

export default function Page() {
  const params = useParams();
  const regionId = Number(params.id);
  const groupId = Number(params.categoryId);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(0);


  const fetchData = async () => {
    const { posts, totalPages, region } = await getPost(regionId, groupId);
    setPosts(posts);
    setTotalPages(totalPages);
    setRegion(region?.name || "");
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) return <Loading skeletonStyle="region" />
  if (posts.length === 0) return <NoPost />;
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-center pb-8 mb-5 text-3xl border-b">{region}</h1>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              imageSrc={post.image}
              href={`/user/post/${post.id}`}
            />
          ))}
        </div>
      </div>

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={groupId > 1 ? `/user/region/${regionId}/${groupId - 1}` : '#'}
              className={groupId <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {totalPages <= 5 ? (
            // If total pages is 5 or less, show all page numbers
            [...Array(totalPages)].map((_, pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/user/region/${regionId}/${pageNumber + 1}`}
                  isActive={pageNumber + 1 === groupId}
                >
                  {pageNumber + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            // If total pages is more than 5
            <>
              {/* First page always shown */}
              <PaginationItem>
                <PaginationLink
                  href={`/user/region/${regionId}/1`}
                  isActive={1 === groupId}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Show ellipsis if not in first 3 pages */}
              {groupId > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Dynamic middle pages */}
              {groupId <= 3 ? (
                // Show 2,3 if near start
                [2, 3].map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/user/region/${regionId}/${pageNumber}`}
                      isActive={pageNumber === groupId}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))
              ) : groupId >= totalPages - 2 ? (
                // Show sequence before last page
                [totalPages - 3, totalPages - 2, totalPages - 1].filter(num => num > 1 && num < totalPages).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/user/region/${regionId}/${pageNumber}`}
                      isActive={pageNumber === groupId}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))
              ) : (
                // Show current page and surrounding pages
                [groupId - 1, groupId, groupId + 1].map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/user/region/${regionId}/${pageNumber}`}
                      isActive={pageNumber === groupId}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))
              )}

              {/* Show ellipsis if not in last 3 pages */}
              {groupId < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Last page always shown */}
              <PaginationItem>
                <PaginationLink
                  href={`/user/region/${regionId}/${totalPages}`}
                  isActive={totalPages === groupId}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href={groupId < totalPages ? `/user/region/${regionId}/${groupId + 1}` : '#'}
              className={groupId >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

const NoPost = () => {
  return (
    <div className="max-w-7xl min-h-[80vh] flex flex-col items-center justify-center gap-6 p-4  mx-auto">
      <p className="text-gray-600 text-center">You can start writing posts about this region</p>
      <Button
        variant={"outline"}
        onClick={() => window.location.href = '/user/write-post/'}

      >
        Create Post
      </Button>
    </div>
  )
}
