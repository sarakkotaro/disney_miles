// Hotel 型の定義
import { Hotel, ParkCode } from "@/app/types";

export const hotelData: Record<ParkCode, Hotel[]> = {
  LAX: [
    {
      id: 1,
      name: "Disneyland Hotel",
      hotel_price: "¥25,000〜",
      distance: "パークまで徒歩5分",
      image: "/images/hotel_lax_1.jpg"
    },
    {
      id: 2,
      name: "Hilton Anaheim",
      hotel_price: "¥18,000〜",
      distance: "パークまで徒歩10分",
      image: "/images/hotel_lax_2.jpg"
    }
  ],
  MCO: [
    {
      id: 3,
      name: "Disney's Contemporary Resort",
      hotel_price: "¥30,000〜",
      distance: "パークまでモノレールで5分",
      image: "/images/hotel_mco_1.jpg"
    },
    {
      id: 4,
      name: "Disney's Grand Floridian Resort & Spa",
      hotel_price: "¥35,000〜",
      distance: "パークまでモノレールで10分",
      image: "/images/hotel_mco_2.jpg"
    }
  ],
  CDG: [
    {
      id: 5,
      name: "Disneyland Hotel Paris",
      hotel_price: "€300〜",
      distance: "パークまで徒歩2分",
      image: "/images/hotel_cdg_1.jpg"
    },
    {
      id: 6,
      name: "Disney's Hotel New York – The Art of Marvel",
      hotel_price: "€250〜",
      distance: "パークまで徒歩10分",
      image: "/images/hotel_cdg_2.jpg"
    }
  ],
  SHA: [
    {
      id: 7,
      name: "Shanghai Disneyland Hotel",
      hotel_price: "¥1,000〜",
      distance: "パークまで徒歩5分",
      image: "/images/hotel_sha_1.jpg"
    },
    {
      id: 8,
      name: "Toy Story Hotel",
      hotel_price: "¥1,000〜",
      distance: "パークまで徒歩5分",
      image: "/images/hotel_sha_2.jpg"
    }
  ],
  HKG: [
    {
      id: 9,
      name: "Hong Kong Disneyland Hotel",
      hotel_price: "HK$1,200〜",
      distance: "パークまで徒歩10分",
      image: "/images/hotel_hkg_1.jpg"
    },
    {
      id: 10,
      name: "Disney's Hollywood Hotel",
      hotel_price: "HK$1,000〜",
      distance: "パークまでシャトルバスで5分",
      image: "/images/hotel_hkg_2.jpg"
    }
  ],
  HNL: [
    {
      id: 11,
      name: "Aulani, A Disney Resort & Spa",
      hotel_price: "US$500〜",
      distance: "ビーチまで徒歩5分",
      image: "/images/hotel_hnl_1.jpg"
    },
    {
      id: 12,
      name: "Four Seasons Resort Oahu at Ko Olina",
      hotel_price: "US$700〜",
      distance: "ビーチまで徒歩3分",
      image: "/images/hotel_hnl_2.jpg"
    }
  ]
};

