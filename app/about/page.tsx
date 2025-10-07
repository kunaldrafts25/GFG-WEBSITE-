"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Users, Trophy, Target } from 'lucide-react'
import { MemberCard } from "@/components/member-card"
import { Mission, Statistic, TeamStructure, Member } from "@/types"

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
        <Tabs defaultValue="2024-25" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-2 mb-8">
          <TabsTrigger value="2025-26" className="text-sm">
              2025-26 Team
            </TabsTrigger>
            <TabsTrigger value="2024-25" className="text-sm">
              2024-25 Team
            </TabsTrigger>
            
          </TabsList>
          
          <TabsContent value="2024-25">
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
                    {members.map((member: Member) => (
                      <MemberCard key={member.name} {...member} />
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
          
          <TabsContent value="2025-26">
            <Tabs defaultValue="core" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8">
                {Object.keys(teams2).map((team) => (
                  <TabsTrigger key={team} value={team} className="text-sm">
                    {team.charAt(0).toUpperCase() + team.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(teams2).map(([teamName, members]) => (
                <TabsContent key={teamName} value={teamName}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {members.map((member: Member) => (
                      <MemberCard key={member.name} {...member} />
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}


const missions: Mission[] = [
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

const stats: Statistic[] = [
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

const teams: TeamStructure = {
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

const teams2: TeamStructure = {
  core: [
    {
      name: "Kunal Singh",
      role: "President",
      photo: "/Core/Kunal.png",
      quote: "Leading with vision and dedication",
      linkedin: "",
      instagram: "",
    },
    {
      name: "Dadasaheb Bhosure",
      role: "Vice President",
      photo: "/Core/Dadasaheb Bhosure .png",
      quote: "Empowering the team to achieve more",
      linkedin: "",
      instagram: "",
    },
    {
      name: "Yash Kumar",
      role: "Secretary",
      photo: "/Core/Yash.png",
      quote: "Organizing with precision and clarity",
      linkedin: "",
      instagram: "",
    },
    // Treasurer removed as requested
  ],
  technical: [
    {
      name: "Dheerendra Solanki",
      role: "Technical Team Lead",
      photo: "/Technical Team/Dheerendra.jpg",
      quote: "Leading the technical team to new heights",
      linkedin: "",
      instagram: "",
    },
    {
      name: "Shloka Pai",
      role: "Technical Team Member",
      photo: "/Technical Team/Shloka Pai.png",
      quote: "Innovating with every line of code",
      linkedin: "",
      instagram: "",
    },
    {
      name: "Krish Agrawal",
      role: "Technical Team Member",
      photo: "/Technical Team/krish Agrawal.jpg",
      quote: "Building the future, one code at a time",
      linkedin: "rtweyjuykiloikuytre",
      instagram: "retyuioiuytrew",
    },
    {
      name: "Kapil Mohite",
      role: "Technical Team Member",
      photo: "/Technical Team/kapil_mohite.jpeg",
      quote: "Passionate about technology and teamwork",
      linkedin: "",
      instagram: "",
    },
    {
      name: "Snigdha Singh",
      role: "Technical Team Member",
      photo: "/Technical Team/Snigdha.jpg",
      quote: "Transforming ideas into solutions",
      linkedin: "asdfghjkl",
      instagram: "asdfghjk",
    },
    {
      name: "Ashutosh Srivastava",
      role: "Technical Team Member",
      photo: "/Technical Team/Ashutosh Srivastava .jpg",
      quote: "Transforming ideas into solutions",
      linkedin: "",
      instagram: "",
    },
    {
      name: "Ansh",
      role: "Technical Team Member",
      photo: "/Technical Team/Ansh.png",
      quote: "Transforming ideas into solutions",
      linkedin: "",
      instagram: "",
    },
  ],
  design: [
    {
      name: "Shrawni Avhad",
      role: "Design Lead",
      photo: "/Design Team/sanjo.png",
      quote: "Creating designs that speak volumes",
      linkedin: "https://linkedin.com/in/sanjogbora",
      instagram: "https://www.instagram.com/_.shrawniii/",
    },
    {
      name: "Joshua Robert",
      role: "Design Team Member",
      photo: "/Design Team/Joshua Robert.png",
      quote: "Bringing creativity to life through design",
      linkedin: "https://linkedin.com/in/divyakanojiya",
      instagram: "https://instagram.com/divyakanojiya",
    },
    {
      name: "Joyce Podili",
      role: "Design Team Member",
      photo: "/Design Team/Joyce Podili.png",
      quote: "Designing with purpose and passion",
      linkedin: "https://linkedin.com/in/krishnakumarjha",
      instagram: "https://instagram.com/krishnakumarjha",
    },
    {
      name: "Leena Patil",
      role: "Design Team Member",
      photo: "/Design Team/Leena Patil .jpg",
      quote: "Creating visual experiences that captivate",
      linkedin: "https://linkedin.com/in/tejasnaukudkar",
      instagram: "https://instagram.com/tejasnaukudkar",
    },
    {
      name: "Shivansh Maheshwari",
      role: "Design Team Member",
      photo: "/Design Team/shivansh maheshwari.png",
      quote: "Transforming ideas into beautiful designs",
      linkedin: "https://linkedin.com/in/purvamulay",
      instagram: "https://instagram.com/purvamulay",
    },
  ],
  events: [
    {
      name: "Jayanti Kichambare",
      role: "Events Team Lead",
      photo: "/Event Management Team/Jayati_Kichambare.jpg",
      quote: "Making events unforgettable",
      linkedin: "https://linkedin.com/in/uttamgupta",
      instagram: "https://instagram.com/uttamgupta",
    },
    {
      name: "Disha Bendre",
      role: "Events Management Team",
      photo: "/Event Management Team/Disha Bendre.png",
      quote: "Organizing with attention to detail",
      linkedin: "https://linkedin.com/in/shlokapai",
      instagram: "https://instagram.com/shlokapai",
    },
    {
      name: "Jaival Tamkuwala",
      role: "Events Management Team",
      photo: "/Event Management Team/Jaival Tamkuwala.png",
      quote: "Creating seamless event experiences",
      linkedin: "https://linkedin.com/in/kanaklingwat",
      instagram: "https://instagram.com/kanaklingwat",
    },
    {
      name: "Reeva Rawat",
      role: "Events Management Team",
      photo: "/Event Management Team/S.jpg",
      quote: "Bringing creativity and structure to events",
      linkedin: "https://linkedin.com/in/shivamsharma",
      instagram: "https://instagram.com/shivamsharma",
    },
    {
      name: "Rudra Mamidwar",
      role: "Events Management Team",
      photo: "/Event Management Team/Rudra Mamidwar.png",
      quote: "Mastering the art of event coordination",
      linkedin: "https://linkedin.com/in/raghavendradowivedi",
      instagram: "https://instagram.com/raghavendradowivedi",
    },
    {
      name: "Shambhavi Mishra",
      role: "Events Management Team",
      photo: "/Event Management Team/Shambhavi Mishra.jpg",
      quote: "Delivering exceptional event experiences",
      linkedin: "https://linkedin.com/in/tareshchabukswar",
      instagram: "https://instagram.com/tareshchabukswar",
    },
    {
      name: "Tejas Joshi",
      role: "Events Management Team",
      photo: "/Event Management Team/Tejas Joshi.png",
      quote: "Making every event memorable",
      linkedin: "https://linkedin.com/in/suveshakhan",
      instagram: "https://instagram.com/suveshakhan",
    },
    {
      name: "Shreya Malhan",
      role: "Events Management Team",
      photo: "/Event Management Team/Shreya Malhan.jpg",
      quote: "Making every event memorable",
      linkedin: "https://linkedin.com/in/suveshakhan",
      instagram: "https://instagram.com/suveshakhan",
    },
    {
      name: "Sarthak Choudhari",
      role: "Events Management Team",
      photo: "/Event Management Team/Sarthak Choudhari.jpg",
      quote: "Making every event memorable",
      linkedin: "https://linkedin.com/in/suveshakhan",
      instagram: "https://instagram.com/suveshakhan",
    },
    {
      name: "Tanishq Singh",
      role: "Events Management Team",
      photo: "/Event Management Team/Tanishq.png",
      quote: "Making every event memorable",
      linkedin: "https://linkedin.com/in/suveshakhan",
      instagram: "https://instagram.com/suveshakhan",
    },
    {
      name: "Tatav Shah",
      role: "Events Management Team",
      photo: "/Event Management Team/Tatva shah.jpg",
      quote: "Making every event memorable",
      linkedin: "https://linkedin.com/in/suveshakhan",
      instagram: "https://instagram.com/suveshakhan",
    },
  ],
  marketing: [
    {
      name: "Tejas Deshpande",
      role: "Marketing Team Lead",
      photo: "/Marketing Team/Tejas.jpg",
      quote: "Building impactful marketing strategies",
      linkedin: "https://linkedin.com/in/rutujamakode",
      instagram: "https://instagram.com/rutujamakode",
    },
    
    {
      name: "Tanmay",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Tanmay.jpeg",
      quote: "Strategizing for maximum outreach",
      linkedin: "https://linkedin.com/in/varun",
      instagram: "https://instagram.com/varun",
    },
    {
      name: "Kaveri",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Kaveri.png",
      quote: "Pushing the boundaries of creativity",
      linkedin: "https://linkedin.com/in/shivam",
      instagram: "https://instagram.com/shivam",
    },
    {
      name: "Aarush Wagh",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Aarush.jpg",
      quote: "Innovative marketing ideas that engage",
      linkedin: "https://linkedin.com/in/amish",
      instagram: "https://instagram.com/amish",
    },
    {
      name: "Anika Agarwal",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Anika Agarwal .jpg",
      quote: "Delivering brand excellence",
      linkedin: "https://linkedin.com/in/vaibhavi",
      instagram: "https://instagram.com/vaibhavi",
    },
    {
      name: "Anshul Gupta",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Anshul gupta .jpg",
      quote: "Amplifying brand presence with creativity",
      linkedin: "https://in.linkedin.com/in/anshul-gupta-510bab353",
      instagram: "https://www.instagram.com/anshul_09gupta?igsh=NnZ6cWI4dGJzaTRn",
    },
    {
      name: "Subhiksha Ram",
      role: "Marketing Team Member",
      photo: "/Marketing Team/Subhiksha.png",
      quote: "Amplifying brand presence with creativity",
      linkedin: "https://linkedin.com/in/arnav",
      instagram: "https://instagram.com/arnav",
    },
  ],
  social: [
    {
      name: "Hardik Kumar",
      role: "Social Media Team Lead",
      photo: "/Social Media Team/Hardik.png",
      quote: "Engaging the audience with creative content",
      linkedin: "https://linkedin.com/in/kartiksharma",
      instagram: "https://instagram.com/kartiksharma",
    },
    {
      name: "Mithilesh",
      role: "Social Media Team Member",
      photo: "/Social Media Team/Mithilesh .png",
      quote: "Creating impact through social media",
      linkedin: "https://linkedin.com/in/tejasitkar",
      instagram: "https://instagram.com/tejasitkar",
    },
    {
      name: "Vivek",
      role: "Social Media Team Member",
      photo: "/Social Media Team/Vivek.png",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
    {
      name: "Soham Bodakhe",
      role: "Social Media Team Member",
      photo: "/Social Media Team/Soham Bodakhe Sy Soc.jpg",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
    {
      name: "Aarya Shah",
      role: "Social Media Team Member",
      photo: "/Social Media Team/aarya.png",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
    {
      name: "Varad Bhoyar",
      role: "Social Media Team Member",
      photo: "/Social Media Team/Varad Bhoyar  Fy SOC.jpg",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
  ],
  website: [
    {
      name: "Aditya Nikam",
      role: "Website Team Member",
      photo: "/Website Team/Aditya_Nikam.jpg",
      quote: "Engaging the audience with creative content",
      linkedin: "https://www.linkedin.com/in/aditya-nikam-341737322/",
      instagram: "https://www.instagram.com/aditya_nikam_10/",
    },
    {
      name: "Aryan Gulhane",
      role: "Website Team Member",
      photo: "/Website Team/Aryan Gulhane_ website team.jpg",
      quote: "Creating impact through social media",
      linkedin: "https://linkedin.com/in/tejasitkar",
      instagram: "https://instagram.com/tejasitkar",
    },
    {
      name: "Dikshant Rawat",
      role: "Website Team Member",
      photo: "/Website Team/Dikshant Rawat.png",
      quote: "Building community engagement",
      linkedin: "https://linkedin.com/in/saksham",
      instagram: "https://instagram.com/saksham",
    },
  ],
}

