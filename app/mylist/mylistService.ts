// app/mylist/mylistService.ts
import { supabase } from "@/lib/supabase";



export const savePlan = async (
  userId: string,
  parkId: string,
  airline: string,
  miles: number,
  hotel: string,
  hotelPrice: number,
  nights: number,
  // flightInfo?: string,
  // hotelInfo?: string
) => {
  const { data, error } = await supabase.from("mylist").insert({
    user_id: userId,
    park_id: parkId,
    airline,
    miles,
    hotel,
    hotel_price: hotelPrice,
    nights,
  });
  
  

  if (error) {
    return { error };
  }
  return { data };
};
