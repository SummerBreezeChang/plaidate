export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Sign up and build your family profile. Share your interests, kids' ages, grades, and hobbies.",
      color: "bg-chart-1",
    },
    {
      number: "2",
      title: "Discover & Create",
      description: "Browse local playdates or create your own. Connect with families to share with the community.",
      color: "bg-chart-2",
    },
    {
      number: "3",
      title: "Connect & Play",
      description:
        "Chat, plan, and confirm. Then join activities, chat with other parents, and build your child's social circle.",
      color: "bg-chart-3",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div key={index} className={`${step.color} rounded-3xl p-8 space-y-4 min-h-[240px]`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm text-center">
            <span className="text-2xl font-semibold text-foreground">{step.number}</span>
          </div>
          <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
          <p className="text-sm leading-normal opacity-95 text-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
