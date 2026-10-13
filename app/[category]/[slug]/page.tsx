import { notFound } from "next/navigation"
import Card from "@/components/ui/cards/Card"
import { sidebarRoutes } from "@/lib/sidebarRoutes"

export function generateStaticParams() {
    return sidebarRoutes
        .flatMap((category) => category.routes)
        .filter((route) => route.href !== "/")
        .map((route) => {
            const [, category, slug] = route.href.split("/")
            return { category, slug }
        })
}

export default async function SidebarRoutePage({
    params,
}: PageProps<"/[category]/[slug]">) {
    const { category, slug } = await params
    const route = sidebarRoutes
        .flatMap((group) => group.routes)
        .find((item) => item.href === `/${category}/${slug}`)
    if (!route) notFound()

    return <Card title={route.label} description={route.description} />
}
