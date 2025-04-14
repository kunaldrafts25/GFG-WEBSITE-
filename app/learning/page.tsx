import Image from "next/image"
import { ArrowRight, BookOpen, Code, Database, FileCode, Laptop, Lightbulb, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearningHub() {
  return (
    <div className="min-h-screen bg-gray-50 mt-20 container py-12 px-6 mx-auto">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container px-4 py-8 mx-auto">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                GFG Learning Hub
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Your one-stop resource for computer science learning, practice, and interview preparation.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/GFG LOGO small.png"
                width={400}
                height={200}
                alt="Learning Hub Banner"
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto space-y-12">
        {/* Core CS Subjects */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold tracking-tight">Core CS Subjects</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreSubjects.map((subject) => (
              <ResourceCard
                key={subject.title}
                title={subject.title}
                description={subject.description}
                includes={subject.includes}
                url={subject.url}
              />
            ))}
          </div>
        </section>

        {/* Programming Languages */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold tracking-tight">Programming Languages</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programmingLanguages.map((language) => (
              <ResourceCard
                key={language.title}
                title={language.title}
                description={language.description}
                includes={language.includes}
                url={language.url}
              />
            ))}
          </div>
        </section>

        {/* DSA & Competitive Programming */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold tracking-tight">DSA & Competitive Programming</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dsaTopics.map((topic) => (
              <ResourceCard
                key={topic.title}
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            ))}
          </div>
        </section>

        {/* Web Development */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold tracking-tight">Web Development</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {webDevTopics.map((topic) => (
              <ResourceCard
                key={topic.title}
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            ))}
          </div>
        </section>

        {/* AI & Machine Learning */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold tracking-tight">AI & Machine Learning</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiMlTopics.map((topic) => (
              <ResourceCard
                key={topic.title}
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            ))}
          </div>
        </section>

        {/* Interview Preparation */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <h2 className="text-2xl font-bold tracking-tight">Interview Preparation</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {interviewTopics.map((topic) => (
              <ResourceCard
                key={topic.title}
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            ))}
          </div>
        </section>

        {/* Practice with LeetCode */}
<section className="space-y-4">
  <div className="flex items-center gap-2">
    <Database className="w-5 h-5 text-green-600" />
    <h2 className="text-2xl font-bold tracking-tight">Practice with LeetCode</h2>
  </div>
  <div className="grid gap-4 sm:grid-cols-2">
    <ResourceCard
      title="DSA 75"
      description="Top 75 data structures and algorithms problems to master coding interviews."
      includes={[
        "Array and string manipulation problems",
        "Tree and graph algorithm challenges",
        "Dynamic programming interview questions",
        "Sorting and searching algorithm exercises",
      ]}
      url="https://leetcode.com/list/xi4ci4ig/" // ✅ LeetCode curated DSA list (or use your custom one)
    />
    <ResourceCard
      title="SQL 50"
      description="Essential SQL problems to prepare for database-related interview questions."
      includes={[
        "Basic SELECT, WHERE, and JOIN queries",
        "Aggregation functions and GROUP BY",
        "Window functions and advanced SQL",
        "Database design and optimization problems",
      ]}
      url="https://leetcode.com/problemset/database/" // ✅ LeetCode SQL problems
    />
  </div>
</section>

      </main>
    </div>
  )
}

