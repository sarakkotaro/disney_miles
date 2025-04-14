import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import Link from "next/link";
import Image from "next/image"; // ← Next.jsのImageを使う

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let profile = null;
  if (session) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    profile = data;
  }

  const parks = [
    { code: "LAX", name: "Disneyland California", image: "/images/LAX.png" },
    { code: "MCO", name: "Walt Disney World", image: "/images/mco.png" },
    { code: "CDG", name: "Disneyland Paris", image: "/images/CDG.png" },
    { code: "SHA", name: "Shanghai Disney", image: "/images/sha.png" },
    { code: "HKG", name: "Hong Kong Disney", image: "/images/HKG.png" },
    { code: "HNL", name: "Aulani,Resort & Spa", image: "/images/HNL.png" },
  ];

  return (
    <main className="min-h-screen p-6 pt-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {parks.map((park, index) => (
          <Link
            key={index}
            href={`/parks/${park.code}`}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition block"
          >
            <div className="relative w-full h-40">
              <Image
                src={park.image}
                alt={park.name}
                fill // ← 親divに対してぴったり
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4 text-center font-semibold text-blue-700">
              {park.name}
            </div>
          </Link>
        ))}
      </section>

      <footer className="text-center mt-10 text-yellow-600 font-semibold text-lg">
        どのパークに行きたい？
      </footer>
    </main>
  );
}
