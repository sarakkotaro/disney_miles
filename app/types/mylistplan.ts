// types/mylistplan.ts

export type MyListPlan = {
  id: string;            // Supabaseのuuid（文字列）
  user_id: string;
  plan_title:string
  park_id: string;
  airline: string;
  miles: number;
  hotel: string;
  hotel_price: number;
  nights: number;
  created_at: string;
  notes?: string;
  // 新しく追加した項目
  flight_icon?: string;        // フライトアイコン
  flight_miles_type?: string;  // フライトマイル種別
  flight_operated_by?: string; // 運航会社
};
