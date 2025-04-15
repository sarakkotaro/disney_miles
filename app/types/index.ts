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
};


// ホテル一覧とか選択肢に使う
export type Hotel = {
  id: number;
  name: string;
  hotel_price: string;
  distance: string;
  image: string;

};
// パーク詳細ページ用のデータ構造
export type ParkData = {
  title: string;
  summary: string;
  hours: string[];
  tickets: string[];
  features: string[];
  extras: string[];
};

// パークTOPページ用のデータ構造
export type Park = {
  id: string;
  name: string;
  imageUrl: string;
  details: string;
  openingHours: string;
  ticketPrice: string;
};
