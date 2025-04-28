"use server";

export async function handleDeposit(
  token: string,
  userId: string,
  amount: string
) {
  const response = await fetch("http://localhost:3000/transactions/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toUserID: userId, amount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to deposit funds");
  }

  return await response.json();
}

export async function handleTransfer(
  token: string,
  recipientId: string,
  amount: string
) {
  const response = await fetch("http://localhost:3000/transactions/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ toUserID: recipientId, amount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to transfer funds");
  }

  return await response.json();
}

export async function handleRefund(token: string, transactionId: string) {
  const response = await fetch("http://localhost:3000/transactions/refund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ transactionID: transactionId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to refund transaction");
  }

  return await response.json();
}

export async function fetchUserBalance(token: string) {
  const response = await fetch("http://localhost:3000/bank/balance", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user balance");
  }

  const data = await response.json();
  return data.balance;
}

export async function fetchUserTransactions(token: string) {
  const response = await fetch("http://localhost:3000/transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user transactions");
  }

  const data = await response.json();
  return data.map((transaction: any) => ({
    ...transaction,
    date: new Date(transaction.createdAt).toISOString(),
  }));
}
