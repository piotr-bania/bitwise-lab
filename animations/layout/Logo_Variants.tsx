import type { Transition, Variants } from "motion/react"

export type LogoFormat = "ascii" | "binary" | "hexadecimal" | "decimal"

type LogoRepresentation = {
    label: string
    rows: readonly string[]
}

export const logoRepresentations = {
    ascii: { label: "ASCII", rows: ["BL"] },
    binary: { label: "Binary", rows: ["0100", "0010", "0100", "1100"] },
    hexadecimal: { label: "Hexadecimal", rows: ["42", "4C"] },
    decimal: { label: "Decimal", rows: ["66", "76"] },
} as const satisfies Record<LogoFormat, LogoRepresentation>

export const logoDisplayOrder: readonly LogoFormat[] = [
    // "ascii", // Temporarily disabled.
    "binary",
    "hexadecimal",
    "decimal",
]

export const logoIntervalMs = 5000

export const logoTransition: Transition = {
    duration: 2,
    ease: [0.43, 0.13, 0.23, 0.96],
}

export const logoVariants: Variants = {
    enter: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
}
