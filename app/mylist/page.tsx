"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plane, Hotel, Wand2 } from "lucide-react";

export default function MyListPage() {
  const session = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
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

      if (error || !data) {
        console.error("取得エラー", error);
        return;
      }

      const formatted = (data ?? []).map((plan: any) => ({
        ...plan,
        hotel_price: plan.hotel_price ? Number(plan.hotel_price) : 0,
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

  const handleUpdateNote = async (id: number) => {
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

  const handleEdit = (id: number, currentNote: string) => {
    setEditingNoteId(id);
    setNoteInput(currentNote); // 編集時に備考をセット
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-yellow-50 p-6">
      <h1 className="text-2xl font-extrabold text-center text-blue-900 mb-6">
        あなたのマイリスト ✨
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

              <p className="italic text-sm text-gray-600">
                {plan.flight_info || "フライト情報なし"}
              </p>

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

              <p className="italic text-sm text-gray-600">
                {plan.hotel_info || "ホテル情報なし"}
              </p>

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
