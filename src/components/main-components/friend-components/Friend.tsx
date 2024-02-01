import {
  EnvelopeIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { FriendInfo } from "./Interfaces/FriendInterface";
import FriendButton from "./FriendButton";
import generateUrl from "../../../contants/url";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ToggleFriendDto } from "../../../Dtos/UserDtos/toggle.friend.dto";
import axios from "axios";

export default function Friend({
  person,
  isFriend,
  setNewFriends,
}: {
  person: FriendInfo;
  isFriend: boolean;
  setNewFriends: React.Dispatch<React.SetStateAction<FriendInfo[] | undefined>>;
}) {
  const userId = useSelector((state: RootState) => state.user.id);

  const addFriend = async () => {
    try {
      const url = generateUrl(`user/create-friend-request`);
      const toggleFriendDto = new ToggleFriendDto(
        parseInt(person.id),
        parseInt(userId)
      );

      await axios.post(url, toggleFriendDto);
      setNewFriends((prevFriends) =>
        prevFriends
          ? prevFriends.filter((friend) => friend.id !== person.id)
          : []
      );
    } catch (error) {
      console.error("Error while adding friend:", error);

      throw error;
    }
  };

  return (
    <li
      key={person.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            {person.address && (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Lives in{person.address}
              </span>
            )}
          </div>
          {person.telephone && (
            <p className="mt-1 truncate text-sm text-gray-500">
              Tel: {person.telephone}
            </p>
          )}
        </div>
        {person.imageUrl ? (
          <img
            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
            src={person.imageUrl}
            alt=""
          />
        ) : (
          <div className="h-10 w-10 flex-shrink-0 ">
            <UserCircleIcon />
          </div>
        )}
      </div>
      {isFriend ? (
        <div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <FriendButton
                icon={
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
                text="Send Message"
              />

              <FriendButton
                icon={
                  <UserCircleIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
                text="Go to Profile"
              />
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <FriendButton
                icon={
                  <ArchiveBoxIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
                text="Add Item to Person"
              />
              <FriendButton
                icon={
                  <UserMinusIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
                text="Remove friend"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <FriendButton
              icon={
                <UserPlusIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              text="Add as a friend"
              onClick={addFriend}
            />
            <FriendButton
              icon={
                <UserCircleIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              text="Go to Profile"
            />
          </div>
        </div>
      )}
    </li>
  );
}
