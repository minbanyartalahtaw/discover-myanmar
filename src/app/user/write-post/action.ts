"use server";
import prisma from "../../libs/prisma";
interface Post {
  title: string;
  image: string;
  content: string;
  region: string;
  category: string;
}

export async function createPost(prop: Post) {
  const { title, image, content, region, category } = prop;
  const regionId = await prisma.region.findFirst({
    where: {
      name: region,
    },
  });
  const categoryId = await prisma.category.findFirst({
    where: {
      name: category,
    },
  });
  console.log(title, image, content, region, category);
  if (!regionId || !categoryId) return;
  await prisma.post.create({
    data: {
      title,
      image,
      content,
      regionId: regionId.id,
      categoryId: categoryId.id,
    },
  });
  return;
}
