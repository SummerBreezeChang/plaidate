import Image from "next/image"

export function FeatureCards() {
  const features = [
    {
      title: "No Out-of-Pocket",
      description:
        "Hosts can set fees and get paid through the platform. No more awkward money exchanges. Accurately prepare and file personal and business tax returns to maximize deductions and ensure compliance.",
      color: "bg-[#5DADE2]",
      illustration: "/illustrations/save.png",
      imagePosition: "left" as const,
    },
    {
      title: "Easy Scheduling",
      description:
        "Organize playdates without endless text threads or back-and-forth coordination. Offer expert guidance and representation to resolve tax audits and disputes with confidence.",
      color: "bg-[#F4D03F]",
      illustration: "/illustrations/calendar.png",
      imagePosition: "right" as const,
    },
    {
      title: "Skill-Powered",
      description: "Parents share their expertise in music, sports, crafts, and STEM for unique activities.",
      color: "bg-[#C39BD3]",
      illustration: "/illustrations/skills.png",
      imagePosition: "left" as const,
    },
  ]

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`${feature.color} rounded-3xl p-8 flex ${
            feature.imagePosition === "right" ? "flex-row-reverse" : "flex-row"
          } gap-8 items-center`}
        >
          {feature.illustration && (
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={feature.illustration || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 text-primary">{feature.title}</h3>
            <p className="text-sm leading-relaxed my-0 py-0 px-0 text-primary">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
