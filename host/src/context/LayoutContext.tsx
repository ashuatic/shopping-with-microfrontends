import { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
  isLeftNavOpen: boolean;
  toggleLeftNav: () => void;
  closeLeftNav: () => void;
  openLeftNav: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(true);

  const toggleLeftNav = () => {
    setIsLeftNavOpen(prev => !prev);
  };

  const closeLeftNav = () => {
    setIsLeftNavOpen(false);
  };

  const openLeftNav = () => {
    setIsLeftNavOpen(true);
  };

  return (
    <LayoutContext.Provider value={{ isLeftNavOpen, toggleLeftNav, closeLeftNav, openLeftNav }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}

