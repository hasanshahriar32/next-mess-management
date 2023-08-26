import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import AuthProvider from "./AuthProvider";
import Providers from "./Providers";
import "./globals.css";
import Head from "next/head"; // Import the Head component from Next.js
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Components/theme/theme";

const space_Grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mess Management",
  description: "Your mess management solution at a single tip!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Include Tailwind CSS CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.7/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <body className={space_Grotesk.className}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
