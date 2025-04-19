"use server";

import prisma from "@/app/libs/prisma";

export async function getPost(id: number) {
  const data = await prisma.post.findUnique({
    where: {
      id,
      isApprove: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      isApprove: false,
      createdAt: true,
      categoryId: true,
      regionId: true,
      image: true,
    },
  });
  if (!data) {
    return { status: false, data: null };
  }
  return { status: true, data };
}

export async function getRelatedPostPosts(formData: FormData) {
  // groupId is for group post
  const groupIdStr = formData.get("groupId");
  const categoryIdStr = formData.get("categoryId");
  const regionIdStr = formData.get("regionId");

  const regionId = Number(regionIdStr);
  const categoryId = Number(categoryIdStr);
  const groupId = Number(groupIdStr);
  const data = await prisma.post.findMany({
    where: {
      regionId,
      categoryId,
      //      isApprove: true,
    },
    /*     select: {
      id: true,
      title: true,
      image: true,
    }, */
  });

  // TODO :: group and related post logic come in here
  console.log(data);
  console.log(data.length);

  console.log(groupId, categoryId, regionId);
  setTimeout(() => {
    console.log("getRelatedPostPosts");
  }, 3000);
}
