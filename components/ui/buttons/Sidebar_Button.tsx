"use client"

import Link from "next/link"
import { motion as m, useReducedMotion } from "motion/react"
import type { ComponentProps, ReactNode } from "react"
import { PiCaretRightDuotone } from "react-icons/pi"
import { sidebarButtonVariants } from "@/animations/ui/buttons/Sidebar_Button_Variants"

export type SidebarButtonProps = Omit<
    ComponentProps<typeof Link>,
    "children"
> & {
    label: string
    icon?: ReactNode
    badge?: string
    state?: "normal" | "hovered" | "active"
    showChevron?: boolean
}

export default function Sidebar_Button({
    label,
    icon,
    badge,
    state = "normal",
    showChevron = false,
    className = "",
    ...props
}: SidebarButtonProps) {
    const reducedMotion = useReducedMotion()
    const active = state === "active"
    const highlighted = active || state === "hovered"

    return (
        <m.div
            className="w-full"
            variants={sidebarButtonVariants}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            whileHover={reducedMotion ? undefined : "hovered"}
            whileTap={reducedMotion ? undefined : "pressed"}
        >
            <Link
                {...props}
                aria-current={active ? "page" : undefined}
                data-state={state}
                className={`group flex min-h-12 !w-full items-center gap-3 rounded-lg border px-3 py-2.5 !font-[family-name:var(--font-body)] !text-[13px] !normal-case transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary_color)] ${active ? "border-[var(--primary_color)] bg-gradient-to-r from-[var(--primary_color)]/25 to-[var(--primary_color)]/10 !text-[var(--heading_color)] shadow-[inset_0_0_16px_#e6b86d0d]" : highlighted ? "border-[var(--border_color)] bg-[var(--foreground_color)] !text-[var(--heading_color)]" : "border-transparent !text-[var(--paragraph_color)] hover:border-[var(--border_color)] hover:bg-[var(--foreground_color)] hover:!text-[var(--heading_color)]"} ${className}`}
            >
                {badge ? (
                    <span
                        aria-hidden="true"
                        className={`mono_font flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[12px] font-semibold ${active ? "bg-[var(--primary_color)] text-[var(--background_color)]" : "bg-[var(--paragraph_color)]/70 text-[var(--background_color)]"}`}
                    >
                        {badge}
                    </span>
                ) : icon ? (
                    <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center ${highlighted ? "text-[var(--primary_color)]" : "text-[var(--paragraph_color)]"}`}
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                ) : null}
                <span className="min-w-0 flex-1 leading-5">{label}</span>
                {showChevron && (
                    <PiCaretRightDuotone
                        size={16}
                        className="shrink-0"
                        aria-hidden="true"
                    />
                )}
            </Link>
        </m.div>
    )
}
