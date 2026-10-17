import type { SidebarRoute } from "@/lib/sidebarRoutes"
import { routeIcons } from "@/lib/routeIcons"

export default function Route_Icon({
    route,
}: {
    route: Pick<SidebarRoute, "badge" | "icon">
}) {
    if (route.badge) {
        return (
            <span
                aria-hidden="true"
                className="mono_font flex h-8 min-w-8 items-center justify-center rounded-md bg-[var(--primary_color)] px-1 text-xs font-semibold text-[var(--background_color)]"
            >
                {route.badge}
            </span>
        )
    }

    const Icon = route.icon ? routeIcons[route.icon] : undefined
    return Icon ? <Icon size={32} aria-hidden="true" /> : null
}
