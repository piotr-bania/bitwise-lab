import type { Variants } from "motion/react"

export const sidebarButtonVariants: Variants = {
    hidden: { opacity: 0, x: -6 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    hovered: { x: 2, transition: { duration: 0.18 } },
    pressed: { scale: 0.98, transition: { duration: 0.1 } },
}
