"use client";

import { useState } from "react";
import { Project } from "@prisma/client";
import * as projectActions from "@/actions/project/actions"; // インポート
import { Heading, Text, Input, Button } from "@chakra-ui/react";

export default function Detail({ project }: { project: Project }) {
  const [projectEdited, setProjectEdited] = useState(project);

  // 保存時の処理
  const handleSave = async () => {
    try {
      await projectActions.update(projectEdited);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  // キャンセル時の処理
  const handleCancel = () => {
    setProjectEdited(project);
  };

  // 変更があるかどうか確認する関数
  function hasChanges(propertyName?: keyof Project): boolean {
    if (propertyName) {
      // プロパティが指定されているとき
      return project[propertyName] !== projectEdited[propertyName];
    } else {
      // プロパティが指定されていないとき
      return Object.keys(project).some((key) => {
        const propKey = key as keyof Project;
        return project[propKey] !== projectEdited[propKey];
      });
    }
  }

  return (
    <main>
      <Heading as="h1" size="xl">
        <form>
          {hasChanges() && (
            <div>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                キャンセル
              </Button>
              <Button size="sm" variant="outline" onClick={handleSave}>
                修正
              </Button>
            </div>
          )}
          <Input name="id" type="hidden" defaultValue={project.id} />
          <Input
            placeholder="プロジェクト名"
            type="text"
            value={projectEdited.name}
            variant="flushed"
            onChange={(e) => {
              setProjectEdited({ ...projectEdited, name: e.target.value });
            }}
          />
        </form>
      </Heading>
      <Text>ID: {project.id}</Text>
    </main>
  );
}
