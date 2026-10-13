import "./globals.css"
import "./globals.scss"

import type { Metadata } from "next"

import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google"

import Logo from "@/components/layout/Logo"

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
})

const siteName = "Bitwise Lab"
const siteDescription =
    "Understand numbers. One bit at a time. Learn binary, decimal and hexadecimal conversions through interactive, step-by-step explanations, visualisations and network packet inspection."

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
        default: "Bitwise Lab | Understand Numbers",
        template: "%s | Bitwise Lab",
    },
    description: siteDescription,
    applicationName: siteName,
    keywords: [
        "Bitwise Lab",
        "binary converter",
        "decimal to binary",
        "binary to decimal",
        "decimal to hexadecimal",
        "hexadecimal to decimal",
        "binary to hexadecimal",
        "hexadecimal to binary",
        "number systems",
        "computer science",
        "cybersecurity education",
        "packet byte inspector",
        "network packet analysis",
        "Wireshark",
        "interactive learning",
    ],
    authors: [{ name: "Bespoke Programming" }],
    creator: "Bespoke Programming",
    publisher: "Bespoke Programming",
    category: "education",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_GB",
        siteName,
        title: "Bitwise Lab | Understand Numbers",
        description: siteDescription,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Bitwise Lab — Interactive Number Systems Learning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Bitwise Lab | Understand Numbers",
        description: siteDescription,
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en-GB" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={[
                    cormorant.variable,
                    inter.variable,
                    jetbrainsMono.variable,
                ].join(" ")}
            >
                <Logo />
                {children}
            </body>
        </html>
    )
}
