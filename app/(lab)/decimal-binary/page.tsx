import { sidebarRoutes } from "@/lib/sidebarRoutes"

import Link from "next/link"
import Card from "@/components/ui/cards/Card"

export default function Decimal_Binary_Page() {
    const route = sidebarRoutes[0].routes[0]

    return (
        <Card title={route.label} description={route.description}>
            <div className="flex flex-col gap-1">
                <Link href="/" className="button button--ghost">
                    Go back to the homepage
                </Link>
            </div>
        </Card>
    )
}
