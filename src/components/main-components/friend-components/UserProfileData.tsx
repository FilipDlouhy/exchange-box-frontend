import { ReactNode } from "react";

interface UserProfileDataProps {
  icon: ReactNode;
  text: string;
}

const UserProfileData: React.FC<UserProfileDataProps> = ({ icon, text }) => {
  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default UserProfileData;
