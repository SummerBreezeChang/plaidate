import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Resource {
  id: number
  title: string
  description: string
  image: string
  category: string
  type: string
  ageRange: string
  link: string
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link href={resource.link} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-border bg-slate-100">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={resource.image || "/placeholder.svg"}
              alt={resource.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-chart-2 text-primary-foreground text-sm font-medium">
              {resource.type}
            </span>
            <span className="text-sm text-muted-foreground">{resource.ageRange}</span>
          </div>
          <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-secondary-foreground transition-colors">
            {resource.title}
          </h3>
          <p className="text-popover-foreground leading-relaxed line-clamp-3">{resource.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
