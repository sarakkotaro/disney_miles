// pages/api/plan/save.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default async function handler(req: any, res: any) {
  const data = JSON.parse(req.body);
  const { error } = await supabase.from("plans").insert(data);

  if (error) return res.status(500).json({ error });
  res.status(200).json({ message: "保存成功" });
}
