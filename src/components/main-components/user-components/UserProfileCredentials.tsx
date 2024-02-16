import UserProfileData from "../../common-components/UserProfileData";
import {
  HomeIcon,
  PhoneIcon,
  UserPlusIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { UserCredentialsProps } from "./ComponentProps/UserCredentialsProps";

function UserProfileCredentials({
  adress,
  phone,
  wasUpdated,
  setWasUpdated,
  handleAdressChange,
  handlePhoneChange,
  setOpen,
  updateUserData,
}: UserCredentialsProps) {
  return (
    <div className="mt-6 mx-auto justify-center flex flex-col h-60 flex-wrap  items-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
      <UserProfileData
        icon={
          <HomeIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        }
        text={adress}
        canUpdate={true}
        setWasUpdated={setWasUpdated}
        handleChangeFromParrent={handleAdressChange}
      />

      <UserProfileData
        icon={
          <PhoneIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        }
        text={phone}
        canUpdate={true}
        setWasUpdated={setWasUpdated}
        handleChangeFromParrent={handlePhoneChange}
      />

      <button
        onClick={() => {
          setOpen(true);
        }}
        type="button"
        className="flex justify-around rounded-md bg-white w-40 items-center h-9 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <WrenchIcon
          className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <span>Update password</span>
      </button>

      {wasUpdated ? (
        <button
          onClick={() => {
            updateUserData();
          }}
          type="button"
          className="flex justify-around rounded-md bg-white w-40 items-center h-9 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <UserPlusIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>Update profile</span>
        </button>
      ) : (
        <div className=" w-32 h-9 "></div>
      )}
    </div>
  );
}

export default UserProfileCredentials;
