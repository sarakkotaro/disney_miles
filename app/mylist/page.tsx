"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

      // 型アサーションで補完
      const formatted = (data ?? []).map((plan: any) => ({
        ...plan,
        hotel_price: Number(plan.hotel_price),
        flight_info: plan.flight_info ?? "未入力", // 空文字に補完
        hotel_info: plan.hotel_info ?? "未入力", // 空文字に補完
        park_name: getParkName(plan.park_id), // 追加: park_idから名前を取得
      }));

      setPlans(formatted);
    };

    fetchPlans();
  }, [session]);

  // パークIDからパーク名に変換する関数
  const getParkName = (parkId: string) => {
    switch (parkId) {
      case "LAX":
        return "Disneyland California";
      case "NRT":
        return "Tokyo Disneyland";
      case "CDG":
        return "Disneyland Paris";
      default:
        return parkId; // パークIDがマッチしない場合はそのまま返す
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("mylist").delete().eq("id", id);

    if (error) {
      console.error("削除エラー", error);
    } else {
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">あなたのマイリスト</h1>
      <button
        onClick={() => router.push("/mylist/new")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        新規作成
      </button>

      {plans.length === 0 ? (
        <p>プランがまだありません。</p>
      ) : (
        <ul className="space-y-4">
          {plans.map((plan) => (
            <li key={plan.id} className="p-4 border rounded shadow-sm">
              <p>パーク名: {plan.park_name}</p>
              <p>フライト: {plan.flight_info}</p> {/* flight_info を表示 */}
              <p>ホテル: {plan.hotel_info}</p> {/* hotel_info を表示 */}
              <button
                onClick={() => handleDelete(plan.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
