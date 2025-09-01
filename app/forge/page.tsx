'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Github, 
  ExternalLink, 
  Users, 
  Code, 
  Lightbulb, 
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  GitBranch,
  MessageSquare
} from 'lucide-react'

export default function ForgePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <main className="container py-12 mt-20 px-6 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.section variants={itemVariants} className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">
                The GFG Open Source{" "}
                <span className="text-primary">Forge</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                From Personal Project to Community Powerhouse. Let's build together.
              </p>
            </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild>
              <a
                href="https://forms.gle/YBfjQisxVro1v7pm9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/gfgmitadt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                View Active Projects
              </a>
            </Button>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A structured 4-phase journey to transform your ideas into community-driven projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                phase: "Phase 1",
                title: "The Showcase",
                description: "Present your project idea to the community and gather initial feedback",
                icon: <Lightbulb className="h-6 w-6 text-primary" />
              },
              {
                phase: "Phase 2",
                title: "The Pitch",
                description: "Detailed presentation with technical specifications and roadmap",
                icon: <Target className="h-6 w-6 text-primary" />
              },
              {
                phase: "Phase 3",
                title: "The Adoption",
                description: "Community voting and selection of the most promising projects",
                icon: <Users className="h-6 w-6 text-primary" />
              },
              {
                phase: "Phase 4",
                title: "The Foundry",
                description: "Collaborative development with dedicated team and resources",
                icon: <Code className="h-6 w-6 text-primary" />
              }
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-start gap-4 p-6">
                  {item.icon}
                  <div>
                    <Badge variant="secondary" className="mb-2">{item.phase}</Badge>
                    <h3 className="mb-2 font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Why Participate Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Why Participate?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-3 h-6 w-6 text-primary" />
                  For Creators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Transform your personal project into a community-driven initiative",
                    "Gain valuable feedback and mentorship from experienced developers",
                    "Build a strong portfolio with real-world collaborative experience",
                    "Develop leadership and project management skills",
                    "Access to resources and infrastructure support"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  For Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {[
                    "Contribute to meaningful projects that make a real impact",
                    "Learn new technologies and development practices",
                    "Build your GitHub profile with substantial contributions",
                    "Network with like-minded developers and creators",
                    "Gain experience in collaborative software development"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Featured Project Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Featured Project
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Current community spotlight project
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  P
                </div>
              </div>
              <CardTitle className="text-2xl">Project Placeholder</CardTitle>
              <p className="text-muted-foreground">
                An innovative solution that demonstrates the power of community collaboration
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Project Maintainer</p>
                    <p className="text-sm text-muted-foreground">Lead Developer</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repository
                </Button>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discord Channel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Selection Criteria Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Selection Criteria
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Projects are evaluated based on these four key criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Potential for Impact",
                description: "How much value will this project bring to the community and beyond?",
                icon: <Target className="h-6 w-6 text-primary" />
              },
              {
                title: "Potential for Collaboration",
                description: "How well can multiple developers contribute and work together?",
                icon: <Users className="h-6 w-6 text-primary" />
              },
              {
                title: "Technical Foundation",
                description: "Is the project technically sound with clear architecture?",
                icon: <Code className="h-6 w-6 text-primary" />
              },
              {
                title: "Innovation & Originality",
                description: "Does the project bring something new and creative to the table?",
                icon: <Star className="h-6 w-6 text-primary" />
              }
            ].map((criteria, index) => (
              <Card key={index}>
                <CardContent className="flex items-start gap-4 p-6">
                  {criteria.icon}
                  <div>
                    <h3 className="mb-2 font-semibold">{criteria.title}</h3>
                    <p className="text-muted-foreground">
                      {criteria.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </main>
  )
}
