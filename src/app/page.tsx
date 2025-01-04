import { Center, VStack, Heading } from "@chakra-ui/react";

import { auth, signIn, signOut } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  // ログイン関数
  const handleSignIn = async () => {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  };

  // ログアウト関数
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <main>
      <Center h="100vh">
        <VStack gap={4}>
          <Heading size="3xl">NEW BACKLOG</Heading>
          {session?.user ? (
            <>
              <div>ようこそ。{session.user.name} さん</div>
              <Button variant="outline" onClick={handleSignOut}>
                ログアウト
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleSignIn}>
              ログイン
            </Button>
          )}
        </VStack>
      </Center>
    </main>
  );
}
