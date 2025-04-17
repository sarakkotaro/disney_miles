// pages/api/plan/save.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Supabase初期化
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Planの型を定義（動的フィールドはRecordで対応）
type Plan = {
  user_id: string;
  park_id: string;
  hotel_price?: number;
  // 動的なフィールドがあればRecord<string, unknown>で対応
  [key: string]: string | number | undefined | Record<string, unknown>;
};

// APIルートのハンドラー
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // データを受け取る
    const data: Plan = JSON.parse(req.body);

    // Supabaseにデータを挿入
    const { error } = await supabase.from("plans").insert(data);

    if (error) {
      return res.status(500).json({ error });
    }

    res.status(200).json({ message: "保存成功" });
  } catch (e) {
    console.error("保存エラー:", e);
    res.status(400).json({ error: "リクエストが不正です" });
  }
}
