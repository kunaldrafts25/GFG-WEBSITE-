import { Code2, Users, Calendar, Trophy } from 'lucide-react'

export function Features() {
  return (
    <section className="bg-black px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
          Why Join GeeksforGeeks?
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-800 bg-black/50 p-6 text-center"
            >
              <feature.icon className="mx-auto mb-4 h-12 w-12 text-[#00A36C]" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "Coding Workshops",
    description: "Learn from industry experts and enhance your programming skills",
    icon: Code2,
  },
  {
    title: "Community",
    description: "Connect with like-minded peers and build your network",
    icon: Users,
  },
  {
    title: "Regular Events",
    description: "Participate in hackathons, coding contests, and tech talks",
    icon: Calendar,
  },
  {
    title: "Competitions",
    description: "Showcase your skills and win exciting prizes",
    icon: Trophy,
  },
]

