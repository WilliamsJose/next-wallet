"use client"

import styled from "styled-components"

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
`

export const AuthForm = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background-color: var(--white);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`

export const AuthTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
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
  margin-top: 1rem;
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

export const FormLink = styled.p`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  text-align: center;
  color: var(--gray-600);
  
  a {
    color: var(--primary-color);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
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
