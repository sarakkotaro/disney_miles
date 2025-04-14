"use client";
import { useRouter, useParams } from "next/navigation";
import ParkDetailPage from "@/app/parks/[name]/ParkDetailPage";

export default function ParkPage() {
  const router = useRouter();
  const params = useParams();

  // 'parkCode' を 'LAX' | 'MCO' 型にキャスト
  const parkCode = params.name as "LAX" | "MCO"; // ここで型キャストを追加

  const handlePlanClick = () => {
    router.push(`/mylist/new?park=${parkCode}`);
  };

  return (
    <div className="p-6">
      <ParkDetailPage parkCode={parkCode} handlePlanClick={handlePlanClick} />
    </div>
  );
}
