import Link from "next/link";
import { User } from "@prisma/client";
import { Heading, Table, For } from "@chakra-ui/react";

import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users: User[] = await prisma.user.findMany();
  return (
    <main>
      <Heading as="h1" size="xl">
        ユーザー一覧
      </Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>ユーザー名</Table.ColumnHeader>
            <Table.ColumnHeader>メールアドレス</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={users}>
            {(user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>
                  <Link href={`/users/${user.id}`}>{user.name}</Link>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </main>
  );
}
