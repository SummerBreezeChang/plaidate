export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Sign up and build your family profile. Share your interests, kids' ages, grades, and hobbies.",
      color: "bg-[#52BE80]",
    },
    {
      number: "2",
      title: "Discover & Create",
      description: "Browse local playdates or create your own. Connect with families to share with the community.",
      color: "bg-[#EC7063]",
    },
    {
      number: "3",
      title: "Connect & Play",
      description:
        "Chat, plan, and confirm. Then join activities, chat with other parents, and build your child's social circle.",
      color: "bg-[#5DADE2]",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div key={index} className={`${step.color} rounded-3xl p-8 text-white space-y-4 min-h-[240px]`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-center">
            <span className="text-2xl font-bold">{step.number}</span>
          </div>
          <h3 className="text-2xl font-bold text-primary-foreground">{step.title}</h3>
          <p className="leading-normal opacity-95 text-primary-foreground text-base">{step.description}</p>
        </div>
      ))}
    </div>
  )
}
