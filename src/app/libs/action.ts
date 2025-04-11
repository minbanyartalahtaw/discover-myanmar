"use server"

import prisma from "./prisma";

export async function getRegion () {
   return await prisma.region.findMany();
}

export async function getCategories() {
   return await prisma.category.findMany({
      where: {
         isApprove: true
      }
   });
}