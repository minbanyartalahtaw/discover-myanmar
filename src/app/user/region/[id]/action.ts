"use server";

import prisma from "@/app/libs/prisma";

export async function getPost(regionId: number, groupId: number) {
  const data = await prisma.post.findMany({
    where: {
      regionId,
      isApprove: true,
    },
    select: {
      id: true,
      title: true,
      createdAt: false,
      image: true,
      regionId: true,
      categoryId: true,
    },
  });
  // Calculate start and end indices for pagination
  const startIndex = (groupId - 1) * 6;
  const endIndex = startIndex + 6;

  // Get paginated posts
  const paginatedData = data.slice(startIndex, endIndex);
  return { data: paginatedData };
}

export async function getLimit(regionId: number) {
  const data = await prisma.post.count({
    where: {
      regionId,
      isApprove: true,
    },
  });
  const limit = Math.ceil(data / 6);
  return { limit };
}
