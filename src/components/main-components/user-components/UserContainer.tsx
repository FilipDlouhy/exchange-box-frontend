import { useEffect, useState } from "react";

import UserProfileCredentials from "./UserProfileCredentials";
import UserProfileImages from "./UserProfileImages";
import UserExchanges from "./UsersExchanges";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { CurrentUser } from "./Interfaces/CurrentUserInterface";
import Friend from "../friend-components/Friend";
import { FriendInfo } from "../friend-components/Interfaces/FriendInterface";

function UserContainer() {
  const [wasUpdated, setWasUpdated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();

  const [curreuntUserFriends, setCurreuntUserFriends] =
    useState<FriendInfo[]>();

  const handleTextChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCurrentUser((currentUser) => {
        if (!currentUser) return;
        return { ...currentUser, [field]: value };
      });
      setWasUpdated(true);
    };

  const handleFileChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) {
        const newValue = URL.createObjectURL(file);
        setCurrentUser((currentUser) => {
          if (!currentUser) return;
          return { ...currentUser, [field]: newValue };
        });
        setWasUpdated(true);
      }
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          generateUrl("user/get-current-user-profile"),
          {
            withCredentials: true,
          }
        );
        setCurrentUser(data);
        setCurreuntUserFriends(data.friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <UserProfileImages
        avatar={currentUser?.imageUrl}
        backgroundImage={currentUser?.backgroundImageUrl}
        handleAvatarChange={handleFileChange("imageUrl")}
        handleBackgroundChange={handleFileChange("backgroundImageUrl")}
        handleNameChange={handleTextChange("name")}
        name={currentUser?.name}
      />

      {currentUser && (
        <UserProfileCredentials
          adress={currentUser?.address}
          phone={currentUser?.telephone}
          handleAdressChange={handleTextChange("address")}
          handlePhoneChange={handleTextChange("telephone")}
          setWasUpdated={setWasUpdated}
          wasUpdated={wasUpdated}
        />
      )}

      <div className="p-10">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {curreuntUserFriends &&
            curreuntUserFriends?.map((friend) => {
              return (
                <Friend
                  person={friend}
                  key={friend.id}
                  isFriend={true}
                  setNewFriends={setCurreuntUserFriends}
                />
              );
            })}
        </ul>
      </div>

      <div className="w-full mt-4 flex items-center justify-center flex-wrap mb-10">
        <UserExchanges />
      </div>
    </div>
  );
}

export default UserContainer;
