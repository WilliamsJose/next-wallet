"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  AuthContainer,
  AuthForm,
  AuthTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormButton,
  FormLink,
  ErrorMessage,
} from "@/styles/AuthStyles"
import { decodeToken } from "react-jwt"

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in")
      }

      const decoded: {sub: string, username: string} = decodeToken(data.accessToken)!

      localStorage.setItem("token", data.accessToken)
      localStorage.setItem("user", JSON.stringify({
        id: decoded?.sub,
        username: decoded?.username
      }))

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContainer>
      <AuthForm onSubmit={handleSubmit}>
        <AuthTitle>Sign In</AuthTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormButton type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </FormButton>

        <FormLink>
          Don't have an account? <Link href="/auth/signup">Create Account</Link>
        </FormLink>
      </AuthForm>
    </AuthContainer>
  )
}
