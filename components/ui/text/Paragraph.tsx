"use client"

import { motion as m } from "motion/react"
import type { ReactNode } from "react"
import { paragraph_variant } from "@/animations/ui/text/Text_Variants"

type ParagraphProps = {
    className?: string
    text: ReactNode
}

const Paragraph = ({ className, text }: ParagraphProps) => {
    return (
        <div className={className}>
            <m.p
                initial="hidden"
                animate="visible"
                variants={paragraph_variant}
                className={className}
            >
                {text}
            </m.p>
        </div>
    )
}

export default Paragraph
