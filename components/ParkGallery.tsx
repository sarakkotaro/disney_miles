import Image from "next/image";
import { Park } from "@/types"; // 型をインポート

type ParkGalleryProps = {
  parks: Park[];
  openModal: (park: Park) => void;
};

const ParkGallery: React.FC<ParkGalleryProps> = ({ parks, openModal }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {parks.map((park) => (
        <div key={park.id} className="cursor-pointer group">
          {/* 画像の枠を統一 */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg transition duration-300 group-hover:brightness-75">
            <Image
              src={park.imageUrl}
              alt={park.name}
              fill
              className="object-cover transition duration-300 group-hover:scale-105"
              onClick={() => openModal(park)}
            />
          </div>
          <h3 className="text-center mt-2">{park.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ParkGallery;
