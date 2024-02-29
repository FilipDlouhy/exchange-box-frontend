import {
  EnvelopeIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { FriendInfo } from "../../main-components/friend-components/Interfaces/FriendInterface";
import FriendButton from "../../main-components/friend-components/FriendButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setProfileUser } from "../../../store/user-state/profileUserSlice";
import { setActiveModuleName } from "../../../store/moduleSlice";
import { addOrRemoveFriend } from "../../main-components/friend-components/Helpers/FriendsHelper";
import {
  openForm,
  setAddItemUser,
} from "../../../store/user-state/addItemToPersonFormState";

export default function Friend({
  person,
  isFriend,
  setNewFriends,
  isFromUserProfile,
}: {
  person: FriendInfo;
  isFriend: boolean;
  isFromUserProfile?: boolean;
  setNewFriends: React.Dispatch<React.SetStateAction<FriendInfo[] | undefined>>;
}) {
  const userId = useSelector((state: RootState) => state.user.id);

  const dispatch = useDispatch<AppDispatch>();

  const filterFriend = (friendId: string) => {
    setNewFriends((prevFriends) =>
      prevFriends ? prevFriends.filter((friend) => friend.id !== friendId) : []
    );
  };

  const handleSetUser = (user: FriendInfo | null) => {
    dispatch(setAddItemUser(user));
  };

  const handleOpenForm = () => dispatch(openForm());

  const goToProfie = async (isFriend: boolean) => {
    if (isFromUserProfile) {
      dispatch(setActiveModuleName("Friends"));
    }

    if (userId === person.id) {
      dispatch(setActiveModuleName("User"));
    }

    dispatch(
      setProfileUser({ email: person.email, id: person.id, isFriend: isFriend })
    );
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
                onClick={() => {
                  goToProfie(true);
                }}
                text="Go to Profile"
              />
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <FriendButton
                onClick={() => {
                  handleOpenForm();
                  handleSetUser(person);
                }}
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
                onClick={() => {
                  addOrRemoveFriend(
                    false,
                    parseInt(userId),
                    parseInt(person.id)
                  );
                  filterFriend(person.id);
                }}
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
              onClick={() => {
                addOrRemoveFriend(true, parseInt(userId), parseInt(person.id));
                filterFriend(person.id);
              }}
            />
            <FriendButton
              icon={
                <UserCircleIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              onClick={() => {
                goToProfie(false);
              }}
              text="Go to Profile"
            />
          </div>
        </div>
      )}
    </li>
  );
}
