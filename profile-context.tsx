import { createContext, useState, useContext, ReactNode } from "react";

interface ProfileContextType {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(
    require("../../colorfulflowers.jpg")
  );

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
