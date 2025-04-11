"use server";
import prisma from "../../libs/prisma";

export async function createCategory(name: string) {
  const isExit = await prisma.category.findFirst({
    where: {
      name,
    },
  });
  if (isExit) {
    return false;
  }
  await prisma.category.create({
    data: {
      name,
    },
  });
  return true;
}

export async function getCategoriesForAdmin() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function unapproveCategory(id: number) {
  await prisma.category.update({
    where: {
      id,
    },
    data: {
      isApprove: false,
    },
  });
}

export async function approveCategory(id: number) {
  await prisma.category.update({
    where: {
      id,
    },
    data: {
      isApprove: true,
    },
  });
}
