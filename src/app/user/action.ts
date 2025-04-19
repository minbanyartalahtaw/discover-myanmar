"use server";

import prisma from "../libs/prisma";

export async function getRegionAndContentCount() {
  const unSortedCategories = await prisma.region.findMany({
    include: {
      Post: {
        where: {
          isApprove: true,
        },
        select: {
          id: true,
        },
      },
    },
  });
  // sort by id
  const categories = unSortedCategories.sort((a, b) => a.id - b.id);
  const imageSrcMap = [
    "/kachin.jpg",
    "/kayah.jpg",
    "/kayin.jpg",
    "/chin.jpg",
    "/mon.jpg",
    "/rakhine.jpeg",
    "/shan.jpg",
    "/yangon.jpg",
    "/mandalay.jpg",
    "/magway.jpg",
    "/sagaing.jpg",
    "/ayeyarwady.jpg",
    "/bago.jpg",
    "/tanintharyi.jpg",
  ];

  return categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    contentCount: category.Post.length,
    imageSrc: imageSrcMap[index],
  }));
}
