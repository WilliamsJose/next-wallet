"use client"

import styled from "styled-components"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`

export const ModalContainer = styled.div`
  background-color: var(--white);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
`

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-800);
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--gray-500);
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--gray-700);
  }
`

export const ModalForm = styled.form`
  padding: 1.5rem;
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
`

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-light);
  }
`

export const FormButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--white);
  background-color: var(--primary-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--gray-400);
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: var(--error);
  background-color: rgba(220, 53, 69, 0.1);
  border-radius: 8px;
  border-left: 3px solid var(--error);
`
