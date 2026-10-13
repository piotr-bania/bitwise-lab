import { sidebarRoutes } from "@/lib/sidebarRoutes"

import Card from "@/components/ui/cards/Card"
import Heading from "@/components/ui/text/Heading"
import Paragraph from "@/components/ui/text/Paragraph"

export default function Home_Page() {
    return (
        <Card
            title={sidebarRoutes[0].routes[0].label}
            description={sidebarRoutes[0].routes[0].description}
        >
            <div className="flex flex-col gap-1">
                <Heading h1="Heading 1" />
                <Heading h2="Heading 2" />
                <Heading h3="Heading 3" />
                <Heading h4="Heading 4" />
                <Heading h5="Heading 5" />
                <Heading h6="Heading 6" />
                <Paragraph text="This is a paragraph." />
                <a href="">This is a link</a>
                <button>This is a button</button>
            </div>
        </Card>
    )
}
