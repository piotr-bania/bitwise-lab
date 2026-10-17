import type { ComponentPropsWithoutRef } from "react"

export type BadgeProps = ComponentPropsWithoutRef<"span">

export default function Badge({
    className = "",
    children,
    ...props
}: BadgeProps) {
    return (
        <span {...props} className={`badge tag ${className}`}>
            {children}
        </span>
    )
}
