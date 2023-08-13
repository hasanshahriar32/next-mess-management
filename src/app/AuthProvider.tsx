"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
