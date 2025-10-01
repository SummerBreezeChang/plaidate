import Image from "next/image"

export function FeatureCards() {
  const features = [
    {
      title: "No Out-of-Pocket",
      description:
        "Hosts can set fees and get paid through the platform. No more awkward money exchanges. Parents can find free and paid activities. Providers and freelancers can offer no-minimum playdates and ensure compliance.",
      color: "bg-[#5DADE2]",
      illustration: "/illustrations/save.png",
    },
    {
      title: "Easy Scheduling",
      description:
        "Organize playdates without endless text threads or back-and-forth coordination. Offer expert playdates and one-time classes for events and playdates with confidence.",
      color: "bg-[#F4D03F]",
      illustration: "/illustrations/calendar.png",
    },
    {
      title: "Skill-Powered",
      description: "Parents share their expertise in music, sports, crafts, and STEM for unique activities.",
      color: "bg-[#C39BD3]",
      illustration: "/illustrations/skills.png",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className={`${feature.color} rounded-3xl p-8 flex flex-col gap-6 min-h-[280px]`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{feature.description}</p>
            </div>
            {feature.illustration && (
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={feature.illustration || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
