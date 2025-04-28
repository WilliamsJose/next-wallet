"use client"

import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #7FD1AE;
    --primary-dark: #5CB894;
    --primary-light: #A8E4C9;
    --white: #FFFFFF;
    --gray-100: #F8F9FA;
    --gray-200: #E9ECEF;
    --gray-300: #DEE2E6;
    --gray-400: #CED4DA;
    --gray-500: #ADB5BD;
    --gray-600: #6C757D;
    --gray-700: #495057;
    --gray-800: #343A40;
    --gray-900: #212529;
    --error: #DC3545;
    --success: #28A745;
    --warning: #FFC107;
    --info: #17A2B8;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Poppins', sans-serif;
    background-color: var(--gray-100);
    color: var(--gray-800);
  }

  a {
    color: var(--primary-dark);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }

  button {
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
  }

  input, button {
    font-size: 16px;
  }
`
