"use client"

import { motion as m } from "motion/react"
import type { ReactNode } from "react"
import { headingVariantsByLevel } from "@/animations/ui/text/Text_Variants"

const headingTags = {
    h1: m.h1,
    h2: m.h2,
    h3: m.h3,
    h4: m.h4,
    h5: m.h5,
    h6: m.h6,
}

type HeadingLevel = keyof typeof headingTags
type HeadingProps = {
    className?: string
} & Partial<Record<HeadingLevel | `${HeadingLevel}text`, ReactNode>>

const Heading = ({ className, ...rest }: HeadingProps) => {
    return (
        <div className={className}>
            {Object.entries(rest).map(([key, text]) => {
                if (!text) return null

                const normalizedLevel = key.toLowerCase().replace("text", "")
                const level: HeadingLevel =
                    normalizedLevel in headingTags
                        ? (normalizedLevel as HeadingLevel)
                        : "h2"
                const Tag = headingTags[level]
                const variant = headingVariantsByLevel[level]

                return (
                    <Tag
                        key={level}
                        initial="hidden"
                        animate="visible"
                        variants={variant}
                        className={className}
                    >
                        {text}
                    </Tag>
                )
            })}
        </div>
    )
}

export default Heading
