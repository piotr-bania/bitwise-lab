export const MAX_DECIMAL_DIGITS = 64

export type DivisionStep = {
    dividend: string
    quotient: string
    remainder: "0" | "1"
    binary: string
}

export type BitPlace = {
    bit: "0" | "1"
    exponent: number
    value: string
    binary: string
    hexadecimal: string
}

export type ConversionResult = {
    decimal: string
    binary: string
    hexadecimal: string
    bitLength: number
    byteCount: number
    steps: DivisionStep[]
    places: BitPlace[]
    decomposition: string[]
}

export type ParseResult =
    { valid: true; value: bigint } | { valid: false; error: string }

export function parseDecimal(input: string): ParseResult {
    if (!input.length) return { valid: false, error: "Enter a decimal number." }
    if (input.length > MAX_DECIMAL_DIGITS)
        return {
            valid: false,
            error: `Use at most ${MAX_DECIMAL_DIGITS} decimal digits.`,
        }
    if (!/^[0-9]+$/.test(input))
        return {
            valid: false,
            error: "Use digits 0–9 only. Negative numbers, fractions and spaces are not supported.",
        }
    return { valid: true, value: BigInt(input) }
}

export function formatBinary(binary: string): string {
    return binary.replace(/\B(?=(?:[01]{4})+$)/g, " ")
}

export function toBase(value: bigint, base: 2 | 10 | 16): string {
    if (value < BigInt(0)) throw new RangeError("Value must be non-negative.")
    return value.toString(base).toUpperCase()
}

export function explainDivision(value: bigint): DivisionStep[] {
    if (value < BigInt(0)) throw new RangeError("Value must be non-negative.")
    const steps: DivisionStep[] = []
    let dividend = value
    let binary = ""
    // Zero has one explicit operation: 0 ÷ 2 = 0, remainder 0.
    do {
        const quotient = dividend / BigInt(2)
        const remainder = dividend % BigInt(2) === BigInt(0) ? "0" : "1"
        binary = remainder + binary
        steps.push({
            dividend: dividend.toString(),
            quotient: quotient.toString(),
            remainder,
            binary,
        })
        dividend = quotient
    } while (dividend > BigInt(0))
    return steps
}

export function convertDecimal(input: string): ConversionResult {
    const parsed = parseDecimal(input)
    if (!parsed.valid) throw new Error(parsed.error)
    const binary = toBase(parsed.value, 2)
    const places: BitPlace[] = Array.from(binary, (digit, index) => {
        const exponent = binary.length - index - 1
        const value = BigInt(2) ** BigInt(exponent)
        return {
            bit: digit === "1" ? "1" : "0",
            exponent,
            value: toBase(value, 10),
            binary: toBase(value, 2),
            hexadecimal: toBase(value, 16),
        }
    })
    return {
        decimal: toBase(parsed.value, 10),
        binary,
        hexadecimal: toBase(parsed.value, 16),
        bitLength: binary.length,
        byteCount: Math.ceil(binary.length / 8),
        steps: explainDivision(parsed.value),
        places,
        decomposition: places
            .filter((place) => place.bit === "1")
            .map((place) => place.value),
    }
}

export type ConversionProgress = Pick<
    ConversionResult,
    "places" | "decimal" | "decomposition"
> & {
    currentExponent: number
    complete: boolean
}

export function getConversionProgress(
    result: ConversionResult,
    current: number,
): ConversionProgress {
    if (
        !Number.isInteger(current) ||
        current < 0 ||
        current >= result.steps.length
    ) {
        throw new RangeError("Step is outside the conversion.")
    }
    const places = result.places.filter((place) => place.exponent <= current)
    return {
        places,
        decimal: BigInt(`0b${result.steps[current].binary}`).toString(),
        decomposition: places
            .filter((place) => place.bit === "1")
            .map((place) => place.value),
        currentExponent: current,
        complete: current === result.steps.length - 1,
    }
}
