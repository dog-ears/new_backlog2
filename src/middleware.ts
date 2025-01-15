import { auth } from "@/lib/auth/auth";

// 認証が必要なページに、非ログイン状態でアクセスした場合は、トップページにリダイレクトさせる
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// 認証を必要とするurlの定義
export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*"],
};
