"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Users, Trophy, Target } from 'lucide-react'
import { MemberCard } from "@/components/member-card"

export default function AboutPage() {
  return (
    <main className="container py-12 mt-20 px-6 mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">About Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          GeeksforGeeks Student Chapter at MIT-ADT University is a community of passionate developers, problem solvers, and tech enthusiasts.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Our Mission</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <mission.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="mb-2 font-semibold">{mission.title}</h3>
                    <p className="text-muted-foreground">{mission.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Our Impact</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Our Teams</h2>
        <Tabs defaultValue="core" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8">

            {Object.keys(teams).map((team) => (
              <TabsTrigger key={team} value={team} className="text-sm">
                {team.charAt(0).toUpperCase() + team.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(teams).map(([teamName, members]) => (
            <TabsContent key={teamName} value={teamName}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {members.map((member) => (
                  <MemberCard key={member.name} {...member} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  )
}


const missions = [
  {
    title: "Foster Learning",
    description:
      "Provide a platform for students to learn and grow their technical skills through workshops, competitions, and hands-on projects.",
    icon: Code,
  },
  {
    title: "Build Community",
    description:
      "Create a supportive environment where students can collaborate, share knowledge, and build lasting connections.",
    icon: Users,
  },
  {
    title: "Drive Excellence",
    description:
      "Encourage students to pursue excellence in their chosen fields through competitions and recognition.",
    icon: Trophy,
  },
  {
    title: "Career Growth",
    description:
      "Help students prepare for their careers through industry exposure, mock interviews, and networking opportunities.",
    icon: Target,
  },
]

const stats = [
  {
    value: "50+",
    label: "Active Members",
  },
  {
    value: "10+",
    label: "Events Conducted",
  },
  {
    value: "100+",
    label: "Project Completed",
  },
  {
    value: "1000+",
    label: "Community Members",
  },
]

const teams = {
  core: [
    {
      name: "Madhur Patil",
      role: "President",
      photo: "/Core/Madhur.jpg",
      quote: "Leading with passion and innovation",
      linkedin: "https://linkedin.com/in/madhurpatil",
      instagram: "https://instagram.com/simply.madhur",
    },
    {
      name: "Dev Hinduja",
      role: "Vice President",
      photo: "/Core/Dev.jpg",
      quote: "Empowering others to achieve greatness",
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
    {
      name: "Dadasaheb Bhosure",
      role: "Secretary",
      photo: "/p",
      quote: "Bringing clarity and focus to the team",
      linkedin: "https://linkedin.com/in/nidhiphophaliya",
      instagram: "https://instagram.com/nidhiphophaliya",
    },
    {
      name: "Mizan Lakhani",
      role: "Treasurer",
      photo: "/Core/Mizan.jpg",
      quote: "Managing resources with precision and accountability",
      linkedin: "https://linkedin.com/in/piyushchavan",
      instagram: "https://instagram.com/piyushchavan",
    },
  ],  
  technical: [
    {
      name: "Preksha Garg",
      role: "Technical Team Lead",
      photo: "/Technical Team/Preksha.jpg",
      quote: "Leading the technical team to excellence",
      linkedin: "https://linkedin.com/in/prekshagarg",
      instagram: "https://instagram.com/prekshagarg",
    },
    {
      name: "Vaishnavi Dixit",
      role: "Technical Team Member",
      photo: "/Technical Team/Vaishnavi Dixit.jpg",
      quote: "Innovating with every line of code",
      linkedin: "https://linkedin.com/in/vaishnavidixit",
      instagram: "https://instagram.com/vaishnavidixit",
    },
    {
      name: "Mahi Shah",
      role: "Technical Team Member",
      photo: "/Technical Team/Mahi Shah.jpg",
      quote: "Passionate about solving problems with technology",
      linkedin: "https://linkedin.com/in/mahi-shah",
      instagram: "https://instagram.com/mahi.shah",
    },
    {
      name: "Akshada Phatak",
      role: "Technical Team Member",
      photo: "/Technical Team/Akshada Phatak_.jpg",
      quote: "Transforming ideas into technical solutions",
      linkedin: "https://linkedin.com/in/akshadaphatak",
      instagram: "https://instagram.com/akshadaphatak",
    },
    {
      name: "Vastalya",
      role: "Technical Team Member",
      photo: "/Technical Team/Vastalya.jpg",
      quote: "Building the future, one code at a time",
      linkedin: "https://linkedin.com/in/vastalya",
      instagram: "https://instagram.com/vastalya",
    },
    {
      name: "Akshay Patra",
      role: "Technical Team Member",
      photo: "/Technical Team/AkshayPatra.jpg",
      quote: "Pushing boundaries with technology",
      linkedin: "https://linkedin.com/in/akshaypatra",
      instagram: "https://instagram.com/akshaypatra",
    },
    {
      name: "Divyam Desai",
      role: "Technical Team Member",
      photo: "/placeholder.svg?height=400&width=400",
      quote: "Solving complex problems through innovation",
      linkedin: "https://linkedin.com/in/divyamdesai",
      instagram: "https://instagram.com/divyamdesai",
    },
  ],
  design: [
    {
      name: "Sanjog Bora",
      role: "Design Lead",
      photo: "/Design Team/sanjog.png",
      quote: "Creating designs that speak volumes",
      linkedin: "https://linkedin.com/in/sanjogbora",
      instagram: "https://instagram.com/sanjogbora",
    },
    {
      name: "Divya Kanojiya",
      role: "Design Team Member",
      photo: "/Design Team/Divya kanojiya.jpg",
      quote: "Bringing creativity to life through design",
      linkedin: "https://linkedin.com/in/divyakanojiya",
      instagram: "https://instagram.com/divyakanojiya",
    },
    {
      name: "Krishna Kumar Jha",
      role: "Design Team Member",
      photo: "/Design Team/Krishna Kumar Jha.jpg",
      quote: "Designing with purpose and passion",
      linkedin: "https://linkedin.com/in/krishnakumarjha",
      instagram: "https://instagram.com/krishnakumarjha",
    },
    {
      name: "Tejas Naukudkar",
      role: "Design Team Member",
      photo: "/Design Team/Tejas.jpg",
      quote: "Creating visual experiences that captivate",
      linkedin: "https://linkedin.com/in/tejasnaukudkar",
      instagram: "https://instagram.com/tejasnaukudkar",
    },
    {
      name: "Purva Mulay",
      role: "Design Team Member",
      photo: "/Design Team/Purva Mulay_.jpg",
      quote: "Transforming ideas into beautiful designs",
      linkedin: "https://linkedin.com/in/purvamulay",
      instagram: "https://instagram.com/purvamulay",
    },
    {
      name: "Krish Agrawal",
      role: "Design Team Member",
      photo: "/Design Team/Krish.jpg",
      quote: "Designing with a focus on simplicity and elegance",
      linkedin: "https://linkedin.com/in/krishagrawal",
      instagram: "https://instagram.com/krishagrawal",
    },
  ],
  events: [
    {
      name: "Uttam Gupta",
      role: "Events Team Lead",
      photo: "/placeholder.svg?height=400&width=400",
      quote: "Making events unforgettable",
      linkedin: "https://linkedin.com/in/uttamgupta",
      instagram: "https://instagram.com/uttamgupta",
    },
    {
      name: "Shloka Pai",
      role: "Events Management Team",
      photo: "/Event Management Team/Shloka.png",
      quote: "Organizing with attention to detail",
      linkedin: "https://linkedin.com/in/shlokapai",
      instagram: "https://instagram.com/shlokapai",
    },
    {
      name: "Kanak Lingwat",
      role: "Events Management Team",
      photo: "/Event Management Team/Kanak Lingwat_.jpg",
      quote: "Creating seamless event experiences",
      linkedin: "https://linkedin.com/in/kanaklingwat",
      instagram: "https://instagram.com/kanaklingwat",
    },
    {
      name: "Shivam Sharma",
      role: "Events Management Team",
      photo: "/Event Management Team/Shivam Sharma_.jpg",
      quote: "Bringing creativity and structure to events",
      linkedin: "https://linkedin.com/in/shivamsharma",
      instagram: "https://instagram.com/shivamsharma",
    },
    {
      name: "Raghavendra Dwivedi",
      role: "Events Management Team",
      photo: "/Event Management Team/Raghavendra Dwivedi_.jpg",
      quote: "Mastering the art of event coordination",
      linkedin: "https://linkedin.com/in/raghavendradowivedi",
      instagram: "https://instagram.com/raghavendradowivedi",
    },
    {
      name: "Taresh Chabukswar",
      role: "Events Management Team",
      photo: "/Event Management Team/Taresh Chabukswar.jpg",
      quote: "Delivering exceptional event experiences",
      linkedin: "https://linkedin.com/in/tareshchabukswar",
      instagram: "https://instagram.com/tareshchabukswar",
    },
    {
      name: "Suvesha Khan",
      role: "Events Management Team",
      photo: "/Event Management Team/Suvesha K.jpg",
      quote: "Making every event memorable",
      linkedin: "https://linkedin.com/in/suveshakhan",
      instagram: "https://instagram.com/suveshakhan",
    },
  ],
  marketing: [
    {
      name: "Rutuja Makode",
      role: "Marketing Team Lead",
      photo: "/placeholder.svg?height=400&width=400",
      quote: "Building impactful marketing strategies",
      linkedin: "https://linkedin.com/in/rutujamakode",
      instagram: "https://instagram.com/rutujamakode",
    },
    
    {
      name: "Varun",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Varun.jpg",
      quote: "Strategizing for maximum outreach",
      linkedin: "https://linkedin.com/in/varun",
      instagram: "https://instagram.com/varun",
    },
    {
      name: "Shivam",
      role: "Marketing Team Member",
      photo: "/Marketing Team/SHIVam.jpg",
      quote: "Pushing the boundaries of creativity",
      linkedin: "https://linkedin.com/in/shivam",
      instagram: "https://instagram.com/shivam",
    },
    {
      name: "Amish",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Amish Gupta_.webp",
      quote: "Innovative marketing ideas that engage",
      linkedin: "https://linkedin.com/in/amish",
      instagram: "https://instagram.com/amish",
    },
    {
      name: "Vaibhavi",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Vaibhavi.jpg",
      quote: "Delivering brand excellence",
      linkedin: "https://linkedin.com/in/vaibhavi",
      instagram: "https://instagram.com/vaibhavi",
    },
    {
      name: "Arnav",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Arnav Pattnaik_.jpg",
      quote: "Amplifying brand presence with creativity",
      linkedin: "https://linkedin.com/in/arnav",
      instagram: "https://instagram.com/arnav",
    },
  ],
  social: [
    {
      name: "Kartik Sharma",
      role: "Social Media Team Member",
      photo: "/placeholder.svg?height=400&width=400",
      quote: "Engaging the audience with creative content",
      linkedin: "https://linkedin.com/in/kartiksharma",
      instagram: "https://instagram.com/kartiksharma",
    },
    {
      name: "Tejas Itkar",
      role: "Social Media Team Member",
      photo: "/placeholder.svg?height=400&width=400",
      quote: "Creating impact through social media",
      linkedin: "https://linkedin.com/in/tejasitkar",
      instagram: "https://instagram.com/tejasitkar",
    },
    {
      name: "Saksham",
      role: "Social Media Team Member",
      photo: "/placeholder.svg?height=400&width=400",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
  ],
  website: [
    {
      name: "Prathm Shah",
      role: "Website Team Member",
      photo: "/Website Team/Pratham Shah_.webp",
      quote: "Engaging the audience with creative content",
      linkedin: "https://linkedin.com/in/kartiksharma",
      instagram: "https://instagram.com/kartiksharma",
    },
    {
      name: "Meghraj Nair",
      role: "Website Team Member",
      photo: "/Website Team/Meghraj Nair.jpeg",
      quote: "Creating impact through social media",
      linkedin: "https://linkedin.com/in/tejasitkar",
      instagram: "https://instagram.com/tejasitkar",
    },
    {
      name: "Shaaz Jiwani",
      role: "Website Team Member",
      photo: "/Website Team/Shaaz Jiwani.PNG",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
  ],
}
