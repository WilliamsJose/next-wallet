import type React from "react"
import { Poppins } from "next/font/google"
import StyledComponentsRegistry from "@/lib/registry"
import { GlobalStyles } from "@/styles/GlobalStyles"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Simple Wallet",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}


import './globals.css'