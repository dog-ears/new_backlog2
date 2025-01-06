import Link from "next/link";
import { Project } from "@prisma/client";
import { Heading, Table, For } from "@chakra-ui/react";

import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects: Project[] = await prisma.project.findMany();
  return (
    <main>
      <Heading as="h1" size="xl">
        プロジェクト一覧
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>プロジェクト名</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={projects}>
            {(project, index) => (
              <Table.Row key={index}>
                <Table.Cell>{project.id}</Table.Cell>
                <Table.Cell>
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </main>
  );
}
