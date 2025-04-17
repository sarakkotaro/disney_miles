// parkData.ts
import { Park } from "../types";

export const parkData: Park[] = [
  {
    id: "LAX",
    name: "ディズニーランド・リゾート（カリフォルニア）",
    imageUrl: "/images/LAXpark.png",
    details: "世界初のディズニーパーク。ウォルト・ディズニーが手がけた唯一のパーク。",
    openingHours: "8:00〜22:00",
    ticketPrice: "$104〜",

    summary: "アナハイムに位置する2つのテーマパーク。ディズニーの原点。",
    hours: ["8:00〜22:00", "9:00〜21:00"],
    tickets: ["1日券", "パークホッパー", "マルチデー"],
    features: ["ディズニーランド・パーク", "カリフォルニア・アドベンチャー"],
    extras: ["スター・ウォーズ：ギャラクシーズ・エッジ", "ダウンタウン・ディズニー"]
  },
  {
    id: "MCO",
    name: "ウォルト・ディズニー・ワールド（フロリダ）",
    imageUrl: "/images/mco.jpg",
    details: "世界最大のディズニーリゾート。4つのテーマパークと複数のホテルを持つ。",
    openingHours: "9:00〜21:00",
    ticketPrice: "$109〜",

    summary: "マジックキングダムやエプコットなど多彩な体験ができるリゾート。",
    hours: ["9:00〜21:00", "10:00〜20:00"],
    tickets: ["1日券", "パークホッパー", "マジックバンド付き"],
    features: ["マジック・キングダム", "アニマル・キングダム", "ハリウッド・スタジオ"],
    extras: ["ディズニー・スプリングス", "ウォーターパーク"]
  },
  {
    id: "SHA",
    name: "上海ディズニーリゾート",
    imageUrl: "/images/shanghai.jpg",
    details: "中国大陸初のディズニーパーク。革新的な施設が多い。",
    openingHours: "9:00〜20:00",
    ticketPrice: "399元〜",

    summary: "ディズニー最新技術を体験できる未来型パーク。",
    hours: ["9:00〜20:00", "10:00〜21:00"],
    tickets: ["1日券", "年パス", "ファストパス付き"],
    features: ["パイレーツ・オブ・カリビアン大冒険", "TRONライトサイクル"],
    extras: ["ディズニータウン", "世界最大のキャッスル"]
  },
  {
    id: "HKG",
    name: "香港ディズニーランド",
    imageUrl: "/images/hongkong.jpg",
    details: "山に囲まれた自然と調和したパーク。コンパクトで回りやすい。",
    openingHours: "10:30〜19:30",
    ticketPrice: "639HKD〜",

    summary: "短時間で満喫できるディズニーパーク。",
    hours: ["10:30〜19:30"],
    tickets: ["1日券", "ファストパス"],
    features: ["アナ雪の世界", "ライオン・キングショー"],
    extras: ["香港ディズニーホテル群", "自然豊かなロケーション"]
  },
  {
    id: "HNL",
    name: "アウラニ・ディズニー・リゾート＆スパ（ハワイ）",
    imageUrl: "/images/aulani.jpg",
    details: "テーマパークではなく、ハワイの自然と文化を感じる高級リゾート。",
    openingHours: "施設により異なる",
    ticketPrice: "宿泊料金による",

    summary: "ハワイの伝統文化とディズニー体験が融合したリゾートホテル。",
    hours: ["チェックイン15:00〜", "チェックアウト〜11:00"],
    tickets: [],
    features: ["プール＆ウォータースライダー", "ディズニーキャラグリーティング"],
    extras: ["スパ＆ウェルネス", "ローカル文化体験プログラム"]
  },
  {
    id: "CDG",
    name: "ディズニーランド・パリ",
    imageUrl: "/images/paris.jpg",
    details: "ヨーロッパ唯一のディズニーパーク。芸術的な建築も魅力。",
    openingHours: "9:30〜21:00",
    ticketPrice: "62€〜",

    summary: "ロマンチックな雰囲気が魅力のパリ郊外にあるパーク。",
    hours: ["9:30〜21:00", "10:00〜20:00"],
    tickets: ["1日券", "ファストパス", "年間パス"],
    features: ["ディズニーランド・パーク", "ウォルト・ディズニー・スタジオ"],
    extras: ["ヴィレッジ", "パリ市内からのアクセス良好"]
  }
];
