"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { User } from "../domains/entities/IUser";
import { Transaction } from "../domains/entities/ITransaction";
import {
  fetchUserBalance,
  fetchUserTransactions,
} from "../actions/userActions";

interface UserContextType {
  user: User | null;
  transactions: Transaction[];
  updateUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const updateUser = async () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      return;
    }

    setUser(JSON.parse(userData));

    try {
      const balance = await fetchUserBalance(token);
      const userTransactions = await fetchUserTransactions(token);

      setUser((prev) => (prev ? { ...prev, balance } : null));
      setTransactions(userTransactions);
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, transactions, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
