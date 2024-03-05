import { useEffect, useState } from "react";
import UserProfileCredentials from "./UserProfileCredentials";
import UserProfileImages from "./UserProfileImages";
import UserExchanges from "./UsersExchanges";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { CurrentUser } from "./Interfaces/CurrentUserInterface";
import Friend from "../../common-components/common-user-profile-components/Friend";
import { FriendInfo } from "../friend-components/Interfaces/FriendInterface";
import LocationMap from "../../common-components/LocationMap";
import ChangePassword from "./ChangePassword";

function UserContainer() {
  const [wasUpdated, setWasUpdated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();
  const [open, setOpen] = useState(false);
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
        const fileURL = URL.createObjectURL(file);
        const modifiedFile = new File([file], field + ".jpg", {
          type: file.type,
        });
        setCurrentUser((currentUser) => {
          if (!currentUser) return;

          return {
            ...currentUser,
            [field]: fileURL,
            [field + "File"]: modifiedFile,
          };
        });
        setWasUpdated(true);
      }
    };

  const updateUserData = async () => {
    if (!currentUser) {
      console.error("No current user data available for update.");
      return;
    }

    let formData = new FormData();

    formData.append("id", currentUser.id.toString());
    formData.append("name", currentUser.name);
    formData.append("email", currentUser.email);

    const optionalFields = [
      { key: "images", value: currentUser.imageUrlFile },
      { key: "images", value: currentUser.backgroundImageUrlFile },
      { key: "address", value: currentUser.address },
      { key: "telephone", value: currentUser.telephone },
      { key: "longitude", value: currentUser.longitude?.toString() },
      { key: "latitude", value: currentUser.latitude?.toString() },
    ];

    optionalFields.forEach(({ key, value }) => {
      if (value) formData.append(key, value);
    });

    try {
      await axios.post(generateUrl("user/update-curent-user"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setWasUpdated(false);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleCoordinatesChange = (lat: any, lng: any) => {
    setCurrentUser((currentUser) => {
      if (!currentUser) return;
      return { ...currentUser, longitude: lng, latitude: lat };
    });

    setWasUpdated(true);
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
          setOpen={setOpen}
          updateUserData={updateUserData}
          adress={currentUser?.address}
          phone={currentUser?.telephone}
          handleAdressChange={handleTextChange("address")}
          handlePhoneChange={handleTextChange("telephone")}
          setWasUpdated={setWasUpdated}
          wasUpdated={wasUpdated}
        />
      )}

      {currentUser && (
        <LocationMap
          position={[currentUser?.latitude, currentUser?.longitude]}
          handleCoordinatesChange={handleCoordinatesChange}
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
                  isFromUserProfile={true}
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

      <ChangePassword open={open} setOpen={setOpen} />
    </div>
  );
}

export default UserContainer;
