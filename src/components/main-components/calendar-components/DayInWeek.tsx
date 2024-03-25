interface DayProps {
  dayName: string;
  date: number;
  isActive: boolean;
  onClick: () => void;
}

export const Day: React.FC<DayProps> = ({
  dayName,
  date,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center justify-center py-3 cursor-pointer ${
        isActive ? "bg-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <span>
        {dayName}
        <span
          className={`ml-1.5 flex h-8 w-8 items-center justify-center font-semibold ${"text-gray-900"}`}
        >
          {date}
        </span>
      </span>
    </div>
  );
};
