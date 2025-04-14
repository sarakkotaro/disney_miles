import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
 // Supabaseクライアントのインポート

export async function GET() {
  console.log("API route handler called: /api/flights");

  try {
    // Supabase からフライト情報を取得
    const { data, error } = await supabase
      .from("flights") // flights テーブルを参照
      .select("*"); // すべてのカラムを取得

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log(
      "Successfully fetched flights from Supabase:",
      data?.length || 0,
      "records"
    );

    // 結果を JSON で返す
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching flights:", error);
    // エラーレスポンス
    return NextResponse.json(
      { error: "Error fetching flights" },
      { status: 500 }
    );
  }
}
