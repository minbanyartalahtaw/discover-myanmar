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
  // Extract and validate form data
  const formValues = {
    regionId: Number(formData.get("regionId")),
    categoryId: Number(formData.get("categoryId")),
    groupId: Number(formData.get("groupId")),
  };

  // Validate numbers
  if (Object.values(formValues).some(isNaN)) {
    throw new Error("Invalid input parameters");
  }

  const POST_LIMIT = 6;

  // Fetch all posts in three separate queries for proper sorting
  const [
    sameCategoryAndRegion,
    sameCategoryDifferentRegion,
    sameRegionDifferentCategory,
    differentCategoryAndRegion,
  ] = await Promise.all([
    // 1. Posts with same category and region
    prisma.post.findMany({
      where: {
        regionId: formValues.regionId,
        categoryId: formValues.categoryId,
        isApprove: true,
      },
      select: {
        id: true,
        title: true,
        image: true,
      },
    }),

    // 2. Posts with same category but different region
    prisma.post.findMany({
      where: {
        categoryId: formValues.categoryId,
        regionId: { not: formValues.regionId },
        isApprove: true,
      },
      select: {
        id: true,
        title: true,
        image: true,
      },
    }),
    // 3. Posts with same Region and different category
    prisma.post.findMany({
      where: {
        regionId: formValues.categoryId,
        categoryId: { not: formValues.categoryId },
        isApprove: true,
      },
      select: {
        id: true,
        title: true,
        image: true,
      },
    }),

    // 4. Posts with different category and region
    prisma.post.findMany({
      where: {
        AND: [
          { categoryId: { not: formValues.categoryId } },
          { regionId: { not: formValues.regionId } },
          { isApprove: true },
        ],
      },
      select: {
        id: true,
        title: true,
        image: true,
      },
    }),
  ]);

  // Combine all posts in the desired order
  const allPosts = [
    ...sameCategoryAndRegion,
    ...sameCategoryDifferentRegion,
    ...sameRegionDifferentCategory,
    ...differentCategoryAndRegion,
  ];

  // Calculate pagination indexes
  const startIndex = (formValues.groupId - 1) * POST_LIMIT;
  const endIndex = startIndex + POST_LIMIT;

  // Get the posts for the requested group

  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    hasMore: allPosts.length > endIndex,
    total: allPosts.length,
  };
}
