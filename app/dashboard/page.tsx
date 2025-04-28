"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  LogoutButton,
  BalanceCard,
  BalanceAmount,
  BalanceLabel,
  ActionButtons,
  ActionButton,
  TransactionList,
  TransactionItem,
  TransactionAmount,
  TransactionDate,
  TransactionDetails,
  EmptyState,
} from "@/styles/DashboardStyles";
import TransactionModal from "@/components/TransactionModal";
import { Transaction } from "../domains/entities/ITransaction";
import { User } from "../domains/entities/IUser";

export default function Dashboard() {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    balance: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [modalType, setModalType] = useState<
    "deposit" | "transfer" | "refund" | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/auth/signin");
      return;
    }

    setUser(JSON.parse(userData));

    fetchUserBalance();
    fetchUserTransactions();
  }, [router]);

  const fetchUserBalance = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/bank/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      response.json().then((data) => {
        setUser((prev) => {
          if (prev) {
            return { ...prev, balance: data.balance };
          }
          return prev;
        });
      });
    });
  };

  const fetchUserTransactions = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      response.json().then((data) => {
        const mappedTransactions = data.map((transaction: any) => ({
          ...transaction,
          date: new Date(transaction.createdAt).toISOString(),
        }));
        setTransactions(mappedTransactions);
      });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/signin");
  };

  const handleTransaction = (type: "deposit" | "transfer" | "refund") => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (!user) {
    return <EmptyState>Loading...</EmptyState>;
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Hello, {user.username}</DashboardTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </DashboardHeader>

      <BalanceCard>
        <BalanceLabel>Your Balance</BalanceLabel>
        <BalanceAmount>
          {user.balance !== null
            ? `R$${Number(user.balance).toFixed(2)}`
            : "Loading..."}
        </BalanceAmount>
      </BalanceCard>

      <ActionButtons>
        <ActionButton onClick={() => handleTransaction("deposit")}>
          Deposit
        </ActionButton>
        <ActionButton onClick={() => handleTransaction("transfer")}>
          Transfer
        </ActionButton>
        <ActionButton onClick={() => handleTransaction("refund")}>
          Refund
        </ActionButton>
      </ActionButtons>

      <TransactionList>
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <EmptyState>No transactions yet</EmptyState>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} type={transaction.type}>
              <TransactionAmount type={transaction.type}>
                {transaction.type === "transfer" && transaction.amount < 0
                  ? "-"
                  : "+"}
                ${Math.abs(transaction.amount).toFixed(2)}
              </TransactionAmount>
              <TransactionDetails>
                <div>
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </div>
                <TransactionDate>
                  {formatDate(transaction.date)}
                </TransactionDate>
              </TransactionDetails>
            </TransactionItem>
          ))
        )}
      </TransactionList>

      {modalType && (
        <TransactionModal
          type={modalType}
          fetchUserTransactions={fetchUserTransactions}
          fetchUserBalance={fetchUserBalance}
          onClose={closeModal}
          userId={user.id}
        />
      )}
    </DashboardContainer>
  );
}
