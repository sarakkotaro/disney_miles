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

  const [flightInfo, setFlightInfo] = useState(""); // 任意補足
  const [hotelInfo, setHotelInfo] = useState(""); // 任意補足

  // セッションチェック
  useEffect(() => {
    if (!session) {
      alert("ログインが必要です。");
      router.push("/auth/login");
    }
    setMounted(true);
  }, [session, router]);

  if (!mounted || !parkId || !(parkId in flightsData)) {
    return <p>無効なアクセスです。パークが選択されていません。</p>;
  }

  const flights = flightsData[parkId as ParkCode] || [];
  const hotels = hotelData[parkId as ParkCode] || [];

  const handleSave = async () => {
    if (!session || !selectedFlight || !selectedHotel) {
      alert("フライトとホテルを選択してください！");
      return;
    }

    const userId = session.user?.id;

    const { error } = await supabase
      .from("mylist")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("RLS ポリシーエラー:", error.message);
      alert("保存に失敗しました。もう一度お試しください。");
      return;
    }

    const result = await savePlan(
      userId,
      parkId,
      selectedFlight.operatedBy,
      selectedFlight.miles,
      selectedHotel.name,
      Number(selectedHotel.hotel_price),
      1,
      flightInfo,
      hotelInfo
    );

    if (result.error) {
      alert(`プラン保存に失敗しました: ${result.error.message}`);
    } else {
      router.push("/mylist");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">プラン作成</h1>

      {/* フライト選択 */}
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
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">選択してください</option>
          {flights.map((flight) => (
            <option key={flight.id} value={flight.id}>
              {flight.operatedBy} - {flight.miles}マイル
            </option>
          ))}
        </select>
      </div>

      {/* フライト補足（任意） */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          フライト補足情報（任意）
        </label>
        <textarea
          value={flightInfo}
          onChange={(e) => setFlightInfo(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="例: JL123便 / 成田発10:00"
        />
      </div>

      {/* ホテル選択 */}
      <div className="mb-4">
        <label htmlFor="hotel" className="block text-sm font-semibold mb-2">
          ホテル選択
        </label>
        <select
          id="hotel"
          value={selectedHotel?.name || ""}
          onChange={(e) => {
            const hotel = hotels.find((h) => h.name === e.target.value);
            setSelectedHotel(hotel || null);
          }}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">選択してください</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.name}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>

      {/* ホテル補足（任意） */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          ホテル補足情報（任意）
        </label>
        <textarea
          value={hotelInfo}
          onChange={(e) => setHotelInfo(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="例: オーシャンビュー / 朝食付き"
        />
      </div>

      {/* 保存ボタン */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          プランを保存
        </button>
      </div>
    </div>
  );
}
