import { test } from "node:test"
import assert from "node:assert/strict"
import {
    convertDecimal,
    getConversionProgress,
    parseDecimal,
    formatBinary,
    toBase,
    MAX_DECIMAL_DIGITS,
} from "../lib/conversion.ts"

for (const [decimal, binary] of [
    ["0", "0"],
    ["1", "1"],
    ["3", "11"],
    ["13", "1101"],
    ["26", "11010"],
    ["30", "11110"],
    ["157", "10011101"],
    ["215", "11010111"],
    ["255", "11111111"],
    ["256", "100000000"],
]) {
    test(`converts ${decimal} and reconstructs its explanation`, () => {
        const result = convertDecimal(decimal)
        assert.equal(result.binary, binary)
        assert.equal(result.steps.length, binary.length)
        assert.equal(result.steps.at(-1).binary, binary)
        assert.equal(result.steps.at(-1).quotient, "0")
        assert.equal(result.byteCount, Math.ceil(binary.length / 8))
        assert.equal(
            result.decomposition.reduce(
                (sum, item) => sum + BigInt(item),
                BigInt(0),
            ),
            BigInt(decimal),
        )
        assert.equal(
            result.steps
                .map((step) => step.remainder)
                .reverse()
                .join(""),
            binary,
        )
    })
}

test("157 has the correct eight division steps, hex and place values", () => {
    const result = convertDecimal("157")
    assert.equal(result.hexadecimal, "9D")
    assert.deepEqual(
        result.steps.map((s) => [s.dividend, s.quotient, s.remainder]),
        [
            ["157", "78", "1"],
            ["78", "39", "0"],
            ["39", "19", "1"],
            ["19", "9", "1"],
            ["9", "4", "1"],
            ["4", "2", "0"],
            ["2", "1", "0"],
            ["1", "0", "1"],
        ],
    )
    assert.deepEqual(result.decomposition, ["128", "16", "8", "4", "1"])
    assert.deepEqual(result.places[0], {
        bit: "1",
        exponent: 7,
        value: "128",
        binary: "10000000",
        hexadecimal: "80",
    })
    assert.equal(formatBinary(result.binary), "1001 1101")
    assert.equal(formatBinary("100000000"), "1 0000 0000")
})

test("rejects invalid, empty, signed, fractional, exponential and oversized input", () => {
    for (const input of [
        "",
        "abc",
        "12a",
        "-1",
        "+1",
        "1.5",
        "1e3",
        " 1",
        "1 ",
        "١",
        "1".repeat(MAX_DECIMAL_DIGITS + 1),
    ]) {
        assert.equal(parseDecimal(input).valid, false, input)
        assert.throws(() => convertDecimal(input))
    }
})

test("normalises leading zeros and handles zero explicitly", () => {
    assert.equal(convertDecimal("000157").decimal, "157")
    assert.deepEqual(convertDecimal("000").steps, [
        { dividend: "0", quotient: "0", remainder: "0", binary: "0" },
    ])
    assert.deepEqual(convertDecimal("0").decomposition, [])
})

test("keeps exact precision beyond Number.MAX_SAFE_INTEGER and at the length limit", () => {
    for (const input of ["9007199254740993", "9".repeat(MAX_DECIMAL_DIGITS)]) {
        const result = convertDecimal(input)
        assert.equal(BigInt("0b" + result.binary), BigInt(input))
        assert.equal(BigInt("0x" + result.hexadecimal), BigInt(input))
        assert.equal(result.steps.length, result.bitLength)
    }
    assert.throws(() => toBase(BigInt(-1), 2), RangeError)
})

test("division and place values agree for every integer from 0 through 1024", () => {
    for (let number = 0; number <= 1024; number++) {
        const result = convertDecimal(String(number))
        assert.equal(result.binary, number.toString(2))
        assert.equal(result.hexadecimal, number.toString(16).toUpperCase())
        for (const [index, step] of result.steps.entries()) {
            const dividend = BigInt(step.dividend)
            assert.equal(
                BigInt(step.quotient) * BigInt(2) + BigInt(step.remainder),
                dividend,
            )
            if (index > 0)
                assert.equal(step.dividend, result.steps[index - 1].quotient)
        }
        assert.equal(
            result.places.reduce(
                (sum, place) =>
                    sum + (place.bit === "1" ? BigInt(place.value) : BigInt(0)),
                BigInt(0),
            ),
            BigInt(number),
        )
    }
})

test("reference panels reveal exactly the current and previous steps", () => {
    const result = convertDecimal("123")
    const fifth = getConversionProgress(result, 4)
    assert.deepEqual(
        fifth.places.map((place) => place.exponent),
        [4, 3, 2, 1, 0],
    )
    assert.equal(fifth.places.map((place) => place.bit).join(""), "11011")
    assert.equal(fifth.decimal, "27")
    assert.deepEqual(fifth.decomposition, ["16", "8", "2", "1"])
    assert.equal(fifth.complete, false)
    const final = getConversionProgress(result, 6)
    assert.equal(final.decimal, result.decimal)
    assert.deepEqual(final.places, result.places)
    assert.equal(final.complete, true)
    assert.equal(getConversionProgress(result, 1).places.length, 2)
    assert.equal(getConversionProgress(result, 0).places.length, 1)
    assert.equal(getConversionProgress(convertDecimal("0"), 0).decimal, "0")
    assert.throws(() => getConversionProgress(result, -1), RangeError)
    assert.throws(() => getConversionProgress(result, 7), RangeError)
})
