"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPostForAdmin(groupId: number) {
  const posts = await prisma.post.findMany({
    where: {
      isApprove: false,
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
      isApprove: false,
    },
  });
  const totalPages = Math.ceil(totalPosts / 30);
  return { posts: posts, totalPages: totalPages };
}

export async function allowPost(postId: number) {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      isApprove: true,
    },
  });
  return true;
}
