import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Events() {
  return (
    <section className="bg-black px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
          Upcoming Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.title} className="border-gray-800 bg-black/50">
              <CardHeader>
                <CardTitle className="text-white">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{event.description}</p>
                <div className="mt-4 flex items-center text-[#00A36C]">
                  <time dateTime={event.date}>{event.date}</time>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const events = [
  {
    title: "Hackathon 2024",
    description: "24-hour coding challenge with amazing prizes",
    date: "March 15, 2024",
  },
  {
    title: "Web Development Workshop",
    description: "Learn modern web development with React and Next.js",
    date: "March 20, 2024",
  },
  {
    title: "Coding Competition",
    description: "Test your problem-solving skills",
    date: "March 25, 2024",
  },
]

