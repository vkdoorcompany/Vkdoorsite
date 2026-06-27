import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  pinDialog: boolean;
  setPinDialog: (val: boolean) => void;
  showPinPrompt: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vk_admin') === 'true';
    } catch (e) {
      console.warn("localStorage access denied in iframe:", e);
      return false;
    }
  });
  const [pinDialog, setPinDialog] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('vk_admin', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.warn("localStorage write denied in iframe:", e);
    }
  }, [isAdmin]);

  const showPinPrompt = () => {
    setPinDialog(true);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, pinDialog, setPinDialog, showPinPrompt }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
