"use client";
import { useState } from "react";
import { parkData } from "@/app/parks/parkData";
import { flightsData } from "@/app/parks/flightsData";
import { hotelData } from "@/app/parks/hotelData";
import { ParkCode, Hotel, Flight, ParkData } from "@/app/types";

const ParkDetailPage: React.FC<{
  parkCode: ParkCode;
  handlePlanClick: () => void;
}> = ({ parkCode, handlePlanClick }) => {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");

  const parkInfo: ParkData | undefined = parkData[parkCode];
  const flights: Flight[] = flightsData[parkCode] || [];
  const hotels: Hotel[] = hotelData[parkCode] || [];

  if (!parkInfo) {
    return <div>このパークの情報は見つかりませんでした。</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{parkInfo.title}</h1>
      <p>{parkInfo.summary}</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">営業時間</h3>
        <ul>
          {parkInfo.hours.map((hour, index) => (
            <li key={index}>{hour}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">チケット情報</h3>
        <ul>
          {parkInfo.tickets.map((ticket, index) => (
            <li key={index}>{ticket}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">特徴</h3>
        <ul>
          {parkInfo.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">追加情報</h3>
        <ul>
          {parkInfo.extras.map((extra, index) => (
            <li key={index}>{extra}</li>
          ))}
        </ul>
      </div>

      {/* タブ切り替え */}
      <div className="flex space-x-4 mt-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "flights" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("flights")}
        >
          フライト情報
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "hotels" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("hotels")}
        >
          ホテル情報
        </button>
      </div>

      {/* フライト一覧 */}
      {activeTab === "flights" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flights.map((flight) => (
            <div key={flight.id} className="border p-4 rounded shadow">
              <img
                src={flight.icon}
                alt={flight.operatedBy}
                className="w-16 h-16 mb-2"
              />
              <p>{flight.miles} マイル</p>
              <p>{flight.milesType}</p>
              <p>運航：{flight.operatedBy}</p>
              <a
                href="https://www.google.com/travel/flights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                Googleフライトで検索
              </a>
            </div>
          ))}
        </div>
      )}

      {/* ホテル一覧 */}
      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((hotel: Hotel) => (
            <div key={hotel.id} className="border p-4 rounded shadow">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="font-semibold">{hotel.name}</h2>
              <p>{hotel.hotel_price}</p>
              <p>{hotel.distance}</p>
            </div>
          ))}
        </div>
      )}

      {/* プラン作成ボタン */}
      <button
        className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        onClick={handlePlanClick}
      >
        このパークでプランを作成する
      </button>
    </div>
  );
};

export default ParkDetailPage;
