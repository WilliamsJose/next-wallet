"use client";

import type React from "react";
import { useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  ErrorMessage,
} from "@/styles/ModalStyles";
import { useUserContext } from "@/app/contexts/UserContext";
import {
  handleDeposit,
  handleRefund,
  handleTransfer,
} from "@/app/actions/userActions";

type TransactionModalProps = {
  type: "deposit" | "transfer" | "refund";
  onClose: () => void;
};

export default function TransactionModal({
  type,
  onClose,
}: TransactionModalProps) {
  const { updateUser, user } = useUserContext();
  const [amount, setAmount] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    try {
      switch (type) {
        case "deposit":
          await handleDeposit(token, user?.id!, amount);
          break;
        case "transfer":
          await handleTransfer(token, recipientId, amount);
          break;
        case "refund":
          await handleRefund(token, transactionId);
          break;
      }

      onClose();
      updateUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case "deposit":
        return "Deposit Funds";
      case "transfer":
        return "Transfer Funds";
      case "refund":
        return "Refund Transaction";
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{getTitle()}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {(type === "deposit" || type === "transfer") && (
            <FormGroup>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <FormInput
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </FormGroup>
          )}

          {type === "transfer" && (
            <FormGroup>
              <FormLabel htmlFor="recipientId">User ID</FormLabel>
              <FormInput
                id="recipientId"
                type="text"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              />
            </FormGroup>
          )}

          {type === "refund" && (
            <FormGroup>
              <FormLabel htmlFor="transactionId">Transaction ID</FormLabel>
              <FormInput
                id="transactionId"
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
              />
            </FormGroup>
          )}

          <FormButton type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm"}
          </FormButton>
        </ModalForm>
      </ModalContainer>
    </ModalOverlay>
  );
}
