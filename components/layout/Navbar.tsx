import Link from "next/link"
import Logo from "@/components/layout/Logo"

export default function Navbar() {
    return (
        <header>
            <nav aria-label="Main navigation">
                <Link href="/" aria-label="Bitwise Lab home" className="block">
                    <Logo />
                </Link>
            </nav>
        </header>
    )
}
