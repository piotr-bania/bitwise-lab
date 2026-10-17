import type { ComponentPropsWithoutRef, ReactNode } from "react"

export type CardProps = Omit<ComponentPropsWithoutRef<"div">, "title"> & {
    title?: ReactNode
    description?: ReactNode
    icon?: ReactNode
    actions?: ReactNode
    variant?: "default" | "gold"
    padding?: "none" | "compact" | "normal"
}

const paddingClasses = { none: "p-0", compact: "p-4", normal: "p-5 sm:p-6" }

export default function Card({
    title,
    description,
    icon,
    actions,
    variant = "default",
    padding = "normal",
    className = "",
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={`card min-w-0 rounded-xl ${variant === "gold" ? "card--gold" : ""} ${paddingClasses[padding]} ${className}`}
            {...props}
        >
            {(title || description || icon || actions) && (
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                        {icon && (
                            <span
                                className="mt-1 shrink-0 text-[var(--primary_color)]"
                                aria-hidden="true"
                            >
                                {icon}
                            </span>
                        )}
                        <div>
                            {title && (
                                <h2 className="text-3xl font-semibold text-[var(--heading_color)]">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-[var(--paragraph_color)]">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                    {actions}
                </div>
            )}
            {children}
        </div>
    )
}
