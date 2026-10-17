"use client"

import {
    useId,
    useState,
    useSyncExternalStore,
    type FormEvent,
    type KeyboardEvent,
} from "react"
import Link from "next/link"
import Card from "@/components/ui/cards/Card"
import Input from "@/components/ui/inputs/Input"
import Divider from "@/components/ui/dividers/Divider"
import Division_Lesson from "@/components/converter/Division_Lesson"
import {
    All_Formats,
    Binary_Breakdown,
    Place_Values,
    Value_Card,
} from "@/components/converter/Conversion_Panels"
import {
    convertDecimal,
    formatBinary,
    getConversionProgress,
    MAX_DECIMAL_DIGITS,
    parseDecimal,
    type ConversionResult,
} from "@/lib/conversion"
import { sidebarRoutes } from "@/lib/sidebarRoutes"

const tabs = [
    "Step by step",
    "Visualisation",
    "Place values",
    "All formats",
] as const
const route = sidebarRoutes[0].routes[0]
const reverseRoute = sidebarRoutes
    .flatMap((group) => group.routes)
    .find((item) => item.id === "binary-to-decimal")

const desktopQuery = "(min-width: 1280px)"
function subscribeToViewport(onChange: () => void) {
    const media = window.matchMedia(desktopQuery)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
}
const getDesktopSnapshot = () => window.matchMedia(desktopQuery).matches
const getServerSnapshot = () => false

export default function Decimal_Binary_Workspace() {
    const id = useId()
    const [input, setInput] = useState("157")
    const [result, setResult] = useState<ConversionResult | null>(() =>
        convertDecimal("157"),
    )
    const [error, setError] = useState("")
    const [current, setCurrent] = useState(0)
    const [tab, setTab] = useState(0)
    const desktop = useSyncExternalStore(
        subscribeToViewport,
        getDesktopSnapshot,
        getServerSnapshot,
    )
    const visibleTab = desktop ? 0 : tab
    const progress = result ? getConversionProgress(result, current) : null

    function convert(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const parsed = parseDecimal(input)
        setCurrent(0)
        if (!parsed.valid) {
            setError(parsed.error)
            setResult(null)
            return
        }
        setResult(convertDecimal(input))
        setError("")
    }

    function tabKeyboard(
        event: KeyboardEvent<HTMLButtonElement>,
        index: number,
    ) {
        let next: number
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length
        else if (event.key === "ArrowLeft")
            next = (index - 1 + tabs.length) % tabs.length
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = tabs.length - 1
        else return
        event.preventDefault()
        setTab(next)
        document.getElementById(`${id}-tab-${next}`)?.focus()
    }

    return (
        <div className="converter">
            <div className="converter_workspace">
                <Card
                    title={route.label}
                    description={route.description}
                    className="converter_calculation_card"
                >
                    <form
                        onSubmit={convert}
                        noValidate
                        className="converter_form"
                    >
                        <Input
                            id={`${id}-input`}
                            label="Decimal number"
                            type="text"
                            inputMode="numeric"
                            autoComplete="off"
                            spellCheck={false}
                            maxLength={MAX_DECIMAL_DIGITS + 1}
                            value={input}
                            error={error}
                            onChange={(event) => {
                                setInput(event.target.value)
                                setError("")
                                setResult(null)
                                setCurrent(0)
                            }}
                        />
                        <button
                            type="submit"
                            className="button button--primary"
                        >
                            Convert →
                        </button>
                        {reverseRoute && !reverseRoute.disabled && result ? (
                            <Link
                                href={`${reverseRoute.href}?value=${encodeURIComponent(result.binary)}`}
                                className="button button--ghost"
                            >
                                ⇄ Swap
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="button button--ghost"
                                disabled
                            >
                                ⇄ Swap
                            </button>
                        )}
                    </form>

                    {result && progress ? (
                        <>
                            <div className="sr-only" role="status">
                                Converted {result.decimal} to binary{" "}
                                {result.binary}. {result.bitLength} bits,{" "}
                                {result.byteCount}{" "}
                                {result.byteCount === 1 ? "byte" : "bytes"}{" "}
                                required.
                            </div>
                            <div className="converter_results">
                                <Value_Card
                                    label="Binary result"
                                    value={result.binary}
                                    display={formatBinary(result.binary)}
                                    prominent
                                    detail={`${result.bitLength} ${result.bitLength === 1 ? "bit" : "bits"} (${result.byteCount} ${result.byteCount === 1 ? "byte" : "bytes"} required)`}
                                />
                                <Value_Card
                                    label="Hexadecimal"
                                    value={result.hexadecimal}
                                />
                                <Value_Card
                                    label="Decimal (check)"
                                    value={result.decimal}
                                />
                            </div>
                            <div className="converter_learning">
                                <div
                                    className="converter_tabs"
                                    role="tablist"
                                    aria-label="Explore the conversion"
                                >
                                    {tabs.map((label, index) => (
                                        <button
                                            key={label}
                                            id={`${id}-tab-${index}`}
                                            type="button"
                                            className={`button button--ghost ${tab === index ? "converter_tab--selected" : ""}`}
                                            role="tab"
                                            aria-selected={tab === index}
                                            aria-controls={`${id}-panel-${index}`}
                                            tabIndex={tab === index ? 0 : -1}
                                            onClick={() => setTab(index)}
                                            onKeyDown={(event) =>
                                                tabKeyboard(event, index)
                                            }
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <Divider className="converter_tabs_divider" />
                                {tabs.map((_, index) => (
                                    <div
                                        key={index}
                                        role={desktop ? undefined : "tabpanel"}
                                        id={`${id}-panel-${index}`}
                                        aria-labelledby={
                                            desktop
                                                ? undefined
                                                : `${id}-tab-${index}`
                                        }
                                        hidden={visibleTab !== index}
                                        tabIndex={0}
                                    >
                                        {visibleTab === index &&
                                            (index === 0 ? (
                                                <Division_Lesson
                                                    result={result}
                                                    current={current}
                                                    onStep={setCurrent}
                                                />
                                            ) : index === 1 ? (
                                                <>
                                                    <h3 className="converter_panel_title">
                                                        Every bit has a place
                                                    </h3>
                                                    <Binary_Breakdown
                                                        result={progress}
                                                    />
                                                </>
                                            ) : index === 2 ? (
                                                <>
                                                    <h3 className="converter_panel_title">
                                                        Powers of two and place
                                                        values
                                                    </h3>
                                                    <Place_Values
                                                        result={progress}
                                                    />
                                                </>
                                            ) : (
                                                <All_Formats result={result} />
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="converter_empty">
                            Enter a whole number and select Convert to explore
                            its binary representation.
                        </p>
                    )}
                </Card>
            </div>
            {result && progress && (
                <aside
                    className="converter_reference"
                    aria-label="Conversion reference"
                >
                    <Card
                        title="All formats"
                        padding="compact"
                        className="converter_all_formats"
                    >
                        <All_Formats result={result} />
                    </Card>
                    <Card title="Binary breakdown" padding="compact">
                        <Binary_Breakdown result={progress} />
                    </Card>
                    <Card title="Number base reference" padding="compact">
                        <Place_Values result={progress} />
                    </Card>
                </aside>
            )}
        </div>
    )
}
