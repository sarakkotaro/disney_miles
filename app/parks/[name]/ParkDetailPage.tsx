"use client";

import { useState } from "react";
import { parkData } from "@/app/parks/parkData";
import { flightsData } from "@/app/parks/flightsData";
import { hotelData } from "@/app/parks/hotelData";
import { ParkCode, Hotel, Flight, Park } from "@/app/types";
import Image from "next/image";
import TabButton from "../TabButton";
import InfoCard from "../InfoCard";
import { useRouter } from "next/navigation";

const ParkDetailPage: React.FC<{
  parkCode: ParkCode;
  handlePlanClick: () => void;
}> = ({ parkCode, handlePlanClick }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");

  const parkInfo: Park | undefined = parkData.find(
    (park) => park.id === parkCode
  );
  const flights: Flight[] = flightsData[parkCode] || [];
  const hotels: Hotel[] = hotelData[parkCode] || [];

  if (!parkInfo) {
    return <div>このパークの情報は見つかりませんでした。</div>;
  }

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-2">
          {parkInfo.name}
        </h1>
        {/* ✅ メイン画像 */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            src={parkInfo.imageUrl}
            alt={parkInfo.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* タイトルとサマリー */}
        <div className="text-center mt-6">
          <p className="text-gray-700 text-lg">{parkInfo.summary}</p>
        </div>

        {/* 基本情報4つ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard title="Highlights" items={parkInfo.features} icon="" />
          <InfoCard title="Information" items={parkInfo.extras} icon="" />
          <InfoCard
            title="Opening Hours"
            items={parkInfo.hours || [parkInfo.openingHours]}
            icon=""
          />
          <InfoCard title="Park Ticket" items={parkInfo.tickets} icon="" />
        </div>

        {/* タブ切り替え */}
        <div className="flex justify-center space-x-4 mt-8">
          <TabButton
            label="フライト情報"
            active={activeTab === "flights"}
            onClick={() => setActiveTab("flights")}
          />
          <TabButton
            label="ホテル情報"
            active={activeTab === "hotels"}
            onClick={() => setActiveTab("hotels")}
          />
        </div>

        {/* フライト一覧 */}
        {activeTab === "flights" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={flight.icon}
                    alt={flight.operatedBy}
                    className="w-16 h-16"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {flight.miles} マイル
                    </p>
                    <p className="text-gray-600 text-sm">{flight.milesType}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-auto space-x-4">
                  <p className="text-gray-600 text-sm">
                    運航：{flight.operatedBy}
                  </p>
                  <a
                    href="https://www.google.com/travel/flights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm"
                  >
                    Googleフライトで検索
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ホテル一覧 */}
        {activeTab === "hotels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white p-4 rounded-xl shadow-md">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-40 object-cover mb-2 rounded-md"
                />
                <h2 className="font-semibold text-lg">{hotel.name}</h2>
                <p>{hotel.hotel_price}</p>
                <p>{hotel.distance}</p>
              </div>
            ))}
          </div>
        )}

        {/* プラン作成ボタン */}
        <div className="text-center">
          <div className="mt-10 mb-6 flex justify-center gap-4">
            <button
              className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-green-400 to-lime-400 shadow hover:opacity-90"
              onClick={() => router.push("/")}
            >
              TOPに戻る
            </button>
            <button
              className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-pink-400 to-red-400 shadow hover:opacity-90"
              onClick={handlePlanClick}
            >
              ✨プラン作成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetailPage;
