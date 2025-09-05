import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import {Noto_Serif_Georgian} from "next/font/google"
import {Footer} from "@/components/footer"
import { Header } from "@/components/header"
const notoSerifGeorgian = Noto_Serif_Georgian({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Roshidoni",
  description: "A basic blog website built with Next.js 15.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={notoSerifGeorgian.className}>
        <Header />
        <div className="md:w-[80vw] max-w-[1200px] mx-auto px-6">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
