"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPost(regionid: number, groupId: number) {
  const posts = await prisma.post.findMany({
    where: {
      regionId: regionid,
      isApprove: true,
    },
    select: {
      id: true,
      title: true,
      image: true,
    },
    skip: (groupId - 1) * 18,
    take: 18,
    orderBy: {
      createdAt: "desc", // Assuming you want the most recent posts
    },
  });

  const totalPosts = await prisma.post.count({
    where: {
      regionId: regionid,
      isApprove: true,
    },
  });

  const region = await prisma.region.findUnique({
    where: {
      id: regionid,
    },
    select: {
      name: true,
    },
  });
  const totalPages = Math.ceil(totalPosts / 18);
  return { posts: posts, totalPages: totalPages, region: region };
}