function ResourceCard({
  title,
  description,
  includes = [
    "Comprehensive tutorials and examples",
    "Practice problems with solutions",
    "Quizzes to test your knowledge",
    "Downloadable resources and cheat sheets",
  ],
  url = "#",
}: {
  title: string
  description: string
  includes?: string[]
  url?: string
}) {
  return (
    <Card className="overflow-hidden transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100">
      <div className="w-full h-40 overflow-hidden">
        <img
          src={`https://source.unsplash.com/400x200/?${encodeURIComponent(title + ',technology')}`}
          alt={`${title} illustration`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>{description}</CardDescription>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Includes:</p>
          <ul className="pl-5 space-y-1 text-sm list-disc text-gray-600">
            {includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            View
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}


// Data
const coreSubjects = [
  {
    "title": "Data Structures",
    "description": "Learn about arrays, linked lists, trees, graphs, and more fundamental data structures.",
    "url": "https://www.geeksforgeeks.org/data-structures/",
    "includes": [
        "Array and string manipulation techniques",
        "Linked lists, stacks, and queues implementation",
        "Tree and graph traversal algorithms",
        "Hash tables and collision resolution",
    ],
},
{
    "title": "Algorithms",
    "description": "Master sorting, searching, dynamic programming, and greedy algorithms.",
    "url": "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
    "includes": [
        "Sorting algorithms and their complexity",
        "Binary search and its variations",
        "Dynamic programming approach and problems",
        "Greedy algorithms with real-world applications",
    ],
},
{
    "title": "Operating Systems",
    "description": "Understand processes, threads, memory management, and file systems.",
    "url": "https://www.geeksforgeeks.org/operating-systems/",
    "includes": [
        "Process scheduling and synchronization",
        "Memory management techniques",
        "File system implementation",
        "Deadlock prevention and recovery",
    ],
},
{
    "title": "Database Management",
    "description": "Learn SQL, normalization, transaction management, and database design.",
    "url": "https://www.geeksforgeeks.org/dbms/",
    "includes": [
        "SQL query optimization techniques",
        "Database normalization and design",
        "Transaction management and ACID properties",
        "NoSQL databases and their use cases",
    ],
},
{
    "title": "Computer Networks",
    "description": "Explore network protocols, architecture, security, and application layer concepts.",
    "url": "https://www.geeksforgeeks.org/computer-network-tutorials/",
    "includes": [
        "TCP/IP protocol suite in depth",
        "Network security fundamentals",
        "Routing algorithms and protocols",
        "Socket programming and network applications",
    ],
},
{
    "title": "Theory of Computation",
    "description": "Study automata theory, formal languages, computability, and complexity theory.",
    "url": "https://www.geeksforgeeks.org/theory-of-computation-automata-tutorials/",
    "includes": [
        "Finite automata and regular expressions",
        "Context-free grammars and pushdown automata",
        "Turing machines and computability",
        "Complexity classes (P, NP, NP-complete)",
    ],
},
]

const programmingLanguages = [
  {
    "title": "C/C++",
    "description": "Learn system programming with powerful languages used in competitive programming.",
    "url": "https://www.geeksforgeeks.org/c-plus-plus/",
    "includes": [
        "Memory management and pointers",
        "Object-oriented programming in C++",
        "STL containers and algorithms",
        "Multi-threading and concurrency",
    ],
},
{
    "title": "Java",
    "description": "Master object-oriented programming with one of the most widely used languages.",
    "url": "https://www.geeksforgeeks.org/java/",
    "includes": [
        "Core Java and OOP concepts",
        "Collections framework and generics",
        "Multithreading and concurrency",
        "Java frameworks (Spring, Hibernate)",
    ],
},
{
    "title": "Python",
    "description": "Explore a versatile language popular in web development, data science, and AI.",
    "url": "https://www.geeksforgeeks.org/python-programming-language/",
    "includes": [
        "Python fundamentals and data structures",
        "Object-oriented programming in Python",
        "Libraries for data science (NumPy, Pandas)",
        "Web frameworks (Django, Flask)",
    ],
},
{
    "title": "JavaScript",
    "description": "Learn the language of the web for building interactive front-end applications.",
    "url": "https://www.geeksforgeeks.org/javascript/",
    "includes": [
        "ES6+ features and syntax",
        "DOM manipulation and events",
        "Asynchronous JavaScript",
        "Web APIs and fetch",
        "Modern ES6+ features",
    ],
},
{
    "title": "Go",
    "description": "Discover a modern language designed for concurrent programming and performance.",
    "url": "https://www.geeksforgeeks.org/golang/",
    "includes": [
        "Go syntax and basic constructs",
        "Concurrency with goroutines and channels",
        "Error handling patterns",
        "Web services and microservices",
    ],
},
{
    "title": "Rust",
    "description": "Explore a systems language focused on safety, speed, and concurrency.",
    "url": "https://www.geeksforgeeks.org/rust-programming-language/",
    "includes": [
        "Ownership, borrowing, and lifetimes",
        "Pattern matching and error handling",
        "Concurrency without data races",
        "Systems programming and WebAssembly",
    ],
},
]

const dsaTopics = [
  {
    "title": "Arrays & Strings",
    "description": "Master fundamental data structures with common interview problems and solutions.",
    "url": "https://www.geeksforgeeks.org/arrays-data-structure/",
    "includes": [
        "Two-pointer techniques",
        "Sliding window algorithms",
        "String manipulation and pattern matching",
        "Matrix operations and traversals",
    ],
},
{
    "title": "Linked Lists",
    "description": "Learn operations, implementations, and common problems on linked data structures.",
    "url": "https://www.geeksforgeeks.org/data-structures/linked-list/",
    "includes": [
        "Singly and doubly linked lists",
        "Fast and slow pointer techniques",
        "Cycle detection algorithms",
        "Merge and sort operations",
    ],
},
{
    "title": "Trees & Graphs",
    "description": "Explore hierarchical and network data structures with traversal algorithms.",
    "url": "https://www.geeksforgeeks.org/binary-tree-data-structure/",
    "includes": [
        "Tree traversals (in-order, pre-order, post-order)",
        "Binary search trees and balancing",
        "Graph representations and traversals",
        "Shortest path algorithms",
    ],
},
{
    "title": "Dynamic Programming",
    "description": "Master the art of breaking down problems into simpler subproblems.",
    "url": "https://www.geeksforgeeks.org/dynamic-programming/",
    "includes": [
        "Memoization and tabulation techniques",
        "Classic DP problems (knapsack, LCS)",
        "State transitions and recurrence relations",
        "Optimization problems",
    ],
},
{
    "title": "Greedy Algorithms",
    "description": "Learn to make locally optimal choices to find global optimum solutions.",
    "url": "https://www.geeksforgeeks.org/greedy-algorithms/",
    "includes": [
        "Activity selection problems",
        "Huffman coding and data compression",
        "Minimum spanning trees",
        "Interval scheduling algorithms",
    ],
},
{
    "title": "Competitive Programming",
    "description": "Practice problem-solving skills with timed challenges and contests.",
    "url": "https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/",
    "includes": [
        "Contest strategies and time management",
        "Problem-solving patterns",
        "Advanced algorithm techniques",
        "Mock contests and practice problems",
    ],
},
]

const webDevTopics = [
  {
    "title": "HTML & CSS",
    "description": "Build the foundation of web development with markup and styling languages.",
    "url": "https://www.geeksforgeeks.org/html-css/",
    "includes": [
        "Semantic HTML5 elements and structure",
        "CSS layouts (Flexbox, Grid)",
        "Responsive design principles",
        "CSS animations and transitions",
    ],
},
{
    "title": "JavaScript & DOM",
    "description": "Learn to create dynamic and interactive web applications.",
    "url": "https://www.geeksforgeeks.org/javascript/",
    "includes": [
        "DOM manipulation and events",
        "Asynchronous JavaScript",
        "Web APIs and fetch",
        "Modern ES6+ features",
    ],
},
{
    "title": "React.js",
    "description": "Master the popular library for building user interfaces and single-page applications.",
    "url": "https://www.geeksforgeeks.org/reactjs-tutorials/",
    "includes": [
        "Component architecture",
        "State management (Context, Redux)",
        "Hooks and functional components",
        "Performance optimization techniques",
    ],
},
{
    "title": "Node.js",
    "description": "Explore server-side JavaScript for building scalable network applications.",
    "url": "https://www.geeksforgeeks.org/nodejs/",
    "includes": [
        "Express.js framework",
        "RESTful API design",
        "Database integration",
        "Authentication and authorization",
    ],
},
{
    "title": "Full Stack Development",
    "description": "Learn to build complete web applications from front-end to back-end.",
    "url": "https://www.geeksforgeeks.org/full-stack-development/",
    "includes": [
        "Client-server architecture",
        "API integration and design",
        "Database design and ORM",
        "Deployment and DevOps basics",
    ],
},
{
    "title": "Web Security",
    "description": "Understand common vulnerabilities and how to secure web applications.",
    "url": "https://www.geeksforgeeks.org/web-security-basics/",
    "includes": [
        "OWASP top 10 vulnerabilities",
        "Authentication and authorization",
        "HTTPS and TLS",
        "Cross-site scripting (XSS) prevention",
    ],
},
]

const aiMlTopics = [
  {
    "title": "HTML & CSS",
    "description": "Build the foundation of web development with markup and styling languages.",
    "url": "https://www.geeksforgeeks.org/html-css/",
    "includes": [
        "Semantic HTML5 elements and structure",
        "CSS layouts (Flexbox, Grid)",
        "Responsive design principles",
        "CSS animations and transitions",
    ],
},
{
    "title": "JavaScript & DOM",
    "description": "Learn to create dynamic and interactive web applications.",
    "url": "https://www.geeksforgeeks.org/javascript/",
    "includes": [
        "DOM manipulation and events",
        "Asynchronous JavaScript",
        "Web APIs and fetch",
        "Modern ES6+ features",
    ],
},
{
    "title": "React.js",
    "description": "Master the popular library for building user interfaces and single-page applications.",
    "url": "https://www.geeksforgeeks.org/reactjs-tutorials/",
    "includes": [
        "Component architecture",
        "State management (Context, Redux)",
        "Hooks and functional components",
        "Performance optimization techniques",
    ],
},
{
    "title": "Node.js",
    "description": "Explore server-side JavaScript for building scalable network applications.",
    "url": "https://www.geeksforgeeks.org/nodejs/",
    "includes": [
        "Express.js framework",
        "RESTful API design",
        "Database integration",
        "Authentication and authorization",
    ],
},
{
    "title": "Full Stack Development",
    "description": "Learn to build complete web applications from front-end to back-end.",
    "url": "https://www.geeksforgeeks.org/full-stack-development/",
    "includes": [
        "Client-server architecture",
        "API integration and design",
        "Database design and ORM",
        "Deployment and DevOps basics",
    ],
},
{
    "title": "Web Security",
    "description": "Understand common vulnerabilities and how to secure web applications.",
    "url": "https://www.geeksforgeeks.org/web-security-basics/",
    "includes": [
        "OWASP top 10 vulnerabilities",
        "Authentication and authorization",
        "HTTPS and TLS",
        "Cross-site scripting (XSS) prevention",
    ],
},
]

const interviewTopics = [
  {
    "title": "Technical Interview Prep",
    "description": "Prepare for coding interviews with practice problems and strategies.",
    "url": "https://www.geeksforgeeks.org/complete-guide-to-interview-preparation/",
    "includes": [
        "Problem-solving approaches",
        "Time and space complexity analysis",
        "Common interview patterns",
        "Mock interview practice",
    ],
},
{
    "title": "System Design",
    "description": "Learn to design scalable, reliable, and maintainable software systems.",
    "url": "https://www.geeksforgeeks.org/system-design-tutorial/",
    "includes": [
        "Scalability and performance",
        "Microservices architecture",
        "Database design and sharding",
        "Load balancing and caching",
    ],
},
{
    "title": "Object-Oriented Design",
    "description": "Master designing software using object-oriented principles and patterns.",
    "url": "https://www.geeksforgeeks.org/software-engineering-object-oriented-design/",
    "includes": [
        "SOLID principles",
        "Design patterns (Creational, Structural, Behavioral)",
        "UML diagrams and modeling",
        "Code refactoring techniques",
    ],
},
{
    "title": "Behavioral Interviews",
    "description": "Prepare for questions about your experience, teamwork, and problem-solving.",
    "url": "https://www.geeksforgeeks.org/hr-interview-preparation-guide/",
    "includes": [
        "STAR method for answering questions",
        "Leadership and teamwork examples",
        "Conflict resolution scenarios",
        "Communication skills practice",
    ],
},
{
    "title": "Resume Building",
    "description": "Create an effective technical resume that highlights your skills and projects.",
    "url": "https://www.geeksforgeeks.org/resume-building-guide/",
    "includes": [
        "Resume formatting and structure",
        "Project descriptions and impact statements",
        "Skills section optimization",
        "ATS-friendly resume techniques",
    ],
},
{
    "title": "Mock Interviews",
    "description": "Practice with simulated interview scenarios to build confidence.",
    "url": "https://www.geeksforgeeks.org/mock-interview/",
    "includes": [
        "Technical coding interviews",
        "System design interview practice",
        "Behavioral question preparation",
        "Feedback and improvement strategies",
    ],
},

]

