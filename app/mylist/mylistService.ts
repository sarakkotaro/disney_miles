import { supabase } from '@/lib/supabase';

type SavePlanResult = { success: true } | { error: Error };

export const savePlan = async (
  userId: string,
  airline: string,
  miles: number,
  hotel: string,
  hotel_price: number,
  nights: number
): Promise<SavePlanResult> => {
  if (!userId) {
    return { error: new Error("ユーザーが認証されていません") };
  }

  const { data, error } = await supabase
    .from("mylist")
    .insert([
      {
        user_id: userId,
        airline,
        miles,
        hotel,
        hotel_price: Number(selectedHotel?.hotel_price),
        nights,
      },
    ])
    .single();


  if (error) {
    console.error("保存エラー:", error.message);
    return { error: new Error(error.message) };
  }

  return { success: true };
};
