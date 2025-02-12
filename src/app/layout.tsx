import type { Metadata } from "next";
import { M_PLUS_2 } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// 和文フォント
const mPlus2 = M_PLUS_2({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={mPlus2.className}>
        <Provider>{children}</Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
