
import { ParkCode, Flight } from "@/app/types/index";

export const flightsData: Record<ParkCode, Flight[]> = {
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

      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "JAL",
    },
    {
      id: 3,
      miles: 50000,

      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 4,
      miles: 50000,

      icon: "/images/Alaska.png",
      milesType: "アラスカ航空 miles",
      operatedBy: "アメリカン航空",
    },
    {
      id: 5,
      miles: 50000,

      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "アメリカン航空",
    },
    {
      id: 6,
      miles: 51500,
      icon: "/images/BA.png",
      milesType: "ブリティッシュ・エアウェイズ miles",
      operatedBy: "アメリカン航空,JAL",
    },
    {
      id: 7,
      miles: 55000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 8,
      miles: 60000,
      icon: "/images/virgin.png",
      milesType: "ヴァージン・オーストラリア miles",
      operatedBy: "シンガポール航空",
    },
    {
      id: 9,
      miles: 60000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "アメリカン航空,JAL",
    },
  ],
  CDG: [
    {
      id: 10,
      miles: 42000,
      icon: "/images/virgin.png",
      milesType: " ヴァージン・オーストラリア miles ",
      operatedBy: "エールフランス",
    },
    {
      id: 11,
      miles: 45000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 12,
      miles: 52000,
      icon: "/images/JAL.png",
      milesType: "JAL miles ",
      operatedBy: "JAL",
    },
    {
      id: 13,
      miles: 55000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 14,
      miles: 55000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "エールフランス",
    },
    {
      id: 15,
      miles: 60000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 16,
      miles: 60000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 17,
      miles: 62000,
      icon: "/images/JAL.png",
      milesType: "ブリティッシュ・エアウェイズ miles",
      operatedBy: "JAL",
    },
    {
      id: 18,
      miles: 65000,
      icon: "/images/ANA.png",
      milesType: "ヴァージン・オーストラリア miles",
      operatedBy: "ANA",
    },
    {
      id: 19,
      miles: 70000,
      icon: "/images/JAL.png",
      milesType: "アメリカン航空 miles",
      operatedBy: "JAL",
    },
    {
      id: 20,
      miles: 17000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 21,
      miles: 20000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 22,
      miles: 20000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "JAL",
    },
    {
      id: 23,
      miles: 20000,
      icon: "/images/CX.png",
      milesType: "キャセイパシフィック miles",
      operatedBy: "アメリカン航空, カタール航空, キャセイパシフィック",
    },
    {
      id: 24,
      miles: 22000,
      icon: "/images/BA.png",
      milesType: "BA miles",
      operatedBy: "アメリカン航空, カタール航空, キャセイパシフィック, JAL",
    },
    {
      id: 25,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 26,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "エアカナダ,ユナイテッド航空, ANA",
    },
    {
      id: 27,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ヴァージン・オーストラリア miles",
      operatedBy: "ANA",
    },
    {
      id: 28,
      miles: 23000,
      icon: "/images/CX.png",
      milesType: "JAL miles",
      operatedBy: "キャセイパシフィック",
    },
    {
      id: 29,
      miles: 25000,
      icon: "/images/SQ.png",
      milesType: "シンガポール航空 miles",
      operatedBy: "エアカナダ,ユナイテッド航空, ANA",
    },
  ],
  HKG: [
    {
      id: 20,
      miles: 17000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 21,
      miles: 20000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 22,
      miles: 20000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "JAL",
    },
    {
      id: 23,
      miles: 20000,
      icon: "/images/CX.png",
      milesType: "キャセイパシフィック miles",
      operatedBy: "AA, QR, キャセイパシフィック",
    },
    {
      id: 24,
      miles: 22000,
      icon: "/images/BA.png",
      milesType: "ブリティッシュ・エアウェイズ miles",
      operatedBy: "アメリカン航空, カタール航空, キャセイパシフィック, JAL",
    },
    {
      id: 25,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 26,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "エアカナダ,ユナイテッド航空, ANA",
    },
    {
      id: 27,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ヴァージン・オーストラリア航空 miles",
      operatedBy: "ANA",
    },
    {
      id: 28,
      miles: 23000,
      icon: "/images/CX.png",
      milesType: "JAL miles",
      operatedBy: "キャセイパシフィック",
    },
    {
      id: 29,
      miles: 25000,
      icon: "/images/SQ.png",
      milesType: "シンガポール航空 miles",
      operatedBy: "エアカナダ,ユナイテッド航空, ANA",
    },
  ],
  SHA: [
    {
      id: 40,
      miles: 17000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 41,
      miles: 18000,
      icon: "/images/BA.png",
      milesType: "ブリティッシュ・エアウェイズ miles",
      operatedBy: "JAL",
    },
    {
      id: 42,
      miles: 19200,
      icon: "/images/QF.png",
      milesType: "カンタス航空 miles",
      operatedBy: "Jetstar",
    },
    {
      id: 43,
      miles: 20000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 44,
      miles: 20000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "JAL",
    },
    {
      id: 45,
      miles: 20000,
      icon: "/images/CX.png",
      milesType: "キャセイパシフィック miles",
      operatedBy: "中国国際航空",
    },
    {
      id: 46,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 47,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "エア・カナダ, 中国国際航空, ANA",
    },
    {
      id: 48,
      miles: 23000,
      icon: "/images/ANA.png",
      milesType: "ヴァージン・アトランティック miles",
      operatedBy: "ANA",
    },
    {
      id: 49,
      miles: 23000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "中国東方航空",
    },
  ],
  MCO: [
    {
      id: 50,
      miles: 50000,
      icon: "/images/Alaska.png",
      milesType: "アラスカ miles",
      operatedBy: "アラスカ航空, アメリカン航空",
    },
    {
      id: 51,
      miles: 55000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "Star Alliance",
    },
    {
      id: 52,
      miles: 60000,
      icon: "/images/CX.png",
      milesType: "キャセイパシフィック miles",
      operatedBy: "アラスカ航空, アメリカン航空, ブリティッシュ・エアウェイズ, キャセイパシフィック",
    },
    {
      id: 53,
      miles: 65000,
      icon: "/images/AA.png",
      milesType: "アメリカン航空 miles",
      operatedBy: "アメリカン航空",
    },
    {
      id: 54,
      miles: 65000,
      icon: "/images/Alaska.png",
      milesType: "アラスカ航空 miles",
      operatedBy: "アラスカ航空, アメリカン航空",
    },
    {
      id: 55,
      miles: 69000,
      icon: "/images/AF.png",
      milesType: "エールフランス miles",
      operatedBy: "SkyTeam and more",
    },
    {
      id: 56,
      miles: 70000,
      icon: "/images/AV.png",
      milesType: "アビアンカ航空 miles",
      operatedBy: "Star Alliance",
    },
    {
      id: 57,
      miles: 70000,
      icon: "/images/UA.png",
      milesType: "ユナイテッド航空 miles",
      operatedBy: "Star Alliance",
    },
    {
      id: 58,
      miles: 70000,
      icon: "/images/UA.png",
      milesType: "ユナイテッド航空 miles",
      operatedBy: "ユナイテッド航空",
    },
    {
      id: 59,
      miles: 70000,
      icon: "/images/DL.png",
      milesType: "デルタ航空 miles",
      operatedBy: "デルタ航空",
    },
  ],
  HNL: [
    {
      id: 60,
      miles: 35000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 61,
      miles: 40000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 62,
      miles: 40000,
      icon: "/images/LH.png",
      milesType: "ルフトハンザ miles",
      operatedBy: "ユナイテッド航空, ANA",
    },
    {
      id: 63,
      miles: 40000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "JAL",
    },
    {
      id: 64,
      miles: 40000,
      icon: "/images/virgin.png",
      milesType: "ヴァージン・オーストラリア miles",
      operatedBy: "デルタ航空",
    },
    {
      id: 65,
      miles: 40000,
      icon: "/images/JAL.png",
      milesType: "JAL miles",
      operatedBy: "JAL",
    },
    {
      id: 66,
      miles: 41500,
      icon: "/images/BA.png",
      milesType: "ブリティッシュ・エアウェイズ miles",
      operatedBy: "JAL",
    },
    {
      id: 67,
      miles: 43000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA",
    },
    {
      id: 68,
      miles: 43000,
      icon: "/images/ANA.png",
      milesType: "ANA miles",
      operatedBy: "ANA, ハワイアン航空, ユナイテッド航空",
    },
    {
      id: 69,
      miles: 45000,
      icon: "/images/virgin.png",
      milesType: "ヴァージン・オーストラリア miles",
      operatedBy: "ANA",
    },
  ],
};
