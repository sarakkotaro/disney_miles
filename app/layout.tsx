// app/layout.tsx
import Navigation from "@/components/navigation";
import SupabaseListener from "@/components/supabase-listener";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers"; // 👈 追加
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profile = null;
  if (session) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    profile = data;
  }

  return (
    <html
      lang="jp"
      className="bg-gradient-to-b from-blue-100 to-yellow-50 bg-no-repeat bg-fixed"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* ナビゲーション */}
        <Providers initialSession={session}>
          {/* 👈 session を渡す！ */}
          <Navigation session={session} profile={profile} />
          <SupabaseListener />
          {children}
        </Providers>
      </body>
    </html>
  );
}
