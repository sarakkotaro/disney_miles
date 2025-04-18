"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase"; // クライアントサイドの supabase インスタンス
import { Hotel, Flight, ParkCode } from "@/app/types";
import { hotelData } from "@/app/parks/hotelData";
import { flightsData } from "@/app/parks/flightsData";

const PlanCreatePage = () => {
  const router = useRouter();
  const session = useSession();

  const [selectedParkId, setSelectedParkId] = useState<string>("");
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [nights, setNights] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  const parks = [
    { code: "LAX", name: "Disneyland California" },
    { code: "SHA", name: "Shanghai Disneyland" },
    { code: "MCO", name: "Walt Disney World" },
    { code: "HKG", name: "Hong Kong Disneyland" },
    { code: "CDG", name: "Disneyland Paris" },
    { code: "HNL", name: "Aulani,Resort & Spa" },
  ];

  const hotels: Hotel[] = hotelData[selectedParkId as ParkCode] || [];
  const flights: Flight[] = flightsData[selectedParkId as ParkCode] || [];

  const selectedHotel = hotels.find((h) => h.id === selectedHotelId);
  const selectedFlight = flights.find((f) => f.id === selectedFlightId);

  const handleSave = async () => {
    if (!session) return;

    if (!selectedHotel || !selectedFlight) {
      alert("ホテルまたはフライトが選択されていません");
      return;
    }

    // hotel_priceを文字列から数値に変換
    const hotelPrice = Number(selectedHotel.hotel_price);

    const { error } = await supabase.from("mylist").insert({
      user_id: session.user.id,
      park_id: selectedParkId,
      hotel: selectedHotel.name,
      hotel_price: hotelPrice, // 数値型として保存
      airline: selectedFlight.milesType,
      miles: selectedFlight.miles,
      nights,
      notes,
    });

    if (error) {
      console.error("保存エラー:", error);
      alert("保存に失敗しました");
    } else {
      router.push("/mylist");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto text-gray-800">
      <h1 className="text-2xl font-extrabold text-blue-600 mb-2 text-center mb-6 tracking-wide">
        Start Your Plan
      </h1>

      <div className="space-y-4">
        {/* パーク選択 */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            パーク選択：
          </label>
          <select
            value={selectedParkId}
            onChange={(e) => setSelectedParkId(e.target.value)}
            className="border p-2 rounded w-full h-10 text-sm"
          >
            <option value="">選択してください</option>
            {parks.map((park) => (
              <option key={park.code} value={park.code}>
                {park.name}
              </option>
            ))}
          </select>
        </div>

        {/* フライト選択 */}
        {selectedParkId && (
          <>
            <div>
              <label className="block mb-1 text-sm font-semibold">
                フライト選択：
              </label>
              <div className="space-y-2 text-sm">
                {flights.map((flight) => (
                  <label key={flight.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="flight"
                      value={flight.id}
                      onChange={() => setSelectedFlightId(flight.id)}
                    />
                    {flight.milesType} - {flight.miles} miles
                  </label>
                ))}
              </div>
            </div>

            {/* ホテル選択 */}
            <div>
              <label className="block mb-1 text-sm font-semibold">
                ホテル選択：
              </label>
              <div className="space-y-2 text-sm">
                {hotels.map((hotel) => (
                  <label key={hotel.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hotel"
                      value={hotel.id}
                      onChange={() => setSelectedHotelId(hotel.id)}
                    />
                    {hotel.name} - ${hotel.hotel_price}
                  </label>
                ))}
              </div>
            </div>

            {/* 泊数 */}
            <div>
              <label className="block mb-1 text-sm font-semibold">泊数：</label>
              <input
                type="number"
                value={nights}
                min={1}
                onChange={(e) => setNights(Number(e.target.value))}
                className="border p-2 rounded w-full h-10 text-sm"
              />
            </div>

            {/* メモ */}
            <div>
              <label className="block mb-1 text-sm font-semibold">メモ：</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border p-2 rounded w-full text-sm leading-relaxed"
                rows={4}
              />
            </div>

            {/* 保存ボタン */}
            <button
              onClick={handleSave}
              className="w-full mt-4 px-6 py-2 rounded-full text-white bg-gradient-to-r from-pink-400 to-red-400 shadow hover:opacity-90 font-semibold tracking-wide"
            >
              ✨保存する
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCreatePage;
