"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LearningHub() {
  return (
    <main className="container py-12 mt-20 px-6 mx-auto">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:text-left">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight dark:text-gray-200 sm:text-5xl md:text-6xl">
              GFG Learning Hub
            </h1>
            <p className="max-w-[600px] text-gray-600 text-lg md:text-xl leading-relaxed mx-auto md:mx-0">
              Your one-stop resource for computer science learning, practice, and interview preparation.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/GFG LOGO small.png"
              width={400}
              height={200}
              alt="Learning Hub Banner"
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Core CS Subjects */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Core CS Subjects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coreSubjects.map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ResourceCard
                title={subject.title}
                description={subject.description}
                includes={subject.includes}
                url={subject.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Programming Languages */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Programming Languages</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programmingLanguages.map((language, index) => (
            <motion.div
              key={language.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ResourceCard
                title={language.title}
                description={language.description}
                includes={language.includes}
                url={language.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* DSA & Competitive Programming */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">DSA & Competitive Programming</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dsaTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ResourceCard
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Web Development */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Web Development</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {webDevTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ResourceCard
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* AI & Machine Learning */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">AI & Machine Learning</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aiMlTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ResourceCard
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interview Preparation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Interview Preparation</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {interviewTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ResourceCard
                title={topic.title}
                description={topic.description}
                includes={topic.includes}
                url={topic.url}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Practice with LeetCode */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Practice with LeetCode</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ResourceCard
              title="DSA 75"
              description="Top 75 data structures and algorithms problems to master coding interviews."
              includes={[
                "Array and string manipulation problems",
                "Tree and graph algorithm challenges",
                "Dynamic programming interview questions",
                "Sorting and searching algorithm exercises",
              ]}
              url="https://leetcode.com/list/xi4ci4ig/"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ResourceCard
              title="SQL 50"
              description="Essential SQL problems to prepare for database-related interview questions."
              includes={[
                "Basic SELECT, WHERE, and JOIN queries",
                "Aggregation functions and GROUP BY",
                "Window functions and advanced SQL",
                "Database design and optimization problems",
              ]}
              url="https://leetcode.com/problemset/database/"
            />
          </motion.div>
        </div>
      </motion.section>
    </main>
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
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Includes:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {includes.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a href={url} target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full mt-4">
              View Resources
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </CardContent>
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
    "title": "Machine Learning Fundamentals",
    "description": "Learn the core concepts and algorithms that power modern AI systems.",
    "url": "https://www.geeksforgeeks.org/machine-learning/",
    "includes": [
        "Supervised and unsupervised learning",
        "Linear regression and classification",
        "Decision trees and ensemble methods",
        "Model evaluation and validation",
    ],
},
{
    "title": "Deep Learning & Neural Networks",
    "description": "Explore artificial neural networks and deep learning architectures.",
    "url": "https://www.geeksforgeeks.org/deep-learning-tutorial/",
    "includes": [
        "Feedforward and convolutional neural networks",
        "Recurrent neural networks (RNNs, LSTMs)",
        "Backpropagation and optimization",
        "TensorFlow and PyTorch frameworks",
    ],
},
{
    "title": "Natural Language Processing",
    "description": "Master techniques for processing and understanding human language.",
    "url": "https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/",
    "includes": [
        "Text preprocessing and tokenization",
        "Sentiment analysis and classification",
        "Named entity recognition",
        "Transformer models and BERT",
    ],
},
{
    "title": "Computer Vision",
    "description": "Learn to build systems that can interpret and analyze visual information.",
    "url": "https://www.geeksforgeeks.org/computer-vision/",
    "includes": [
        "Image processing and feature extraction",
        "Object detection and recognition",
        "Convolutional neural networks for vision",
        "OpenCV and image manipulation",
    ],
},
{
    "title": "Data Science & Analytics",
    "description": "Extract insights from data using statistical methods and visualization.",
    "url": "https://www.geeksforgeeks.org/data-science-tutorial/",
    "includes": [
        "Data cleaning and preprocessing",
        "Statistical analysis and hypothesis testing",
        "Data visualization with matplotlib/seaborn",
        "Pandas and NumPy for data manipulation",
    ],
},
{
    "title": "AI Ethics & Responsible AI",
    "description": "Understand the ethical implications and responsible development of AI systems.",
    "url": "https://www.geeksforgeeks.org/artificial-intelligence-ethics/",
    "includes": [
        "Bias detection and mitigation",
        "Fairness in machine learning",
        "Privacy-preserving AI techniques",
        "Explainable AI and interpretability",
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

