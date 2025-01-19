import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function LearningPage() {
  return (
    <main className="container py-12 mt-20 pl-10 ml-10">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Learning Resources</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Access curated learning paths, tutorials, and resources to enhance
          your technical skills and stay ahead in the ever-evolving tech landscape.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Featured Learning Paths</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.title} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {resource.description}
                </p>
                <div className="space-y-2">
                  {resource.topics.map((topic) => (
                    <div
                      key={topic}
                      className="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Latest Tutorials</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{tutorial.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tutorial.author} • {tutorial.date}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{tutorial.description}</p>
              <a href="#" className="text-gfgsc-green hover:underline">Read more</a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Recommended Books</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="aspect-w-2 aspect-h-3 mb-4">
                <img src={book.cover || "/placeholder.svg"} alt={book.title} className="object-cover rounded-md" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
              <a href="#" className="text-gfgsc-green hover:underline">View on Amazon</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

const resources = [
  {
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA with our comprehensive learning path.",
    topics: ["Arrays", "Linked Lists", "Trees", "Dynamic Programming"],
  },
  {
    title: "Web Development",
    description: "Learn modern web development with hands-on projects and tutorials.",
    topics: ["HTML/CSS", "JavaScript", "React", "Node.js"],
  },
  {
    title: "Machine Learning",
    description: "Explore the world of AI and ML with practical implementations.",
    topics: ["Python", "NumPy", "Pandas", "TensorFlow"],
  },
  {
    title: "Competitive Programming",
    description: "Improve your problem-solving skills with coding challenges.",
    topics: ["Time Complexity", "Sorting", "Searching", "Graphs"],
  },
  {
    title: "System Design",
    description: "Learn how to design scalable systems and architectures.",
    topics: ["Scalability", "APIs", "Databases", "Microservices"],
  },
  {
    title: "Mobile Development",
    description: "Build mobile applications for iOS and Android platforms.",
    topics: ["React Native", "Flutter", "iOS", "Android"],
  },
]

const tutorials = [
  {
    title: "Introduction to GraphQL",
    author: "Priya Sharma",
    date: "May 15, 2023",
    description: "Learn the basics of GraphQL and how it differs from traditional REST APIs.",
  },
  {
    title: "Mastering React Hooks",
    author: "Rahul Patel",
    date: "June 2, 2023",
    description: "Dive deep into React Hooks and learn how to use them effectively in your projects.",
  },
  {
    title: "Python for Data Science",
    author: "Ananya Gupta",
    date: "June 10, 2023",
    description: "Explore how Python can be used for data analysis and machine learning tasks.",
  },
]

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    cover: "/placeholder.svg?height=300&width=200",
  },
]

