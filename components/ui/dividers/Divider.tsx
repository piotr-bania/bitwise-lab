"use client"

import type { ComponentPropsWithoutRef } from "react"

import {
    dividerTransition,
    dividerVariants,
    type DividerOrientation,
} from "@/animations/ui/divider/Divider_Variants"
import { motion as m, useReducedMotion } from "motion/react"

export type DividerProps = Pick<
    ComponentPropsWithoutRef<"div">,
    "id" | "className" | "aria-label"
> & {
    orientation?: DividerOrientation
    animated?: boolean
    tone?: "subtle" | "gold"
}

export default function Divider({
    orientation = "horizontal",
    animated = true,
    tone = "subtle",
    className = "",
    ...props
}: DividerProps) {
    const reduceMotion = useReducedMotion()

    return (
        <m.div
            role="separator"
            aria-orientation={orientation}
            className={`shrink-0 ${orientation === "horizontal" ? "h-px w-full origin-left" : "min-h-6 w-px self-stretch origin-top"} ${tone === "gold" ? "bg-[var(--primary_color)]/50" : "bg-[var(--border_color)]/60"} ${className}`}
            variants={dividerVariants[orientation]}
            initial={animated ? "hidden" : false}
            whileInView="visible"
            viewport={{ once: true }}
            transition={
                reduceMotion || !animated ? { duration: 0 } : dividerTransition
            }
            {...props}
        />
    )
}
