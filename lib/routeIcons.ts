import type { IconType } from "react-icons"
import {
    PiLightbulbDuotone,
    PiSquaresFourDuotone,
    PiStackDuotone,
    PiBrainDuotone,
    PiTrophyDuotone,
} from "react-icons/pi"
import type { SidebarIconName } from "@/lib/sidebarRoutes"

export const routeIcons = {
    lightbulb: PiLightbulbDuotone,
    grid: PiSquaresFourDuotone,
    stack: PiStackDuotone,
    brain: PiBrainDuotone,
    trophy: PiTrophyDuotone,
} satisfies Record<SidebarIconName, IconType>
