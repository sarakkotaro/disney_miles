"use client";
import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter, useSearchParams } from "next/navigation";
import { savePlan } from "@/app/mylist/mylistService";
import { flightsData } from "@/app/parks/flightsData";
import { hotelData } from "@/app/parks/hotelData";
import { Flight, Hotel, ParkCode } from "@/app/types";
import { supabase } from "@/lib/supabase";

export default function PlanCreatePage() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const parkId = searchParams.get("park") || "";

  const [mounted, setMounted] = useState(false); // ✅ Mount チェック用
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // ✅ マウントされたかチェック（これを入れる）
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ session が読み込まれてからログインチェック（これも入れる）
  useEffect(() => {
    if (mounted && !session) {
      alert("ログインが必要です。");
      router.push("/auth/login");
    }
  }, [mounted, session, router]);

  if (!mounted) return null;
  if (!parkId || !(parkId in flightsData)) {
    return <p>無効なアクセスです。パークが選択されていません。</p>;
  } // クライアントでの描画が保証されるまで描画しない

  // あとは通常のUIコード（flights, hotelsの取得、UIの表示など）
  const flights = flightsData[parkId as ParkCode] || [];
  const hotels = hotelData[parkId as ParkCode] || [];

  // 保存ボタンが押されたとき
  const handleSave = async () => {
    if (!session) {
      alert("ログインが必要です。");
      return;
    }
    if (!selectedFlight || !selectedHotel) {
      alert("フライトとホテルを選択してください！");
      return;
    }
    const userId = session.user.id;
    console.log("userId:", userId); // ログインユーザーIDを確認

    // RLSポリシーに対するデバッグ: もしRLSが働いていない場合、手動で`auth.uid()`を確認
    const { data, error } = await supabase
      .from("mylist")
      .select("*")
      .eq("user_id", userId); // ここで一致するデータが返されるか確認

    if (error) {
      console.error("RLS ポリシーエラー:", error.message);
    } else {
      console.log("RLS ポリシー通過確認:", data);
    }

    const result = await savePlan(
      userId,
      selectedFlight.operatedBy,
      selectedFlight.miles,
      selectedHotel.name,
      Number(selectedHotel.hotel_price),
      1
    );

    if ("error" in result) {
      console.error("保存エラー", result.error);
      alert(`プラン保存に失敗しました: ${result.error.message}`);
    } else {
      router.push("/mylist"); // 保存後にマイリストにリダイレクト
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">プラン作成</h1>

      {/* Flight、Hotelの選択 UI */}
      <div className="mb-4">
        <label htmlFor="flight" className="block text-sm font-semibold mb-2">
          フライト選択
        </label>
        <select
          id="flight"
          value={selectedFlight ? selectedFlight.id : ""}
          onChange={(e) => {
            const flight = flights.find((f) => f.id === Number(e.target.value));
            setSelectedFlight(flight || null);
          }}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">選択してください</option>
          {flights.map((flight) => (
            <option key={flight.id} value={flight.id}>
              {flight.operatedBy} - {flight.miles}マイル
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="hotel" className="block text-sm font-semibold mb-2">
          ホテル選択
        </label>
        <select
          onChange={(e) => {
            const hotel = hotels.find((h) => h.name === e.target.value);
            setSelectedHotel(hotel || null);
          }}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">選択してください</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.name}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          プランを保存
        </button>
      </div>
    </div>
  );
}
