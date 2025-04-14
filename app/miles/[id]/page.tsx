// app/miles/[id]/page.tsx
"use client";

import { usePathname } from "next/navigation";
// 各目的地ごとの必要マイル数
const milesData: Record<string, { destination: string }> = {
  LAX: { destination: "ディズニーランドロサンゼルス" },
  CDG: { destination: "ディズニーランド・パリ" },
  HKG: { destination: "ディズニーランド・香港" },
  SHA: { destination: "ディズニーランド・上海" },
  MCO: { destination: "ディズニーランド・フロリダ" },
  HNL: { destination: "アウラニ・ディズニー・リゾート&スパ" },
};

// フライトデータの型定義
interface Flight {
  id: number;
  miles: number;
  icon: string;
  milesType: string;
  operatedBy: string;
}

// 各目的地のフライトデータ
export const flightsData: Record<string, Flight[]> = {
  LAX: [
    {
      id: 1,
      miles: 40000,

      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 2,
      miles: 50000,

      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "JAL",
    },
    {
      id: 3,
      miles: 50000,

      icon: "/images/ana.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 4,
      miles: 50000,

      icon: "/images/Alaska.png",
      milesType: "AS miles",
      operatedBy: "AA",
    },
    {
      id: 5,
      miles: 50000,

      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "American Airlines",
    },
    {
      id: 6,
      miles: 51500,

      icon: "/images/BA.png",
      milesType: "BA miles",
      operatedBy: "AA,JAL",
    },
    {
      id: 7,
      miles: 55000,

      icon: "/images/ana.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 8,
      miles: 60000,
      icon: "/images/virgin.png",
      milesType: "VS miles",
      operatedBy: "シンガポール航空",
    },
    {
      id: 9,
      miles: 60000,

      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "AA,JAL",
    },
  ],
  CDG: [
    {
      id: 10,
      miles: 42000,
      icon: "/images/virgin.png",
      milesType: " VS miles ",
      operatedBy: "Air France",
    },
    {
      id: 11,
      miles: 45000,
      icon: "/images/ana.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 12,
      miles: 52000,
      icon: "/images/jal.png",
      milesType: "  JL miles ",
      operatedBy: "JAL",
    },
    {
      id: 13,
      miles: 55000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 14,
      miles: 55000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "Air France",
    },
    {
      id: 15,
      miles: 60000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 16,
      miles: 60000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 17,
      miles: 62000,
      icon: "/images/jal.png",
      milesType: "BA miles",
      operatedBy: "JAL",
    },
    {
      id: 18,
      miles: 65000,
      icon: "/images/ana.png",
      milesType: "VS miles",
      operatedBy: "ANA",
    },
    {
      id: 19,
      miles: 70000,
      icon: "/images/jal.png",
      milesType: "AA miles",
      operatedBy: "JAL",
    },
    {
      id: 20,
      miles: 17000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 21,
      miles: 20000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 22,
      miles: 20000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "JAL",
    },
    {
      id: 23,
      miles: 20000,
      icon: "/images/CX.png",
      milesType: "CX miles",
      operatedBy: "AA, QR, CX",
    },
    {
      id: 24,
      miles: 22000,
      icon: "/images/ba.png",
      milesType: "BA miles",
      operatedBy: "AA, QR, CX, JL",
    },
    {
      id: 25,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 26,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "エアカナダ,UA, ANA",
    },
    {
      id: 27,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "VS miles",
      operatedBy: "ANA",
    },
    {
      id: 28,
      miles: 23000,
      icon: "/images/CX.png",
      milesType: "JL miles",
      operatedBy: "CX",
    },
    {
      id: 29,
      miles: 25000,
      icon: "/images/SQ.png",
      milesType: "SQ miles",
      operatedBy: "エアカナダ,UA, ANA",
    },
  ],
  HKG: [
    {
      id: 20,
      miles: 17000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 21,
      miles: 20000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 22,
      miles: 20000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "JAL",
    },
    {
      id: 23,
      miles: 20000,
      icon: "/images/CX.png",
      milesType: "CX miles",
      operatedBy: "AA, QR, CX",
    },
    {
      id: 24,
      miles: 22000,
      icon: "/images/ba.png",
      milesType: "BA miles",
      operatedBy: "AA, QR, CX, JL",
    },
    {
      id: 25,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 26,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "エアカナダ,UA, ANA",
    },
    {
      id: 27,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "VS miles",
      operatedBy: "ANA",
    },
    {
      id: 28,
      miles: 23000,
      icon: "/images/CX.png",
      milesType: "JL miles",
      operatedBy: "CX",
    },
    {
      id: 29,
      miles: 25000,
      icon: "/images/SQ.png",
      milesType: "SQ miles",
      operatedBy: "エアカナダ,UA, ANA",
    },
  ],
  SHA: [
    {
      id: 40,
      miles: 17000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 41,
      miles: 18000,
      icon: "/images/ba.png",
      milesType: "BA miles",
      operatedBy: "JAL",
    },
    {
      id: 42,
      miles: 19200,
      icon: "/images/qf.png",
      milesType: "QF miles",
      operatedBy: "Jetstar",
    },
    {
      id: 43,
      miles: 20000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 44,
      miles: 20000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "JAL",
    },
    {
      id: 45,
      miles: 20000,
      icon: "/images/cx.png",
      milesType: "CX miles",
      operatedBy: "CA",
    },
    {
      id: 46,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 47,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "AC, CA, NH",
    },
    {
      id: 48,
      miles: 23000,
      icon: "/images/ana.png",
      milesType: "VS miles",
      operatedBy: "ANA",
    },
    {
      id: 49,
      miles: 23000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "MU",
    },
  ],
  MCO: [
    {
      id: 50,
      miles: 50000,
      icon: "/images/alaska.png",
      milesType: "AS miles",
      operatedBy: "AS, AA",
    },
    {
      id: 51,
      miles: 55000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "Star Alliance",
    },
    {
      id: 52,
      miles: 60000,
      icon: "/images/cx.png",
      milesType: "CX miles",
      operatedBy: "AS, AA, BA, CX",
    },
    {
      id: 53,
      miles: 65000,
      icon: "/images/aa.png",
      milesType: "AA miles",
      operatedBy: "AA",
    },
    {
      id: 54,
      miles: 65000,
      icon: "/images/alaska.png",
      milesType: "AS miles",
      operatedBy: "AS, AA",
    },
    {
      id: 55,
      miles: 69000,
      icon: "/images/af.png",
      milesType: "AF miles",
      operatedBy: "SkyTeam and more",
    },
    {
      id: 56,
      miles: 70000,
      icon: "/images/av.png",
      milesType: "AV miles",
      operatedBy: "Star Alliance",
    },
    {
      id: 57,
      miles: 70000,
      icon: "/images/ua.png",
      milesType: "UA miles",
      operatedBy: "Star Alliance",
    },
    {
      id: 58,
      miles: 70000,
      icon: "/images/ua.png",
      milesType: "UA miles",
      operatedBy: "UA",
    },
    {
      id: 59,
      miles: 70000,
      icon: "/images/dl.png",
      milesType: "DL miles",
      operatedBy: "DL",
    },
  ],
  HNL: [
    {
      id: 60,
      miles: 35000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 61,
      miles: 40000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 62,
      miles: 40000,
      icon: "/images/lh.png",
      milesType: "LH miles",
      operatedBy: "UA, NH",
    },
    {
      id: 63,
      miles: 40000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "JAL",
    },
    {
      id: 64,
      miles: 40000,
      icon: "/images/virgin.png",
      milesType: "VS miles",
      operatedBy: "DL",
    },
    {
      id: 65,
      miles: 40000,
      icon: "/images/jal.png",
      milesType: "JL miles",
      operatedBy: "JAL",
    },
    {
      id: 66,
      miles: 41500,
      icon: "/images/ba.png",
      milesType: "BA miles",
      operatedBy: "JAL",
    },
    {
      id: 67,
      miles: 43000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA",
    },
    {
      id: 68,
      miles: 43000,
      icon: "/images/ana.png",
      milesType: "NH miles",
      operatedBy: "ANA, HA, UA",
    },
    {
      id: 69,
      miles: 45000,
      icon: "/images/virgin.png",
      milesType: "VS miles",
      operatedBy: "ANA",
    },
  ],
};

// 各目的地ごとの必要マイル数

const MilesPage: React.FC = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2] as keyof typeof flightsData; // ✅ 型を明示

  const milesInfo = milesData[id];
  const flights = flightsData[id] || []; // ✅ ここでエラーを防ぐ！

  if (!milesInfo) {
    return (
      <div className="text-center mt-10">マイル情報が見つかりません。</div>
    );
  }
  return (
    <div>
      <h1>{milesInfo.destination}のフライト情報</h1>
      <div>
        {flights.map((flight) => (
          <div key={flight.id}>
            <p>{flight.operatedBy}</p>
            <p>{flight.miles} マイル</p>
            <img src={flight.icon} alt={flight.operatedBy} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilesPage;
