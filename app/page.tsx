import Link from "next/link"
import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"

export default function Home_Page() {
    return (
        <main
            id="main-content"
            className="flex flex-1 items-center justify-center"
        >
            <section className="items-center">
                <div className="col-span-full mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-6 text-center">
                    <Paragraph
                        text="Decimal. Binary. Hexadecimal."
                        className="tag"
                    />

                    <div>
                        <Heading h1="A different base." />
                        <Heading h2="A whole new understanding." />
                    </div>

                    <Paragraph text="Numbers speak more than one language. Bitwise Lab helps you connect decimal, binary and hexadecimal, explore how conversions work, and build your confidence one bit at a time." />

                    <div>
                        <Link
                            href="/decimal-binary"
                            className="button button--primary inline-flex items-center gap-3"
                        >
                            Start with Decimal &rarr; Binary
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
