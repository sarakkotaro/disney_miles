// TabButton.tsx
const TabButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`px-6 py-2 rounded-full font-semibold transition ${
        active
          ? "bg-blue-500 text-white shadow"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default TabButton;
