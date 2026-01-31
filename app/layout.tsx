import type { Metadata } from "next"
import { Poppins, Roboto } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "CV Interactivo - Francisco Moraga | Contador Público",
  description: "Especialista en implementación de normativas internacionales IFRS, gestión financiera corporativa y transformación digital con más de 25 años de experiencia.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
