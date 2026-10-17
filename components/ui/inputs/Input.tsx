"use client"

import { useId, type ComponentPropsWithRef, type ReactNode } from "react"
import Paragraph from "@/components/ui/text/Paragraph"

export type InputProps = ComponentPropsWithRef<"input"> & {
    label: ReactNode
    error?: string
    wrapperClassName?: string
    labelClassName?: string
}

export default function Input({
    label,
    error,
    id,
    className = "",
    wrapperClassName = "",
    labelClassName = "paragraph_small",
    "aria-describedby": describedBy,
    "aria-invalid": invalid,
    ...props
}: InputProps) {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`

    return (
        <div className={`input_field ${wrapperClassName}`}>
            <label
                htmlFor={inputId}
                className={`input_field_label ${labelClassName}`}
            >
                {label}
            </label>
            <input
                {...props}
                id={inputId}
                className={`input_field_control mono_font ${className}`}
                aria-invalid={error ? true : invalid}
                aria-describedby={
                    [describedBy, error ? errorId : undefined]
                        .filter(Boolean)
                        .join(" ") || undefined
                }
            />
            {error && (
                <div id={errorId} role="alert">
                    <Paragraph
                        text={error}
                        className="input_field_error paragraph_small"
                    />
                </div>
            )}
        </div>
    )
}
