"use client"



import { Button } from "@/components/ui/button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import dynamic from "next/dynamic";

import Image from "next/image";

import { ChevronDown } from 'lucide-react';

import { useEffect, useState } from "react";

import Link from "next/link";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useParams } from "next/navigation";
import { getPostForAdmin, notAllowPost } from "./action";
import { BackButton } from "@/app/components/BackButton";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });



/*

id Int @id @default(autoincrement())

title String

image String

content String

createdAt DateTime @default(now())

isApprove Boolean @default(false)

regionId Int

categoryId Int

*/



interface Post {
  id: number
  title: string
  image: string
  content: string
  createdAt: Date
  isApprove: boolean
  region: {
    name: string
  }
  category: {
    name: string
  }
}





export default function UnapproveTable() {
  const param = useParams();

  const groupId = Number(param?.groupId);


  const [table, setTable] = useState<{
    showDate: boolean
    showRegion: boolean
    showCategory: boolean
    showImage: boolean
  }>({
    showDate: false,
    showRegion: true,
    showCategory: true,
    showImage: true,
  })

  const [allPost, setAllPost] = useState<Post[]>([])
  const [totalPages, setTotalPages] = useState(10)

  const fetchData = async () => {
    console.log("Getcing")
    const { posts, totalPages } = await getPostForAdmin(groupId)
    setAllPost(posts)
    setTotalPages(totalPages)
  }
  useEffect(() => {
    fetchData()
  })
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <BackButton className="bg-[#333]" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight mb-6 text-gray-900">Manage Post</h3>
      <div className="relative">
        <Link href={'/admin/manage-posts/unapprove/1'}>
          <Button variant={"outline"}>Unapprove</Button>
        </Link>
        <Button variant={"default"} className="mx-2" >Approve</Button>

        <DropdownMenu>

          <DropdownMenuTrigger asChild className="absolute right-0">

            <Button variant="outline" className="gap-2">

              Show

              <ChevronDown className="h-4 w-4" />

            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64">

            {[

              { key: 'showDate', label: 'နေ့စွဲ' },

              { key: 'showRegion', label: 'တိုင်းနှင့်ပြည်နယ်' },

              { key: 'showCategory', label: 'အမျိုးအစား' },

              { key: 'showImage', label: 'ဓာတ်ပုံ' }

            ].map(({ key, label }) => (

              <DropdownMenuItem

                key={key}

                className="flex items-center gap-2"

                onClick={() => setTable(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}

              >

                <input

                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-black"

                  type="checkbox"

                  checked={table[key as keyof typeof table]}

                  readOnly

                />

                {label}

              </DropdownMenuItem>

            ))}

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

      <Table className="mt-5">

        <TableHeader className="bg-muted/50">

          <TableRow>



            <TableHead className="w-[50px] md:w-[100px] py-2 md:py-4 font-semibold">No.</TableHead>




            <TableHead className="py-2 md:py-4 font-semibold min-w-[120px]">ခေါင်းစဥ်</TableHead>



            {table.showDate && (

              <TableHead className="py-2 md:py-4 font-semibold min-w-[100px]">နေ့စွဲ</TableHead>

            )}

            {table.showRegion && (

              <TableHead className="py-2 md:py-4 font-semibold min-w-[100px]">တိုင်းနှင့်ပြည်နယ်</TableHead>

            )}

            {table.showCategory && (

              <TableHead className="py-2 md:py-4 font-semibold min-w-[100px]">အမျိုးအစား</TableHead>

            )}



            {table.showImage && (

              <TableHead className="py-2 md:py-4 font-semibold min-w-[100px]">ဓာတ်ပုံ</TableHead>

            )}

            <TableHead className="text-right py-2 md:py-4 font-semibold w-[100px]"></TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {allPost.map((post, index) => (

            <TableRow key={index}>



              <TableCell className="font-medium py-2 md:py-4">{post.id}</TableCell>


              <TableCell className="py-2 md:py-4">{post.title}</TableCell>



              {table.showDate && (

                <TableCell className="py-2 md:py-4 text-sm md:text-base">

                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}

                </TableCell>

              )}

              {table.showRegion && (

                <TableCell className="py-2 md:py-4">{post.region.name}</TableCell>

              )}

              {table.showCategory && (

                <TableCell className="py-2 md:py-4">{post.category.name}</TableCell>

              )}



              {table.showImage && (

                <TableCell className="py-2 md:py-4 overflow-hidden">

                  <Link href={post.image} target="_blank" rel="noopener noreferrer">

                    <Image

                      src={post.image}

                      width={50}

                      height={50}

                      alt="wd"

                      className="rounded-sm"

                    />

                  </Link>

                </TableCell>

              )}

              <TableCell className="text-right py-2 md:py-4">

                <SheetPage post={post} />

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={groupId > 1 ? `/admin/manage-posts/approve/${groupId - 1}` : '#'}
              className={groupId <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {totalPages <= 5 ? (
            // If total pages is 5 or less, show all page numbers
            [...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`/admin/manage-posts/approve/${index + 1}`}
                  isActive={index + 1 === groupId}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            // If total pages is more than 5
            <>
              {/* First page */}
              <PaginationItem>
                <PaginationLink
                  href="/admin/manage-posts/approve/1"
                  isActive={groupId === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Show ellipsis if current page is far from start */}
              {groupId > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

              {/* Middle pages */}
              {(() => {
                let middlePages: number[] = [];
                if (groupId <= 3) {
                  middlePages = [2, 3];
                } else if (groupId >= totalPages - 2) {
                  middlePages = [totalPages - 2, totalPages - 1];
                } else {
                  middlePages = [groupId - 1, groupId, groupId + 1];
                }

                return middlePages.map(pageNum => (
                  pageNum > 1 && pageNum < totalPages && (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`/admin/manage-posts/approve/${pageNum}`}
                        isActive={pageNum === groupId}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                ));
              })()}

              {/* Show ellipsis if current page is far from end */}
              {groupId < totalPages - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

              {/* Last page */}
              <PaginationItem>
                <PaginationLink
                  href={`/admin/manage-posts/unapprove/${totalPages}`}
                  isActive={groupId === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href={groupId < totalPages ? `/admin/manage-posts/unapprove/${groupId + 1}` : '#'}
              className={groupId >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>

  )

}

const SheetPage = ({ post }: { post: Post }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Details</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll minw-w-[80vw]">
        <SheetHeader>
          <SheetTitle>Post အသေးစိတ်</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <div className="max-w-7xl flex flex-col items-center mx-auto">

            <div className="overflow-hidden rounded-sm shadow-lg ">

              <Image

                src={post.image}

                width={400}

                height={400}

                alt="wd"

                className="hover:scale-110 transition-transform duration-300"

              />

            </div>

            <div className=" md:flex md:items-center md:justify-start max-w-5xl">

              <h1 className="my-10 text-2xl md:text-4xl w-full">{post.title}</h1>

            </div>

            {/* Content with images interspersed */}
            <div className="prose prose-slate max-w-5xl min-h-[100px]">

              <ReactQuill

                value={post.content}

                readOnly={true}

                className="select-none"

                theme="snow"

                modules={{ toolbar: false }}

              />

            </div>

            <p className="my-8 text-sm font-light text-gray-400">

              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}

            </p>
            <div className="flex justify-end gap-4 my-4 w-full">
              <Button
                variant="default"
                onClick={async () => {
                  await notAllowPost(post.id)
                }}
              >
                Not Allow Post
              </Button>
            </div>
          </div>
        </div>

      </SheetContent>
    </Sheet>



  )
}
