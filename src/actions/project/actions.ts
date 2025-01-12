"use server";

import { Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function update(project: Project) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: project,
    });
    return updatedProject;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}
