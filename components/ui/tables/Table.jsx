/** @param {import("react").ComponentPropsWithRef<"table">} props */
export default function Table({ className = "", children, ...props }) {
    return (
        <table {...props} className={`table ${className}`}>
            {children}
        </table>
    )
}
