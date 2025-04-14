import { supabase } from '@/lib/supabase';

type SavePlanResult = { success: true } | { error: Error };

export const savePlan = async (
  userId: string,
  airline: string,
  miles: number,
  hotel: string,
  hotel_price: number,
  nights: number
) => {
  const { data, error } = await supabase.from("mylist").insert([
    {
      user_id: userId,
      airline,
      miles,
      hotel,
      hotel_price,
      nights,
    },
  ]);

  if (error) {
    return { error };
  }
  return { data };
};
