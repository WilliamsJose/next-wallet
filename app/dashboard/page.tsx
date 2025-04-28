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
import { useUserContext } from "../contexts/UserContext";

export default function Dashboard() {
  const { user, transactions, updateUser } = useUserContext();
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
  }, [router]);

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
          {user.balance ? `R$${Number(user.balance).toFixed(2)}` : "Loading..."}
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

      {modalType && <TransactionModal type={modalType} onClose={closeModal} />}
    </DashboardContainer>
  );
}
