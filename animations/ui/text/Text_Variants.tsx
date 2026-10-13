import type { Variants } from "motion/react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const createHeadingVariant = (duration = 0.52, delay = 0): Variants => ({
    hidden: {
        opacity: 0,
        y: 6,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration,
            ease,
            delay,
        },
    },
})

export const heading_1_variant = createHeadingVariant(0.52, 0)

export const heading_2_variant = createHeadingVariant(0.48, 0.04)

export const heading_3_variant = createHeadingVariant(0.48, 0.08)

export const heading_4_variant = createHeadingVariant(0.44, 0.12)

export const heading_5_variant = createHeadingVariant(0.4, 0.16)

export const heading_6_variant = createHeadingVariant(0.36, 0.2)

export const paragraph_variant: Variants = {
    hidden: {
        opacity: 0,
        y: 4,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.44,
            ease,
            delay: 0.24,
        },
    },
}

export const button_variant: Variants = {
    hidden: {
        opacity: 0,
        y: 4,
        scale: 0.985,
    },

    visible: {
        opacity: 1,
        y: 0,
        scale: 1,

        transition: {
            duration: 0.4,
            ease,
            delay: 0.12,
        },
    },
}

export const headingVariantsByLevel = {
    h1: heading_1_variant,
    h2: heading_2_variant,
    h3: heading_3_variant,
    h4: heading_4_variant,
    h5: heading_5_variant,
    h6: heading_6_variant,
}
