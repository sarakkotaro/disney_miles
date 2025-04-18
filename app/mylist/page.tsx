"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plane, Hotel, Wand2 } from "lucide-react";
import { Database } from "@/lib/database.types";

type RawPlan = Database["public"]["Tables"]["mylist"]["Row"] & {
  park_id: string; // 追加
};

type PlanWithParkName = RawPlan & { park_name: string };

export default function MyListPage() {
  const session = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<PlanWithParkName[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");

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
      console.log(data); // ここでデータの中身を確認
      if (error || !data) {
        console.error("取得エラー", error);
        return;
      }
      // 型を指定してdataを安全に使用
      console.log(data); // Supabaseからのデータを確認

      const formatted: PlanWithParkName[] = (data ?? []).map((plan) => {
        const parkName = getParkName(plan.park_id); // park_nameを取得
        console.log(`park_id: ${plan.park_id} => park_name: ${parkName}`); // park_id と park_name を表示

        return {
          ...plan,
          hotel_price: plan.hotel_price ? Number(plan.hotel_price) : 0,
          park_name: parkName,
        };
      });

      setPlans(formatted);
    };

    fetchPlans();
  }, [session]);

  const getParkName = (parkId: string) => {
    switch (parkId) {
      case "LAX":
        return "Disneyland California";
      case "SHA":
        return "Shanghai Disneyland";
      case "MCO":
        return "Walt Disney World";
      case "HKG":
        return "Hong Kong Disneyland";
      case "HNL":
        return "Aulani,Resort & Spa";
      case "CDG":
        return "Disneyland Paris";

      default:
        return "Unknown Park";
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("mylist").delete().eq("id", id);
    if (!error) {
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    }
  };

  const handleUpdateNote = async (id: string) => {
    const { error } = await supabase
      .from("mylist")
      .update({ notes: noteInput })
      .eq("id", id);

    if (error) {
      alert("備考の更新に失敗しました");
      console.error(error);
    } else {
      const updated = plans.map((plan) =>
        plan.id === id ? { ...plan, notes: noteInput } : plan
      );
      setPlans(updated);
      setEditingNoteId(null); // 編集モードを終了
      setNoteInput(""); // 入力フィールドをクリア
    }
  };

  const handleEdit = (id: string, notes: string) => {
    setEditingNoteId(id);
    setNoteInput(notes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-yellow-50 p-6">
      <h1 className="text-2xl font-extrabold text-center text-blue-900 mb-6">
        MyList✨
      </h1>

      <button
        onClick={() => router.push("/mylist/new?park=LAX")}
        className="mb-6 px-6 py-2 rounded-full text-white bg-gradient-to-r from-pink-400 to-red-400 shadow hover:opacity-90"
      >
        ✨ 新規作成
      </button>

      {plans.length === 0 ? (
        <p className="text-gray-600">プランがまだありません。</p>
      ) : (
        <ul className="space-y-6">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="bg-white/80 border border-yellow-200 rounded-2xl shadow-md p-4 space-y-2"
            >
              <p className="text-lg font-semibold text-blue-800">
                <Wand2 className="inline text-blue-500 mr-2" />
                パーク名: {plan.park_name}
              </p>

              <div className="flex items-center space-x-2">
                <Plane className="text-blue-500" />
                <p>
                  フライト:{" "}
                  <span className="font-medium">
                    {plan.flight_operated_by || plan.airline || "未入力"}
                  </span>
                  {plan.miles ? ` / ${plan.miles.toLocaleString()}マイル` : ""}
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <Hotel className="text-yellow-500" />
                <p>
                  ホテル:{" "}
                  <span className="font-medium">{plan.hotel || "未入力"}</span>
                  {plan.hotel_price
                    ? ` - ¥${plan.hotel_price.toLocaleString()}`
                    : ""}
                </p>
              </div>

              {editingNoteId === plan.id ? (
                <div>
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    rows={2}
                    placeholder="備考を入力..."
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => handleUpdateNote(plan.id)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingNoteId(null)}
                      className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-sm rounded"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="italic text-sm text-gray-600">
                    備考: {plan.notes || "なし"}
                  </p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleEdit(plan.id, plan.notes || "")}
                      className="mt-2 px-3 py-1 bg-green-400 hover:bg-green-500 text-white text-sm rounded-md shadow flex items-center space-x-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 3l4 4m0 0l-4 4m4-4H9m0 0l4 4m-4-4L5 9M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                        />
                      </svg>
                      <span>編集</span>
                    </button>
                  </div>
                </div>
              )}

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
