"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";

const ListCreateButton = () => {
  const supabase = useSupabaseClient<Database>(); // 👈 ここ変更！
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser(); // 👈 これでOK！
      if (data?.user) {
        setUser(data.user);
      }
      setLoading(false);
    };
    getUser();
  }, [supabase]);

  const handleClick = () => {
    if (user) {
      router.push("/mylist");
    } else {
      router.push("/auth/login");
    }
  };

  if (loading) return null;

  return (
    <div className="mt-10 text-center">
      <button
        type="button"
        onClick={handleClick}
        className="bg-sky-500 text-white font-bold py-2 px-6 rounded-full hover:brightness-110"
      >
        リスト作成
      </button>
    </div>
  );
};

export default ListCreateButton;
