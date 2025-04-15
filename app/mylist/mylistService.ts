// app/mylist/mylistService.ts
import { supabase } from "@/lib/supabase";
import { MyListPlan } from "../types/mylistplan";


type SavePlanResult = { success: true; data: MyListPlan[] } | { error: Error };

export const savePlan = async (
  userId: string,
  parkId: string,
  airline: string,
  miles: number,
  hotel: string,
  hotelPrice: number,
  nights: number,
  flightInfo?: string,
  hotelInfo?: string
) => {
  const { data, error } = await supabase.from("mylist").insert([
    {
      user_id: userId,
      park_id: parkId,
      airline,
      miles,
      hotel,
      hotel_price: hotelPrice,
      nights,
      flight_info: flightInfo,
      hotel_info: hotelInfo,
    },
  ]);

  if (error) {
    return { error };
  }
  return { data };
};

