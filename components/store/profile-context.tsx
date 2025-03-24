import { createContext, useState, useContext, ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

interface ProfileContextType {
  profileImage: ImageSourcePropType;
  setProfileImage: (image: ImageSourcePropType) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(
    require("../../colorfulflowers.jpg")
  );

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
