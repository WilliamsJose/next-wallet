"use client";

import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--primary-light) 0%,
    var(--primary-color) 100%
  );
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  padding: 3rem;
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const HomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

export const HomeSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
`;

export const HomeButton = styled.div<{ $secondary?: boolean }>`
  display: inline-block;
  width: 100%;
  padding: 0.875rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$secondary ? "transparent" : "var(--primary-color)"};
  color: ${(props) =>
    props.$secondary ? "var(--primary-color)" : "var(--white)"};
  border: ${(props) =>
    props.$secondary ? "2px solid var(--primary-color)" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.$secondary ? "var(--primary-light)" : "var(--primary-dark)"};
    color: ${(props) =>
      props.$secondary ? "var(--primary-dark)" : "var(--white)"};
  }
`;
