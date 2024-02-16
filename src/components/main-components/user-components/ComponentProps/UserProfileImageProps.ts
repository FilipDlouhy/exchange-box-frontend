import React from "react";

export interface UserProfileImageProps {
  avatar: string | null | undefined;
  backgroundImage: string | null | undefined;
  handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackgroundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string | undefined;
}
