import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import * as userActions from "@/actions/user/actions";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn(params) {
      // 名前、メールアドレスが取得できなかった場合はログイン不可
      if (!params.user.name || !params.user.email) {
        return false;
      }

      // ログイン成功時に実行したい処理をここに記述
      console.log("User signed in:", params.user);
      try {
        // ユーザーが存在するか確認
        const user = await prisma.user.findUnique({
          where: { email: params.user.email },
        });

        // ユーザーが存在する場合はログイン成功
        if (user) {
          return true;
        }
        // ユーザーが存在しない場合は新規作成
        await userActions.create({
          name: params.user.name,
          email: params.user.email,
        });

        // ユーザー作成成功時にログイン成功
        return true;
      } catch (error) {
        console.error("Failed to create user:", error);
        return false;
      }
    },
  },
});
