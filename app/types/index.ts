// types/index.ts


//  パーク名を一貫して定義
export type ParkCode = "LAX" | "MCO" | "SHA" | "HKG" | "HNL" | "CDG";

//  マイル情報一覧とかで使う（flightsData.ts とか）
export type Flight = {
  id: number;
  miles: number;
  icon: string;
  milesType: string;
  operatedBy: string;
  flight_icon?: string;          // 画像URL
  flight_operated_by?: string;  // 運航会社
  
};



// ホテル一覧とか選択肢に使う
export type Hotel = {
  id: number;
  name: string;
  hotel_price: string;
  distance: string;
  image: string;
  features?: string;
  description: string; 

};
// パーク詳細ページ用のデータ構造
export type Park = {
  id: string; // ← ここに型を合わせる
  name: string;
  imageUrl: string;
  details: string;
  openingHours: string;
  ticketPrice: string;
  description?: string;

  // 詳細ページ向け
  summary?: string;
  hours?: string[];
  tickets?: string[];
  features?: string[];
  extras?: string[];
};


