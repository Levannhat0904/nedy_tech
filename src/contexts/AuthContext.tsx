import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils";

interface AuthContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const storedToken = await getAccessToken();
      if (storedToken) {
        setAccessTokenState(storedToken);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    fetchAccessToken();
  }, []);

  const login = (token: string) => {
    setAccessTokenState(token);
    setAccessToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setAccessTokenState("");
    removeAccessToken();
    setIsLoggedIn(false);
  };

  const value = {
    accessToken,
    setAccessToken: setAccessTokenState,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
