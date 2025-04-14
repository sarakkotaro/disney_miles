import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types"; // 自作の型があれば

export const supabase = createPagesBrowserClient<Database>();
