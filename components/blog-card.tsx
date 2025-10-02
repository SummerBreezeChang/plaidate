import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  slug: string
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-border bg-card">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground font-medium">
              {post.category}
            </span>
            <span className="text-muted-foreground">{post.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-secondary-foreground transition-colors">
            {post.title}
          </h3>
          <p className="text-popover-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <p className="text-sm text-muted-foreground">{post.date}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
