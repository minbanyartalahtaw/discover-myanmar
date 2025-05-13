"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function getPostForAdmin(groupId: number) {
  console.log(groupId);
  const posts = await prisma.post.findMany({
    where: {
      isApprove: true,
    },
    select: {
      id: true,
      title: true,
      image: true,
      content: true,
      createdAt: true,
      isApprove: true,
      region: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    skip: (groupId - 1) * 30,
    take: 30,
    orderBy: {
      createdAt: "desc", // Assuming you want the most recent posts
    },
  });
  /**

  id: number
  title: string
  image: string
  content: string
  createdAt: string
  isApprove: boolean
  regionId: string
  categoryId: string

   */

  const totalPosts = await prisma.post.count({
    where: {
      isApprove: true,
    },
  });
  const totalPages = Math.ceil(totalPosts / 30);
  console.log(posts);
  console.log(totalPosts);
  return { posts: posts, totalPages: totalPages };
}

export async function notAllowPost(postId: number) {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      isApprove: false,
    },
  });
  return true;
}
