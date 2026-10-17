"use client"

import { PiCaretRightDuotone } from "react-icons/pi"
import type { ComponentProps, ReactNode } from "react"
import { motion as m, useReducedMotion } from "motion/react"
import { sidebarButtonVariants } from "@/animations/ui/buttons/Sidebar_Button_Variants"

import Link from "next/link"

export type SidebarButtonProps = Omit<
    ComponentProps<typeof Link>,
    "children"
> & {
    label: string
    icon?: ReactNode
    badge?: string
    state?: "normal" | "hovered" | "active"
    showChevron?: boolean
    isDisabled?: boolean
}

export default function Sidebar_Button({
    label,
    icon,
    badge,
    state = "normal",
    showChevron = false,
    isDisabled = false,
    className = "",
    ...props
}: SidebarButtonProps) {
    const reducedMotion = useReducedMotion()
    const active = !isDisabled && state === "active"
    const highlighted = !isDisabled && (active || state === "hovered")

    const buttonClassName = `button sidebar_button ${isDisabled ? "disabled" : active ? "sidebar_button--active" : highlighted ? "sidebar_button--hovered" : ""} ${className}`
    const content = (
        <>
            {badge ? (
                <span aria-hidden="true" className="sidebar_button_badge">
                    {badge}
                </span>
            ) : icon ? (
                <span className="sidebar_button_icon" aria-hidden="true">
                    {icon}
                </span>
            ) : null}
            <span className="sidebar_button_label">{label}</span>
            {showChevron && (
                <PiCaretRightDuotone
                    size={16}
                    className="sidebar_button_chevron"
                    aria-hidden="true"
                />
            )}
        </>
    )

    return (
        <m.div
            className="sidebar_button_wrapper"
            variants={sidebarButtonVariants}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
        >
            {isDisabled ? (
                <span
                    role="link"
                    aria-disabled="true"
                    className={buttonClassName}
                    data-state="disabled"
                >
                    {content}
                </span>
            ) : (
                <Link
                    {...props}
                    aria-current={active ? "page" : undefined}
                    data-state={state}
                    className={buttonClassName}
                >
                    {content}
                </Link>
            )}
        </m.div>
    )
}
