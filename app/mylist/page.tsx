"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plane, Hotel, Castle } from "lucide-react"; // アイコン追加

export default function MyListPage() {
  const session = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("mylist")
        .select("*")
        .eq("user_id", session.user?.id);

      if (error || !data) {
        console.error("取得エラー", error);
        return;
      }

      const formatted = (data ?? []).map((plan: any) => ({
        ...plan,
        hotel_price: Number(plan.hotel_price),
        flight_info: plan.flight_info ?? "未入力",
        hotel_info: plan.hotel_info ?? "未入力",
        park_name: getParkName(plan.park_id),
      }));

      setPlans(formatted);
    };

    fetchPlans();
  }, [session]);

  const getParkName = (parkId: string) => {
    switch (parkId) {
      case "LAX":
        return "Disneyland California";
      case "NRT":
        return "Tokyo Disneyland";
      case "CDG":
        return "Disneyland Paris";
      default:
        return parkId;
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("mylist").delete().eq("id", id);
    if (!error) {
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-yellow-50 p-6">
      <h1 className="text-2xl font-extrabold text-center text-blue-900 mb-6">
        あなたのマイリスト ✨
      </h1>
      <button
        onClick={() => router.push("/mylist/new")}
        className="mb-6 px-6 py-2 rounded-full text-white bg-gradient-to-r from-pink-400 to-red-400 shadow hover:opacity-90"
      >
        ✨ 新規作成
      </button>

      {plans.length === 0 ? (
        <p className="text-gray-600">プランがまだありません。</p>
      ) : (
        <ul className="space-y-6">
          {plans.map((plan) => (
            <li className="bg-white/80 border border-yellow-200 rounded-2xl shadow-md p-4 space-y-2">
              <p className="text-lg font-semibold text-blue-800">
                🏰 パーク名: {plan.park_name}
              </p>

              <p className="text-sm text-gray-700">
                ✈️ フライト:{" "}
                <span className="font-medium">
                  {plan.flight_operated_by || plan.airline || "未入力"}
                </span>
                {plan.miles ? ` / ${plan.miles.toLocaleString()}マイル` : ""}
              </p>

              <p className="text-sm text-gray-700">
                🏨 ホテル:{" "}
                <span className="font-medium">{plan.hotel || "未入力"}</span>
                {plan.hotel_price
                  ? ` - ¥${plan.hotel_price.toLocaleString()}`
                  : ""}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="mt-2 px-3 py-1 bg-red-400 hover:bg-red-500 text-white text-sm rounded-md shadow"
                >
                  🗑️ 削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
