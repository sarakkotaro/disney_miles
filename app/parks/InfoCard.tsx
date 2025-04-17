interface InfoCardProps {
  title: string;
  items: (string | React.ReactNode)[] | undefined; // string | ReactNode で受け入れる// undefinedを許容
  icon: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items = [], icon }) => {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCard;
