import { useState } from "react";

import UserProfileCredentials from "./UserProfileCredentials";
import UserProfileImages from "./UserProfileImages";
import UserExchanges from "./UsersExchanges";

const initialProfile = {
  name: "Ricardo Cooper",
  email: "ricardo.cooper@example.com",
  avatar:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function UserContainer() {
  const [profile, setProfile] = useState(initialProfile);
  const [wasUpdated, setWasUpdated] = useState<boolean>(false);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWasUpdated(true);
      const newAvatarUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: newAvatarUrl });
    }
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWasUpdated(true);
      const newBackgroundUrl = URL.createObjectURL(file);
      setProfile({ ...profile, backgroundImage: newBackgroundUrl });
    }
  };

  const [name, setName] = useState(profile.name);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <UserProfileImages
        avatar={profile.avatar}
        backgroundImage={profile.backgroundImage}
        handleAvatarChange={handleAvatarChange}
        handleBackgroundChange={handleBackgroundChange}
        handleNameChange={handleNameChange}
        name={profile.name}
      />
      <UserProfileCredentials
        setWasUpdated={setWasUpdated}
        wasUpdated={wasUpdated}
      />

      <div className="w-full mt-4 flex items-center justify-center flex-wrap mb-10">
        <UserExchanges />
      </div>
    </div>
  );
}

export default UserContainer;
