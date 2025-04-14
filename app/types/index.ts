// types/index.ts

export type ParkCode = "LAX" | "MCO" | "SHA" | "HKG" | "HNL" | "CDG";

export type Flight = {
  id: number;
  miles: number;
  icon: string;
  milesType: string;
  operatedBy: string;
};

export type Hotel = {
  id: number;
  name: string;
  hotel_price: string;
  distance: string;
  image: string;

};

export type ParkData = {
  title: string;
  summary: string;
  hours: string[];
  tickets: string[];
  features: string[];
  extras: string[];
};
