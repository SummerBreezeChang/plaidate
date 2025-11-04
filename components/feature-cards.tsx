import Image from "next/image"

export function FeatureCards() {
  const features = [
    {
      title: "No Out-of-Pocket",
      description:
        "Share costs automatically for group activities. When you take the kids to the museum, zoo, or grab pizza, split expenses seamlessly.",
      color: "bg-accent",
      illustration: "/illustrations/save.png",
      imagePosition: "left" as const,
    },
    {
      title: "Easy Scheduling",
      description:
        "Organize playdates without endless text threads or back-and-forth coordination. Send invites, track RSVPs, and chat with parents",
      color: "bg-secondary",
      illustration: "/illustrations/calendar.png",
      imagePosition: "right" as const,
    },
    {
      title: "Skill-Powered",
      description:
        "Parents share their expertise in music, sports, crafts, and STEM to host unique playdates—and get paid for it. Turn your skills into enriching experiences for kids.",
      color: "bg-chart-4",
      illustration: "/illustrations/skills.png",
      imagePosition: "left" as const,
    },
  ]

  return (
    <div className="flex flex-col gap-6 w-full">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`${feature.color} rounded-3xl p-8 flex flex-col gap-8 items-center ${
            index === 1 ? "md:flex-row-reverse md:ml-40 md:mr-0" : "md:flex-row md:ml-0 md:mr-40"
          }`}
        >
          {feature.illustration && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
              <Image
                src={feature.illustration || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex-1 md:max-w-md">
            <h3 className="text-2xl font-semibold mb-3 text-foreground">{feature.title}</h3>
            <p className="text-sm leading-normal my-0 py-0 px-0 text-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
