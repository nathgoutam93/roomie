import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type user = Models.Document & {
  name: string;
  age: number;
  gender: string;
  profile_pic_url: any;
  bio: string;
  interests: string[];
  location_latitude: number;
  location_longitude: number;
  education: string[];
  work: string[];
  languages: string[];
  lifestyle_preferences: string[];
  smoking: string;
  drinking: string;
  pets: string;
  relationship: string;
  religion: string;
  budget: number;
  preferred_age_min: number;
  preferred_age_max: number;
  preferred_gender: string[];
  preferred_location_range: number;
  built_profile: boolean;
};

import AppwriteService, { appwrite } from "../lib/appwrite";
import { Models } from "appwrite";

type AppwriteContextType = {
  isLoading: boolean;
  user: user | undefined;
  setUser: (user: user) => void;
  session: Models.Session | undefined;
  setSession: (session: Models.Session | undefined) => void;
  appwrite: AppwriteService;
};

const AppwriteContext = React.createContext<AppwriteContextType>(
  {} as AppwriteContextType
);

export const useAppwrite = () => {
  return useContext(AppwriteContext);
};

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Models.Session>();
  const [user, setUser] = useState<user>();

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await appwrite.getUser(session?.userId as string);
      setUser(user as user);
      console.log(user);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [session]);

  useEffect(() => {
    setIsLoading(true);
    appwrite
      .getCurrentSession()
      .then((response) => {
        setSession(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const value = {
    isLoading,
    session,
    setSession,
    user,
    setUser,
    appwrite,
  };

  return (
    <AppwriteContext.Provider value={value}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;
