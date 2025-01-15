import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SelectedAuthorsContextType {
  selectedAuthors: string[];
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectedAuthorsContext = createContext<
  SelectedAuthorsContextType | undefined
>(undefined);

export const SelectedAuthorsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  useEffect(() => {
    const authorsFromUrl = new URLSearchParams(window.location.search).get(
      "authors"
    );
    if (authorsFromUrl) {
      setSelectedAuthors(authorsFromUrl.split(","));
    }
  }, []);

  return (
    <SelectedAuthorsContext.Provider
      value={{ selectedAuthors, setSelectedAuthors }}
    >
      {children}
    </SelectedAuthorsContext.Provider>
  );
};

export const useSelectedAuthors = (): SelectedAuthorsContextType => {
  const context = useContext(SelectedAuthorsContext);
  if (!context) {
    throw new Error(
      "useSelectedAuthors must be used within a SelectedAuthorsProvider"
    );
  }
  return context;
};
