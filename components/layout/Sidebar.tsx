"use client"

import {
    sidebarRoutes,
    type SidebarCategory,
    type SidebarIconName,
} from "@/lib/sidebarRoutes"
import {
    PiLightbulbDuotone,
    PiSquaresFourDuotone,
    PiStackDuotone,
    PiBrainDuotone,
    PiTrophyDuotone,
} from "react-icons/pi"
import { useId } from "react"
import { usePathname } from "next/navigation"

import Heading from "@/components/ui/text/Heading"
import Divider from "@/components/ui/dividers/Divider"
import Sidebar_Button from "@/components/ui/buttons/Sidebar_Button"

const icons = {
    lightbulb: PiLightbulbDuotone,
    grid: PiSquaresFourDuotone,
    stack: PiStackDuotone,
    brain: PiBrainDuotone,
    trophy: PiTrophyDuotone,
} satisfies Record<SidebarIconName, unknown>

export type SidebarProps = {
    categories?: readonly SidebarCategory[]
    activeHref?: string
    label?: string
    className?: string
}

export default function Sidebar({
    categories = sidebarRoutes,
    activeHref,
    label = "Number systems navigation",
    className = "",
}: SidebarProps) {
    const pathname = usePathname()
    const headingId = useId()
    const currentHref = activeHref ?? pathname

    return (
        <aside
            className={`w-full shrink-0 lg:sticky lg:top-0 lg:max-h-screen lg:w-[276px] lg:overflow-y-auto ${className}`}
        >
            <nav aria-label={label} className="px-4 py-5">
                {categories.map((category, index) => (
                    <div key={category.id}>
                        {index > 0 && <Divider className="my-5" />}
                        <div id={`${headingId}-${category.id}`}>
                            <Heading
                                h2={category.heading}
                                className="mb-2 px-2 !font-[family-name:var(--font-body)] !text-sm !font-medium !leading-6 !text-[var(--paragraph_color)]"
                            />
                        </div>
                        <ul
                            aria-labelledby={`${headingId}-${category.id}`}
                            className="flex flex-col gap-1.5"
                        >
                            {category.routes.map((route) => {
                                const Icon = route.icon
                                    ? icons[route.icon]
                                    : undefined
                                return (
                                    <li key={route.id}>
                                        <Sidebar_Button
                                            href={route.href}
                                            label={route.label}
                                            badge={route.badge}
                                            icon={Icon && <Icon size={24} />}
                                            state={
                                                currentHref === route.href
                                                    ? "active"
                                                    : "normal"
                                            }
                                            showChevron={Boolean(route.badge)}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    )
}
