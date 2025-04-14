"use client";

import Link from "next/link";
import useStore from "@/store";
import Image from "next/image";
import { useEffect } from "react";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

const Navigation = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  useEffect(() => {
    setUser({
      id: session ? session.user.id : "",
      email: session ? session.user.email! : "",
      name: session && profile ? profile.name : "",
      introduce: session && profile ? profile.introduce : "",
      avatar_url: session && profile ? profile.avatar_url : "",
    });
  }, [session, setUser, profile]);

  return (
    <header className=" py-4">
      <div className="container max-w-5xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-extrabold text-blue-800 drop-shadow hover:text-yellow-600 transition">
            Disney Trip Planner
          </h1>
        </Link>

        <div className="text-sm font-bold">
          {session ? (
            <div className="flex items-center space-x-4">
              <Link href="/settings/profile">
                <div className="relative w-10 h-10 hover:scale-105 transition">
                  <Image
                    src={
                      profile && profile.avatar_url
                        ? profile.avatar_url
                        : "/default.png"
                    }
                    alt="avatar"
                    fill
                    className="rounded-full object-cover border-2 border-yellow-400"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition">
                  ログイン
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="bg-white border border-yellow-400 text-yellow-600 px-4 py-2 rounded-xl font-semibold hover:bg-yellow-100 transition">
                  サインアップ
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
