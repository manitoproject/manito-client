import { createContext, useContext } from 'react';

interface ModalContextType {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
