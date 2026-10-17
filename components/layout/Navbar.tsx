import Link from "next/link"
import Logo from "@/components/layout/Logo"
import Menu from "@/components/layout/Menu"
import Sidebar from "@/components/layout/Sidebar"

export default function Navbar() {
    return (
        <header className="navbar">
            <nav aria-label="Main navigation" className="navbar_content">
                <Link href="/" aria-label="Bitwise Lab home" className="block">
                    <Logo />
                </Link>
                <Menu>
                    <Sidebar className="menu_sidebar" />
                </Menu>
            </nav>
        </header>
    )
}
