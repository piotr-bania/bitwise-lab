import type { Transition, Variants } from "motion/react"

export type DividerOrientation = "horizontal" | "vertical"

export const dividerTransition: Transition = {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
}

export const dividerVariants: Record<DividerOrientation, Variants> = {
    horizontal: {
        hidden: { opacity: 0, scaleX: 0 },
        visible: { opacity: 1, scaleX: 1 },
    },
    vertical: {
        hidden: { opacity: 0, scaleY: 0 },
        visible: { opacity: 1, scaleY: 1 },
    },
}
