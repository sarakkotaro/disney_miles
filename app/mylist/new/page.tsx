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
  const [mounted, setMounted] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // マウント時に状態更新、sessionが必要な場合はログインページにリダイレクト
  useEffect(() => {
    if (!session) {
      alert("ログインが必要です。");
      router.push("/auth/login");
    }
    setMounted(true);
  }, [session, router]);

  // マウント後のレンダリング処理
  if (!mounted || !parkId || !(parkId in flightsData)) {
    return <p>無効なアクセスです。パークが選択されていません。</p>;
  }

  // フライトとホテルのデータ
  const flights = flightsData[parkId as ParkCode] || [];
  const hotels = hotelData[parkId as ParkCode] || [];

  const handleSave = async () => {
    if (!session || !selectedFlight || !selectedHotel) {
      alert("フライトとホテルを選択してください！");
      return;
    }

    const { user } = session;
    const userId = user?.id;

    // 既存データのチェック
    const { error } = await supabase
      .from("mylist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("RLS ポリシーエラー:", error.message);
      alert("保存に失敗しました。もう一度お試しください。");
      return;
    }

    // savePlan 呼び出し時に flight_info や hotel_info を渡さない（不要なら省略）
    const result = await savePlan(
      userId,
      parkId, // parkId を渡す必要があります
      selectedFlight.operatedBy, // `selectedFlight` にあるプロパティを直接使用
      selectedFlight.miles,
      selectedHotel.name,
      Number(selectedHotel.hotel_price),
      1 // nights 引数を追加
    );

    if (result.error) {
      alert(`プラン保存に失敗しました: ${result.error.message}`);
    } else {
      router.push("/mylist");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">プラン作成</h1>

      {/* Flight選択 */}
      <div className="mb-4">
        <label htmlFor="flight" className="block text-sm font-semibold mb-2">
          フライト選択
        </label>
        <select
          id="flight"
          value={selectedFlight?.id || ""}
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

      {/* Hotel選択 */}
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

      {/* 保存ボタン */}
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
