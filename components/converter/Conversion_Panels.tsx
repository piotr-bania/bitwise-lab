"use client"

import { useState } from "react"
import { PiCopyDuotone } from "react-icons/pi"
import Card from "@/components/ui/cards/Card"
import Table from "@/components/ui/tables/Table"
import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"
import Divider from "@/components/ui/dividers/Divider"
import {
    formatBinary,
    type ConversionProgress,
    type ConversionResult,
} from "@/lib/conversion"

export function Copy_Button({
    value,
    label,
}: {
    value: string
    label: string
}) {
    const [status, setStatus] = useState("")
    async function copy() {
        try {
            await navigator.clipboard.writeText(value)
            setStatus("Copied")
        } catch {
            setStatus("Copy failed. Select and copy the value manually.")
        }
    }
    return (
        <div className="converter_copy">
            <button
                type="button"
                className="button button--ghost"
                onClick={copy}
                aria-label={`Copy ${label}`}
            >
                <PiCopyDuotone size={18} aria-hidden="true" />
            </button>
            <span role="status" className="converter_copy_status">
                {status}
            </span>
        </div>
    )
}

export function Value_Card({
    label,
    value,
    display = value,
    prominent = false,
    detail,
}: {
    label: string
    value: string
    display?: string
    prominent?: boolean
    detail?: string
}) {
    return (
        <Card
            padding="compact"
            className={`converter_value ${prominent ? "converter_value--primary" : ""}`}
        >
            <Heading h3={label} className="converter_caption" />
            <div className="converter_value_row">
                <output className="converter_number mono_font">
                    {display}
                </output>
                <Copy_Button key={value} value={value} label={label} />
            </div>
            {detail && <Paragraph text={detail} className="paragraph_small" />}
        </Card>
    )
}

export function All_Formats({ result }: { result: ConversionResult }) {
    return (
        <div className="converter_stack">
            <Value_Card label="Decimal (base 10)" value={result.decimal} />
            <Value_Card
                label="Binary (base 2)"
                value={result.binary}
                display={formatBinary(result.binary)}
            />
            <Value_Card
                label="Hexadecimal (base 16)"
                value={result.hexadecimal}
            />
        </div>
    )
}

export function Binary_Breakdown({ result }: { result: ConversionProgress }) {
    return (
        <>
            <div
                className="converter_scroll"
                role="region"
                aria-label="Binary bits and their place values"
                tabIndex={0}
            >
                <div className="converter_bits">
                    {result.places.map((place) => (
                        <div className="converter_bit" key={place.exponent}>
                            <span
                                className={`converter_bit_digit ${place.bit === "1" ? "is-one" : "is-zero"}`}
                                aria-label={`Bit ${place.exponent}: ${place.bit}`}
                            >
                                {place.bit}
                            </span>
                            <span className="mono_font">
                                2<sup>{place.exponent}</sup>
                            </span>
                            <span className="mono_font">{place.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Divider className="converter_breakdown_divider" />
            <div className="converter_decomposition">
                <h4 className="converter_caption">
                    {result.complete
                        ? "As powers of two"
                        : "Revealed value so far"}
                </h4>
                <p className="mono_font">
                    {result.decimal} ={" "}
                    <span className="success_color">
                        {result.decomposition.length
                            ? result.decomposition.join(" + ")
                            : "0"}
                    </span>
                </p>
                <p className="paragraph_small">
                    Only the positions containing 1 contribute to the total.
                </p>
            </div>
        </>
    )
}

export function Place_Values({ result }: { result: ConversionProgress }) {
    return (
        <div
            className="converter_scroll"
            role="region"
            aria-label="Powers of two reference table"
            tabIndex={0}
        >
            <Table>
                <caption className="sr-only">
                    Place values for the current binary number
                </caption>
                <thead>
                    <tr>
                        <th scope="col">Power</th>
                        <th scope="col">Value</th>
                        <th scope="col">Bit</th>
                        <th scope="col">Contribution</th>
                        <th scope="col">Binary</th>
                        <th scope="col">Hex</th>
                    </tr>
                </thead>
                <tbody>
                    {result.places.map((place) => (
                        <tr
                            key={place.exponent}
                            aria-current={
                                place.exponent === result.currentExponent
                                    ? "step"
                                    : undefined
                            }
                            className={
                                place.exponent === result.currentExponent
                                    ? "is-current"
                                    : place.bit === "1"
                                      ? "is-contributing"
                                      : ""
                            }
                        >
                            <th scope="row">
                                2<sup>{place.exponent}</sup>
                            </th>
                            <td>{place.value}</td>
                            <td>{place.bit}</td>
                            <td>{place.bit === "1" ? place.value : "0"}</td>
                            <td>{formatBinary(place.binary)}</td>
                            <td>{place.hexadecimal}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
