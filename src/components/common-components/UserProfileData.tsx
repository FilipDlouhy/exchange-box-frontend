import React, { useState } from "react";

interface UserProfileDataProps {
  icon: React.ReactNode;
  text: string | null | undefined;
  canUpdate?: boolean;
  setWasUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeFromParrent?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const UserProfileData: React.FC<UserProfileDataProps> = ({
  icon,
  text,
  canUpdate = false,
  setWasUpdated,
  handleChangeFromParrent,
}) => {
  const [editableText, setEditableText] = useState<string | null | undefined>(
    text
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== undefined) {
      setEditableText(event.target.value);
      setWasUpdated?.(true);
      handleChangeFromParrent?.(event);
    }
  };

  return (
    <div>
      {canUpdate ? (
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {icon}
          <input
            type="text"
            value={editableText ? editableText : ""}
            onChange={handleChange}
            className="ml-2 outline-none text-gray-900 placeholder-gray-500 focus:ring-0 border-none bg-transparent"
            placeholder="Enter text"
          />
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {icon}
          <span>{text}</span>
        </button>
      )}
    </div>
  );
};

export default UserProfileData;
