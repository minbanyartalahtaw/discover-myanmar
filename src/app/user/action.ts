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
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/kachin_ztgisv.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/kayah_mwkpxq.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/kayin_s1272o.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/chin_ecjlmn.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/mon_ahw0fr.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060658/rakhine_klsfhu.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060658/shan_wr0poz.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060659/yangon_v1dg4u.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/mandalay_taqb4a.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060658/magway_lrgxv4.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060658/magway_lrgxv4.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/ayeyarwady_niflq1.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060657/bago_hxabog.jpg",
    "https://res.cloudinary.com/dgotgr9jk/image/upload/v1750060659/tanintharyi_kmyndi.jpg",
  ];

  return categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    contentCount: category.Post.length,
    imageSrc: imageSrcMap[index],
  }));
}
