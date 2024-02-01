interface FriendButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const FriendButton: React.FC<FriendButtonProps> = ({ icon, text, onClick }) => {
  return (
    <div className="-ml-px flex w-0 flex-1">
      <button
        onClick={onClick}
        className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
      >
        {icon}
        {text}
      </button>
    </div>
  );
};

export default FriendButton;
