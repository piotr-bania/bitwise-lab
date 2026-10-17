export type SidebarIconName =
    "lightbulb" | "grid" | "stack" | "brain" | "trophy"

export type SidebarRoute = {
    id: string
    label: string
    href: string
    disabled: boolean
    badge?: string
    icon?: SidebarIconName
    description?: string
}

export type SidebarCategory = {
    id: string
    heading: string
    routes: readonly SidebarRoute[]
}

export const sidebarRoutes: readonly SidebarCategory[] = [
    {
        id: "converters",
        heading: "Convert between",
        routes: [
            {
                id: "decimal-to-binary",
                label: "Decimal → Binary",
                href: "/decimal-binary",
                disabled: false,
                badge: "01",
                description:
                    "Convert a decimal number to binary using repeated division by 2.",
            },
            {
                id: "binary-to-decimal",
                label: "Binary → Decimal",
                href: "/convert/binary-to-decimal",
                disabled: true,
                badge: "10",
                description:
                    "Read binary digits using their powers-of-two place values.",
            },
            {
                id: "decimal-to-hexadecimal",
                label: "Decimal → Hexadecimal",
                href: "/convert/decimal-to-hexadecimal",
                disabled: true,
                badge: "123",
                description:
                    "Convert decimal numbers to base 16 using repeated division by 16.",
            },
            {
                id: "hexadecimal-to-decimal",
                label: "Hexadecimal → Decimal",
                href: "/convert/hexadecimal-to-decimal",
                disabled: true,
                badge: "16",
                description:
                    "Use powers of 16 to read hexadecimal numbers in decimal.",
            },
            {
                id: "binary-to-hexadecimal",
                label: "Binary → Hexadecimal",
                href: "/convert/binary-to-hexadecimal",
                disabled: true,
                badge: "01",
                description:
                    "Group binary digits into nibbles to find their hexadecimal equivalents.",
            },
            {
                id: "hexadecimal-to-binary",
                label: "Hexadecimal → Binary",
                href: "/convert/hexadecimal-to-binary",
                disabled: true,
                badge: "16",
                description:
                    "Expand each hexadecimal digit into four binary digits.",
            },
        ],
    },
    {
        id: "learning",
        heading: "Learning",
        routes: [
            {
                id: "how-it-works",
                label: "How it works",
                href: "/learn/how-it-works",
                disabled: true,
                icon: "lightbulb",
                description:
                    "Each number system represents the same value with a different base.",
            },
            {
                id: "number-systems",
                label: "Number systems",
                href: "/learn/number-systems",
                disabled: true,
                icon: "grid",
                description:
                    "Binary uses base 2, decimal uses base 10, and hexadecimal uses base 16.",
            },
            {
                id: "powers",
                label: "Powers of two and sixteen",
                href: "/learn/powers",
                disabled: true,
                icon: "stack",
                description:
                    "Each position in a number is weighted by a power of its base.",
            },
            {
                id: "practice",
                label: "Practice",
                href: "/learn/practice",
                disabled: true,
                icon: "brain",
                description:
                    "Try converting decimal 66 to binary and hexadecimal: 0100 0010 and 42.",
            },
            {
                id: "challenges",
                label: "Challenges",
                href: "/learn/challenges",
                disabled: true,
                icon: "trophy",
                description:
                    "Can you encode BL? B is decimal 66 and L is decimal 76.",
            },
        ],
    },
]
