import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { IAsset, IAuthor, ISector } from "../interfaces";
import { getSectors } from "../api/sector";
import { getUserInfo } from "../api/author";
import { getAssets } from "../api/asset";

interface AuthorsContextType {
  authors?: IAuthor[];
  setAuthors: React.Dispatch<React.SetStateAction<IAuthor[]>>;
  sectors?: IAuthor[];
  setSectors: React.Dispatch<React.SetStateAction<ISector[]>>;
  assets?: IAuthor[];
  setAssets: React.Dispatch<React.SetStateAction<ISector[]>>;
}

const AuthorsContext = createContext<AuthorsContextType | undefined>(undefined);

export const AuthorsProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [sectors, setSectors] = useState<ISector[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);

  // Hàm gọi API lấy danh sách tác giả
  const fetchSectors = async () => {
    try {
      const response = await getSectors();
      setSectors(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sector:", error);
    }
  };
  const fetchAuthors = async () => {
    try {
      const response = await getUserInfo();
      setAuthors(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tác giả:", error);
    }
  };
  const fetchAssets = async () => {
    try {
      const response = await getAssets();
      setAssets(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu assets:", error);
    }
  };
  useEffect(() => {
    fetchAuthors();
    fetchSectors();
    fetchAssets();
  }, []);

  return (
    <AuthorsContext.Provider
      value={{ setAssets, assets, authors, setAuthors, sectors, setSectors }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};

export const useAuthors = (): AuthorsContextType => {
  const context = useContext(AuthorsContext);
  if (!context) {
    throw new Error("useAuthors must be used within an AuthorsProvider");
  }
  return context;
};
