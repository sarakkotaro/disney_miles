"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type MyPlan = {
  id: number;
  user_id: string;
  park_id: string;
  airline: string;
  miles: number;
  name: string;
  hotel_price: number;
  nights: number;
  created_at: string;
  flight_info?: string;
  hotel_info?: string;
};

export default function MyListPage() {
  const session = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<MyPlan[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }
    type DBRow = {
      id: number;
      user_id: string;
      park_id: string;
      airline: string;
      miles: number;
      name: string;
      hotel_price: string | number;
      nights: number;
      created_at: string;
      flight_info?: string;
      hotel_info?: string;
    };

    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from("mylist")
        .select("*")
        .eq("user_id", session.user?.id);

      if (error || !data) {
        console.error("取得エラー", error);
        return;
      }

      const formattedData: MyPlan[] = (data as unknown as DBRow[]).map(
        (plan) => ({
          id: plan.id,
          user_id: plan.user_id,
          park_id: plan.park_id,
          airline: plan.airline,
          miles: plan.miles,
          name: plan.name,
          hotel_price: Number(plan.hotel_price),
          nights: plan.nights,
          created_at: plan.created_at,
          flight_info: plan.flight_info ?? "",
          hotel_info: plan.hotel_info ?? "",
        })
      );

      setPlans(formattedData);
    };

    fetchPlans();
  }, [session]);
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
              <p>パークID: {plan.park_id}</p>
              <p>フライト: {plan.flight_info || "未入力"}</p>
              <p>ホテル: {plan.hotel_info || "未入力"}</p>
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
