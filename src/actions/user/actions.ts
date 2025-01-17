"use server";

import { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// User型からid, createdAt, updatedAtを除外した型を定義
type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;

export async function create(data: CreateUserInput) {
  try {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
