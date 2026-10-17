"use client"

import { useEffect, useRef } from "react"
import type { ConversionResult } from "@/lib/conversion"
import { formatBinary } from "@/lib/conversion"
import Card from "@/components/ui/cards/Card"
import Table from "@/components/ui/tables/Table"
import Badge from "@/components/ui/badges/Badge"

export default function Division_Lesson({
    result,
    current,
    onStep,
}: {
    result: ConversionResult
    current: number
    onStep: (step: number) => void
}) {
    const activeRow = useRef<HTMLTableRowElement>(null)
    const step = result.steps[current]
    const last = current === result.steps.length - 1

    useEffect(() => {
        // Scroll the table itself, keeping the page and surrounding controls still.
        const row = activeRow.current
        const container = row?.closest<HTMLElement>(".converter_steps_scroll")
        if (row && container) {
            const top =
                row.getBoundingClientRect().top -
                container.getBoundingClientRect().top +
                container.scrollTop
            if (
                top < container.scrollTop ||
                top + row.offsetHeight >
                    container.scrollTop + container.clientHeight
            ) {
                container.scrollTop = Math.max(
                    0,
                    top - container.clientHeight / 2,
                )
            }
        }
    }, [current])

    return (
        <>
            <div className="converter_method">
                <div>
                    <h3>Method: Repeated division by 2</h3>
                    <p className="paragraph_small">
                        Divide by 2, record the remainder, and repeat with the
                        quotient until it reaches 0.
                    </p>
                </div>
                <Badge>
                    {result.steps.length}{" "}
                    {result.steps.length === 1 ? "step" : "steps"}
                </Badge>
            </div>
            <div className="converter_lesson_grid">
                <div
                    className="converter_scroll converter_steps_scroll"
                    role="region"
                    aria-label="Repeated division steps"
                    tabIndex={0}
                >
                    <Table>
                        <caption className="sr-only">
                            Repeated division by two; remainders build the
                            binary number from right to left
                        </caption>
                        <thead>
                            <tr>
                                <th scope="col">Step</th>
                                <th scope="col">Division</th>
                                <th scope="col">Quotient</th>
                                <th scope="col">Remainder</th>
                                <th scope="col">Binary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.steps.map((item, index) => (
                                <tr
                                    key={index}
                                    ref={
                                        index === current
                                            ? activeRow
                                            : undefined
                                    }
                                    className={
                                        index === current
                                            ? "is-current"
                                            : index > current
                                              ? "is-future"
                                              : ""
                                    }
                                    aria-current={
                                        index === current ? "step" : undefined
                                    }
                                >
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {index <= current
                                            ? `${item.dividend} ÷ 2`
                                            : "—"}
                                    </td>
                                    <td>
                                        {index <= current ? item.quotient : "—"}
                                    </td>
                                    <td
                                        className={
                                            index > current
                                                ? undefined
                                                : item.remainder === "1"
                                                  ? "is-one"
                                                  : "is-zero"
                                        }
                                    >
                                        {index <= current
                                            ? item.remainder
                                            : "—"}
                                    </td>
                                    <td>
                                        {index <= current ? item.binary : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Card padding="compact" className="converter_explanation">
                    <div className="converter_explanation_layout">
                        <div
                            className="converter_explanation_text"
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <h4 className="converter_caption">
                                Step {current + 1}
                                {last ? " (final step)" : ""}
                            </h4>
                            <p className="mono_font converter_operation">
                                {step.dividend} ÷ 2 = {step.quotient}, remainder{" "}
                                {step.remainder}
                            </p>
                            <p className="paragraph_small">
                                {result.decimal === "0"
                                    ? "Zero is represented by a single binary digit: 0."
                                    : last
                                      ? "The quotient is now 0, so we stop. Read the remainders from bottom to top to obtain the complete binary number."
                                      : `Write down ${step.remainder}. Next, divide the quotient ${step.quotient} by 2. Each new remainder goes to the left of the previous digits.`}
                            </p>
                            <p className="converter_progress_label">
                                Binary so far
                            </p>
                            <output className="converter_progress mono_font">
                                {formatBinary(step.binary)}
                            </output>
                        </div>
                        <div
                            className="converter_remainders"
                            aria-label="Accumulated remainders, read bottom to top"
                        >
                            <div>
                                {result.steps
                                    .slice(0, current + 1)
                                    .map((item, index) => (
                                        <span
                                            className={
                                                item.remainder === "1"
                                                    ? "is-one"
                                                    : "is-zero"
                                            }
                                            key={index}
                                        >
                                            {item.remainder}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <p className="converter_read_direction">
                        ↑ Read bottom to top
                    </p>
                </Card>
            </div>
            <div className="converter_navigation">
                <div className="converter_navigation_controls">
                    <button
                        type="button"
                        className="button button--ghost"
                        disabled={current === 0}
                        onClick={() => onStep(current - 1)}
                    >
                        ← Prev
                    </button>
                    <span>
                        Step {current + 1} of {result.steps.length}
                    </span>
                    <button
                        type="button"
                        className="button button--primary"
                        disabled={last}
                        onClick={() => onStep(current + 1)}
                    >
                        Next &rarr;
                    </button>
                </div>
                <button
                    type="button"
                    className="button button--ghost converter_restart"
                    onClick={() => onStep(0)}
                >
                    Restart &#8635;
                </button>
            </div>
        </>
    )
}
