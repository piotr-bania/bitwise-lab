import type { ReactNode } from "react"

import Sidebar from "@/components/layout/Sidebar"

export default function App_Layout({ children }: { children: ReactNode }) {
    return (
        <section className="app_layout flex-1 content-start">
            <div className="col-span-full flex min-w-0 flex-col items-stretch gap-3 xl:flex-row xl:items-start">
                <Sidebar className="hidden xl:block" />
                <main id="main-content" className="min-w-0 flex-1">
                    {children}
                </main>
            </div>
        </section>
    )
}
