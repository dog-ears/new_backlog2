import { prisma } from "@/lib/prisma";
import { Heading, Table, For } from "@chakra-ui/react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany();
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
                <Table.Cell>{project.name}</Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </main>
  );
}
