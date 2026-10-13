"use client"

import {
    logoDisplayOrder,
    logoIntervalMs,
    logoRepresentations,
    logoTransition,
    logoVariants,
} from "@/animations/layout/Logo_Variants"
import { useEffect, useState, useSyncExternalStore } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"

const representationClasses =
    "absolute inset-0 flex flex-col items-center justify-center gap-0 text-center"
const formatClasses = {
    ascii: "text-[48px] leading-none",
    binary: "text-[12px] leading-[12px]",
    hexadecimal: "text-[24px] leading-[24px]",
    decimal: "text-[24px] leading-[24px]",
}

const subscribeToHydration = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function Logo() {
    const [index, setIndex] = useState(0)
    const reduceMotion = useReducedMotion()
    const hydrated = useSyncExternalStore(
        subscribeToHydration,
        getClientSnapshot,
        getServerSnapshot,
    )
    const showStaticLogo = hydrated && reduceMotion === true

    useEffect(() => {
        if (!hydrated || reduceMotion !== false) return

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % logoDisplayOrder.length)
        }, logoIntervalMs)

        return () => window.clearInterval(timer)
    }, [hydrated, reduceMotion])

    const format = logoDisplayOrder[showStaticLogo ? 0 : index]
    const representation = logoRepresentations[format]

    return (
        <section>
            <div
                className="mono_font col-span-full inline-flex w-max items-center gap-2"
                aria-label="Bitwise Lab"
                role="img"
            >
                <div
                    className="mono_font relative h-14 w-[4ch] flex-none overflow-hidden text-[12px] font-bold text-[#e6b86d] select-none"
                    aria-hidden="true"
                >
                    {showStaticLogo ? (
                        <span
                            className={`${representationClasses} ${formatClasses[format]}`}
                            aria-hidden="true"
                        >
                            {representation.rows.map((row, rowIndex) => (
                                <span
                                    className="block whitespace-pre"
                                    key={rowIndex}
                                >
                                    {row}
                                </span>
                            ))}
                        </span>
                    ) : (
                        <AnimatePresence initial={false} mode="sync">
                            <motion.span
                                key={format}
                                className={`${representationClasses} ${formatClasses[format]}`}
                                aria-hidden="true"
                                variants={logoVariants}
                                initial="enter"
                                animate="visible"
                                exit="exit"
                                transition={logoTransition}
                            >
                                {representation.rows.map((row, rowIndex) => (
                                    <span
                                        className="block whitespace-pre"
                                        key={rowIndex}
                                    >
                                        {row}
                                    </span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                    )}
                </div>
                <div className="flex shrink-0 flex-col items-start gap-0 whitespace-nowrap">
                    <Heading
                        h6={
                            <>
                                <span className="primary_color">Bitwise</span>{" "}
                                Lab
                            </>
                        }
                        className="whitespace-nowrap"
                    />
                    <Paragraph
                        text={
                            <>
                                Understand numbers.
                                <br />
                                One bit at a time.
                            </>
                        }
                        className="paragraph_tiny whitespace-nowrap"
                    />
                </div>
            </div>
        </section>
    )
}
