export type NumberBase = 2 | 10 | 16

export interface ConversionResult {
    decimal: string
    binary: string
    hexadecimal: string
    bitLength: number
}

export function convertNumber(
    input: string,
    fromBase: NumberBase,
): ConversionResult {
    const clean = input.replace(/\s+/g, "")

    const patterns: Record<NumberBase, RegExp> = {
        2: /^[01]+$/,
        10: /^\d+$/,
        16: /^[0-9a-fA-F]+$/,
    }

    if (!patterns[fromBase].test(clean)) {
        throw new Error("Invalid number for selected base")
    }

    const value =
        fromBase === 10
            ? BigInt(clean)
            : BigInt((fromBase === 2 ? "0b" : "0x") + clean)

    const binary = value.toString(2)

    return {
        decimal: value.toString(10),
        binary: binary.replace(/\B(?=(\d{4})+(?!\d))/g, " "),
        hexadecimal: value.toString(16).toUpperCase(),
        bitLength: binary.length,
    }
}
