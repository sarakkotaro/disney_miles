import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // 認証付きSupabaseクライアントを作る
  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();

  if (userError || !user) {
    return res.status(401).json({ error: "Unauthorized: Invalid user" });
  }

  try {
    const body = JSON.parse(req.body);

    const plan = {
      ...body,
      user_id: user.id,
    };

    const { error } = await supabaseAuth.from("plans").insert(plan);

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ message: "保存成功" });
  } catch (e) {
    console.error("保存エラー:", e);
    return res.status(400).json({ error: "リクエストが不正です" });
  }
}
