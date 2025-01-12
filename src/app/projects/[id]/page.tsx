import { notFound } from "next/navigation";
import { Project } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import Detail from "@/components/models/project/Detail";

type ParamsType = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: ParamsType) {
  // 表示するprojectのidを取得する
  const projectId = parseInt((await params).id as string, 10);

  // projectIdが数値でない場合は404エラーを返す
  if (isNaN(projectId)) {
    return notFound();
  }

  // projectIdに対応するprojectを取得する
  const project: Project | null = await prisma.project.findUnique({
    where: { id: projectId },
  });

  // projectが見つからない場合は404エラーを返す
  if (!project) {
    return notFound();
  }

  return <Detail project={project} />;
}
