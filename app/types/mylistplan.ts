// types.ts

export type MyListPlan = {
  id: string;            // Supabaseのuuid（文字列）
  user_id: string;
  park_id: string;
  airline: string;
  miles: number;
  hotel: string;
  hotel_price: number;
  nights: number;
  flight_info?: string;     // 任意入力
  hotel_info?: string;       // 任意入力

  // 新しく追加した項目
  flight_icon?: string;        // フライトアイコン
  flight_miles_type?: string;  // フライトマイル種別
  flight_operated_by?: string; // 運航会社
  hotel_distance?: string; // ホテルの距離（例："徒歩5分"）
  hotel_image?: string;        // ホテル画像URL
};
