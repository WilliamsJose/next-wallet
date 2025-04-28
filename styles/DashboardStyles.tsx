"use client"

import styled from "styled-components"

export const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const DashboardTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--gray-800);
`

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  background-color: var(--gray-200);
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--gray-300);
  }
`

export const BalanceCard = styled.div`
  padding: 2rem;
  background-color: var(--primary-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
`

export const BalanceLabel = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
`

export const BalanceAmount = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--white);
`

export const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const ActionButton = styled.button`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  background-color: var(--white);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }
`

export const TransactionList = styled.div`
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--gray-800);
    margin-bottom: 1rem;
  }
`

export const TransactionItem = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  
  &:last-child {
    border-bottom: none;
  }
  
  background-color: ${(props) => {
    switch (props.type) {
      case "deposit":
        return "rgba(32, 224, 77, 0.534)"
      case "transfer":
        return "rgba(255, 193, 7, 0.05)"
      case "refund":
        return "rgba(23, 162, 184, 0.05)"
      default:
        return "transparent"
    }
  }};
`

export const TransactionAmount = styled.div<{ type: string }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => {
    switch (props.type) {
      case "deposit":
        return "var(--success)"
      case "transfer":
        return props.children && props.children.toString().includes("-") ? "var(--error)" : "var(--warning)"
      case "refund":
        return "var(--info)"
      default:
        return "var(--gray-700)"
    }
  }};
`

export const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  div {
    font-weight: 500;
    color: var(--gray-700);
  }
`

export const TransactionDate = styled.span`
  font-size: 0.75rem;
  color: var(--gray-500);
`

export const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--gray-500);
  font-size: 1rem;
`
