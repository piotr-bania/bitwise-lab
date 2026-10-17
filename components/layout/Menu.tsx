"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import {
    AnimatePresence,
    motion,
    useIsPresent,
    useReducedMotion,
} from "motion/react"
import { PiListDuotone, PiXDuotone } from "react-icons/pi"

function MenuPanel({
    id,
    children,
    reduceMotion,
}: {
    id: string
    children: ReactNode
    reduceMotion: boolean
}) {
    const present = useIsPresent()
    return (
        <motion.div
            id={id}
            className="menu_panel"
            inert={!present}
            aria-hidden={!present}
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}

export default function Menu({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const id = useId()
    const container = useRef<HTMLDivElement>(null)
    const button = useRef<HTMLButtonElement>(null)
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        if (!open) return
        const scrollX = window.scrollX
        const scrollY = window.scrollY
        const body = document.body
        const root = document.documentElement
        const previous = {
            position: body.style.position,
            top: body.style.top,
            left: body.style.left,
            right: body.style.right,
            overflow: body.style.overflow,
            paddingRight: body.style.paddingRight,
        }
        const rootOverflow = root.style.overflow
        const scrollbarWidth = window.innerWidth - root.clientWidth
        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`
        }
        body.style.position = "fixed"
        body.style.top = `-${scrollY}px`
        body.style.left = "0"
        body.style.right = "0"
        body.style.overflow = "hidden"
        root.style.overflow = "hidden"
        function outside(event: PointerEvent) {
            if (
                event.target instanceof Node &&
                !container.current?.contains(event.target)
            )
                setOpen(false)
        }
        function escape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false)
                button.current?.focus()
            }
        }
        function focusOutside(event: FocusEvent) {
            if (
                event.target instanceof Node &&
                !container.current?.contains(event.target)
            )
                setOpen(false)
        }
        const desktop = window.matchMedia("(min-width: 1280px)")
        function resized(event: MediaQueryListEvent) {
            if (event.matches) setOpen(false)
        }
        document.addEventListener("pointerdown", outside)
        document.addEventListener("keydown", escape)
        document.addEventListener("focusin", focusOutside)
        desktop.addEventListener("change", resized)
        return () => {
            Object.assign(body.style, previous)
            root.style.overflow = rootOverflow
            window.scrollTo({
                left: scrollX,
                top: scrollY,
                behavior: "instant",
            })
            document.removeEventListener("pointerdown", outside)
            document.removeEventListener("keydown", escape)
            document.removeEventListener("focusin", focusOutside)
            desktop.removeEventListener("change", resized)
        }
    }, [open])

    return (
        <div
            className="menu"
            ref={container}
            onClick={(event) => {
                if (
                    event.target instanceof Element &&
                    event.target.closest("a[href]")
                ) {
                    setOpen(false)
                    button.current?.focus()
                }
            }}
        >
            <button
                ref={button}
                type="button"
                className="button button--ghost menu_toggle"
                aria-label={open ? "Close navigation" : "Open navigation"}
                aria-expanded={open}
                aria-controls={open ? id : undefined}
                onClick={() => setOpen((value) => !value)}
            >
                {open ? (
                    <PiXDuotone size={22} aria-hidden="true" />
                ) : (
                    <PiListDuotone size={22} aria-hidden="true" />
                )}
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="overlay"
                        className="menu_overlay"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.18 }}
                        onPointerDown={() => {
                            setOpen(false)
                            button.current?.focus()
                        }}
                    />
                )}
                {open && (
                    <MenuPanel
                        key="navigation"
                        id={id}
                        reduceMotion={Boolean(reduceMotion)}
                    >
                        {children}
                    </MenuPanel>
                )}
            </AnimatePresence>
        </div>
    )
}
