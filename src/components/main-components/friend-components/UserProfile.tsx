import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import {
  BackspaceIcon,
  HomeIcon,
  PhoneIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { resetProfileUser } from "../../../store/user-state/profileUserSlice";
import { useEffect, useState } from "react";
import generateUrl from "../../../contants/url";
import axios from "axios";
import { ToggleFriendDto } from "../../../Dtos/UserDtos/toggle.friend.dto";
import { IUserProfile } from "./Interfaces/UserProfileInterface";
import UserProfileFriend from "./UserProfileFriend";
import UserProfileItem from "./UserProfileItem";
import { addOrRemoveFriend } from "./Helpers/FriendsHelper";
import { friendStatusEnum } from "./Enums/FriendEnumStatus";

const profile = {
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

const stats = [
  {
    name: "Total number of friends",
    value: "$405,091.00",
  },
  {
    name: "Total items",
    value: "$12,787.00",
  },
  {
    name: "Successful exchanges",
    value: "$245,988.00",
  },
  {
    name: "Unsuccessful exchanges",
    value: "$30,156.00",
  },
];

const people = [
  {
    isFriend: true,

    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },

  {
    isFriend: false,

    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    isFriend: false,

    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },

  {
    isFriend: false,
    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const profileUser = useSelector((state: RootState) => state.profileUser);
  const userId = useSelector((state: RootState) => state.user.id);
  const [profileUserData, setProfileUserData] = useState<IUserProfile>();
  const [friendStatus, setFriendStatus] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      const url = generateUrl(`user/get-user-for-profile`);

      try {
        if (userId && profileUser?.id) {
          const toggleFriendDto = new ToggleFriendDto(
            parseInt(userId),
            parseInt(profileUser.id)
          );
          const response = await axios.post(url, toggleFriendDto);
          setProfileUserData(response.data);

          setFriendStatus(response.data.friendStatus);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (profileUser) {
      fetchData();
    }
  }, [profileUser]);

  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={profile.backgroundImage}
          alt=""
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            {profileUserData?.imageURL?.length > 0 ? (
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white  sm:h-32 sm:w-32"
                src={profileUserData?.imageURL}
                alt=""
              />
            ) : (
              <UserIcon className="h-24 w-24 rounded-full bg-white sm:h-32 sm:w-32" />
            )}
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {profileUserData?.name}
              </h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <HomeIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>{profileUserData?.address}</span>
              </button>

              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PhoneIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Phone: {profileUserData?.telephone}</span>
              </button>

              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <EnvelopeIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Message</span>
              </button>

              {friendStatus !== friendStatusEnum.FriendRequestSent &&
              friendStatus !== friendStatusEnum.FriendRequestSentRecieved &&
              friendStatus !== friendStatusEnum.IsFriend ? (
                <button
                  onClick={() => {
                    if (profileUser.id) {
                      addOrRemoveFriend(
                        true,
                        parseInt(userId),
                        parseInt(profileUser.id)
                      );
                      setFriendStatus(friendStatusEnum.FriendRequestSent);
                    }
                  }}
                  type="button"
                  className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <UserPlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Add Friend</span>
                </button>
              ) : friendStatus === friendStatusEnum.IsFriend ? (
                <button
                  onClick={() => {
                    if (profileUser.id) {
                      addOrRemoveFriend(
                        false,
                        parseInt(userId),
                        parseInt(profileUser.id)
                      );
                      setFriendStatus(friendStatusEnum.NotFriend);
                    }
                  }}
                  type="button"
                  className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <UserMinusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Remove Friend</span>
                </button>
              ) : null}

              {(friendStatus === friendStatusEnum.FriendRequestSent ||
                friendStatus ===
                  friendStatusEnum.FriendRequestSentRecieved) && (
                <button className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <UserIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {friendStatus === friendStatusEnum.FriendRequestSent
                    ? "Friend request sent"
                    : "Friend request received"}
                </button>
              )}

              <button
                onClick={() => {
                  dispatch(resetProfileUser());
                }}
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <BackspaceIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Go back</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">
            {profileUserData?.name}
          </h1>
        </div>
      </div>

      <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
          >
            <dt className="text-sm font-medium leading-6 text-gray-500">
              {stat.name}
            </dt>

            <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="w-full">
        <p className="ml-8 font-bold text-2xl ">Friends</p>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {profileUserData?.userFriends.map((friend) => (
            <UserProfileFriend friend={friend} />
          ))}
        </ul>
      </div>

      <div className="w-full mt-10 ">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {profileUserData?.userItems.map((item) => (
            <UserProfileItem item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;
