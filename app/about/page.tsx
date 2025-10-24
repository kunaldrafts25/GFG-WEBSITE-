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
        <Tabs defaultValue="2025-26" className="w-full">
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
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
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
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
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
    { name: "Madhur Patil", role: "President", photo: "/Core/Madhur.jpg", quote: "Leading with passion and innovation", linkedin: "https://linkedin.com/in/madhurpatil", instagram: "https://instagram.com/simply.madhur", github: "", behance: "" },
    { name: "Dev Hinduja", role: "Vice President", photo: "/Core/Dev.jpg", quote: "Empowering others to achieve greatness", linkedin: "https://linkedin.com/in/janesmith", instagram: "https://instagram.com/janesmith", github: "", behance: "" },
    { name: "Dadasaheb Bhosure", role: "Secretary", photo: "/placeholder.svg?height=400&width=400", quote: "Bringing clarity and focus to the team", linkedin: "https://linkedin.com/in/nidhiphophaliya", instagram: "https://instagram.com/nidhiphophaliya", github: "", behance: "" },
    { name: "Mizan Lakhani", role: "Treasurer", photo: "/Core/Mizan.jpg", quote: "Managing resources with precision and accountability", linkedin: "https://linkedin.com/in/piyushchavan", instagram: "https://instagram.com/piyushchavan", github: "", behance: "" },
  ],
  technical: [
    { name: "Preksha Garg", role: "Technical Team Lead", photo: "/Technical Team/Preksha.jpg", quote: "Leading the technical team to excellence", linkedin: "https://linkedin.com/in/prekshagarg", instagram: "https://instagram.com/prekshagarg", github: "", behance: "" },
    { name: "Vaishnavi Dixit", role: "Technical Team Member", photo: "/Technical Team/Vaishnavi Dixit.jpg", quote: "Innovating with every line of code", linkedin: "https://linkedin.com/in/vaishnavidixit", instagram: "https://instagram.com/vaishnavidixit", github: "", behance: "" },
    { name: "Mahi Shah", role: "Technical Team Member", photo: "/Technical Team/Mahi Shah.jpg", quote: "Passionate about solving problems with technology", linkedin: "https://linkedin.com/in/mahi-shah", instagram: "https://instagram.com/mahi.shah", github: "", behance: "" },
    { name: "Akshada Phatak", role: "Technical Team Member", photo: "/Technical Team/Akshada Phatak_.jpg", quote: "Transforming ideas into technical solutions", linkedin: "https://linkedin.com/in/akshadaphatak", instagram: "https://instagram.com/akshadaphatak", github: "", behance: "" },
    { name: "Vastalya", role: "Technical Team Member", photo: "/Technical Team/Vastalya.jpg", quote: "Building the future, one code at a time", linkedin: "https://linkedin.com/in/vastalya", instagram: "https://instagram.com/vastalya", github: "", behance: "" },
    { name: "Akshay Patra", role: "Technical Team Member", photo: "/Technical Team/AkshayPatra.jpg", quote: "Pushing boundaries with technology", linkedin: "https://linkedin.com/in/akshaypatra", instagram: "https://instagram.com/akshaypatra", github: "", behance: "" },
    { name: "Divyam Desai", role: "Technical Team Member", photo: "/placeholder.svg?height=400&width=400", quote: "Solving complex problems through innovation", linkedin: "https://linkedin.com/in/divyamdesai", instagram: "https://instagram.com/divyamdesai", github: "", behance: "" },
  ],
  design: [
    { name: "Sanjog Bora", role: "Design Lead", photo: "/Design Team/sanjog.png", quote: "Creating designs that speak volumes", linkedin: "https://linkedin.com/in/sanjogbora", instagram: "https://instagram.com/sanjogbora", github: "", behance: "" },
    { name: "Divya Kanojiya", role: "Design Team Member", photo: "/Design Team/Divya kanojiya.jpg", quote: "Bringing creativity to life through design", linkedin: "https://linkedin.com/in/divyakanojiya", instagram: "https://instagram.com/divyakanojiya", github: "", behance: "" },
    { name: "Krishna Kumar Jha", role: "Design Team Member", photo: "/Design Team/Krishna Kumar Jha.jpg", quote: "Designing with purpose and passion", linkedin: "https://linkedin.com/in/krishnakumarjha", instagram: "https://instagram.com/krishnakumarjha", github: "", behance: "" },
    { name: "Tejas Naukudkar", role: "Design Team Member", photo: "/Design Team/Tejas.jpg", quote: "Creating visual experiences that captivate", linkedin: "https://linkedin.com/in/tejasnaukudkar", instagram: "https://instagram.com/tejasnaukudkar", github: "", behance: "" },
    { name: "Purva Mulay", role: "Design Team Member", photo: "/Design Team/Purva Mulay_.jpg", quote: "Transforming ideas into beautiful designs", linkedin: "https://linkedin.com/in/purvamulay", instagram: "https://instagram.com/purvamulay", github: "", behance: "" },
    { name: "Krish Agrawal", role: "Design Team Member", photo: "/Design Team/Krish.jpg", quote: "Designing with a focus on simplicity and elegance", linkedin: "https://linkedin.com/in/krishagrawal", instagram: "https://instagram.com/krishagrawal", github: "", behance: "" },
  ],
  events: [
    { name: "Uttam Gupta", role: "Events Team Lead", photo: "/placeholder.svg?height=400&width=400", quote: "Making events unforgettable", linkedin: "https://linkedin.com/in/uttamgupta", instagram: "https://instagram.com/uttamgupta", github: "", behance: "" },
    { name: "Shloka Pai", role: "Events Management Team", photo: "/Event Management Team/Shloka.png", quote: "Organizing with attention to detail", linkedin: "https://linkedin.com/in/shlokapai", instagram: "https://instagram.com/shlokapai", github: "https://github.com/Shloka-Pai", behance: "" },
    { name: "Kanak Lingwat", role: "Events Management Team", photo: "/Event Management Team/Kanak Lingwat_.jpg", quote: "Creating seamless event experiences", linkedin: "https://linkedin.com/in/kanaklingwat", instagram: "https://instagram.com/kanaklingwat", github: "", behance: "" },
    { name: "Shivam Sharma", role: "Events Management Team", photo: "/Event Management Team/Shivam Sharma_.jpg", quote: "Bringing creativity and structure to events", linkedin: "https://linkedin.com/in/shivamsharma", instagram: "https://instagram.com/shivamsharma", github: "", behance: "" },
    { name: "Raghavendra Dwivedi", role: "Events Management Team", photo: "/Event Management Team/Raghavendra Dwivedi_.jpg", quote: "Mastering the art of event coordination", linkedin: "https://linkedin.com/in/raghavendradowivedi", instagram: "https://instagram.com/raghavendradowivedi", github: "", behance: "" },
    { name: "Taresh Chabukswar", role: "Events Management Team", photo: "/Event Management Team/Taresh Chabukswar.jpg", quote: "Delivering exceptional event experiences", linkedin: "https://linkedin.com/in/tareshchabukswar", instagram: "https://instagram.com/tareshchabukswar", github: "", behance: "" },
    { name: "Suvesha Khan", role: "Events Management Team", photo: "/Event Management Team/Suvesha K.jpg", quote: "Making every event memorable", linkedin: "https://linkedin.com/in/suveshakhan", instagram: "https://instagram.com/suveshakhan", github: "", behance: "" },
  ],
  marketing: [
    { name: "Rutuja Makode", role: "Marketing Team Lead", photo: "/placeholder.svg?height=400&width=400", quote: "Building impactful marketing strategies", linkedin: "https://linkedin.com/in/rutujamakode", instagram: "https://instagram.com/rutujamakode", github: "", behance: "" },
    { name: "Varun", role: "Marketing Team Member", photo: "/Marketing Team/Varun.jpg", quote: "Strategizing for maximum outreach", linkedin: "https://linkedin.com/in/varun", instagram: "https://instagram.com/varun", github: "", behance: "" },
    { name: "Shivam", role: "Marketing Team Member", photo: "/Marketing Team/SHIVam.jpg", quote: "Pushing the boundaries of creativity", linkedin: "https://linkedin.com/in/shivam", instagram: "https://instagram.com/shivam", github: "", behance: "" },
    { name: "Amish", role: "Marketing Team Member", photo: "/Marketing Team/Amish Gupta_.webp", quote: "Innovative marketing ideas that engage", linkedin: "https://linkedin.com/in/amish", instagram: "https://instagram.com/amish", github: "", behance: "" },
    { name: "Vaibhavi", role: "Marketing Team Member", photo: "/Marketing Team/Vaibhavi.jpg", quote: "Delivering brand excellence", linkedin: "https://linkedin.com/in/vaibhavi", instagram: "https://instagram.com/vaibhavi", github: "", behance: "" },
    { name: "Arnav", role: "Marketing Team Member", photo: "/Marketing Team/Arnav Pattnaik_.jpg", quote: "Amplifying brand presence with creativity", linkedin: "https://linkedin.com/in/arnav", instagram: "https://instagram.com/arnav", github: "", behance: "" },
  ],
  social: [
    { name: "Kartik Sharma", role: "Social Media Team Member", photo: "/placeholder.svg?height=400&width=400", quote: "Engaging the audience with creative content", linkedin: "https://linkedin.com/in/kartiksharma", instagram: "https://instagram.com/kartiksharma", github: "", behance: "" },
    { name: "Tejas Itkar", role: "Social Media Team Member", photo: "/placeholder.svg?height=400&width=400", quote: "Creating impact through social media", linkedin: "https://linkedin.com/in/tejasitkar", instagram: "https://instagram.com/tejasitkar", github: "", behance: "" },
    { name: "Saksham", role: "Social Media Team Member", photo: "/placeholder.svg?height=400&width=400", quote: "Building community engagement", linkedin: "https://linkedin.com/in/saksham", instagram: "https://instagram.com/saksham", github: "", behance: "" },
  ],
  website: [
    { name: "Prathm Shah", role: "Website Team Member", photo: "/Website Team/Pratham Shah_.webp", quote: "Engaging the audience with creative content", linkedin: "https://linkedin.com/in/kartiksharma", instagram: "https://instagram.com/kartiksharma", github: "", behance: "" },
    { name: "Meghraj Nair", role: "Website Team Member", photo: "/Website Team/Meghraj Nair.jpeg", quote: "Creating impact through social media", linkedin: "https://linkedin.com/in/tejasitkar", instagram: "https://instagram.com/tejasitkar", github: "", behance: "" },
    { name: "Shaaz Jiwani", role: "Website Team Member", photo: "/Website Team/Shaaz Jiwani.PNG", quote: "Building community engagement", linkedin: "https://linkedin.com/in/saksham", instagram: "https://instagram.com/saksham", github: "", behance: "" },
  ],
}

// --- Team Data 2025-26 ---
const teams2: TeamStructure = {
  core: [
    { name: "Kunal Singh", role: "President", photo: "/Core/Kunal.png", quote: "Leading with vision and dedication", linkedin: "https://www.linkedin.com/in/kunalsinghh25/", instagram: "https://www.instagram.com/__kunalsinghh/", github: "https://github.com/kunaldrafts25", behance: "" },
    { name: "Dadasaheb Bhosure", role: "Vice President", photo: "/Core/Dadasaheb Bhosure .png", quote: "Empowering the team to achieve more", linkedin: "no entry", instagram: "no entry", github: "no entry", behance: "" },
    { name: "Yash Kumar", role: "Secretary", photo: "/Core/Yash.png", quote: "Organizing with precision and clarity", linkedin: "no entry", instagram: "https://www.instagram.com/yashkr29/", github: "https://github.com/Yashkr29", behance: "" },
    // Treasurer removed based on 2025 data structure in the file
  ],
  technical: [
    { name: "Dheerendra Solanki", role: "Technical Team Lead", photo: "/Technical Team/Dheerendra.jpg", quote: "Leading the technical team to new heights", linkedin: "no entry", instagram: "no entry", github: "no entry", behance: "" },
    { name: "Shloka Pai", role: "Technical Team Member", photo: "/Technical Team/Shloka Pai.png", quote: "Innovating with every line of code", linkedin: "https://www.linkedin.com/in/shloka-pai-48a548208/", instagram: "https://www.instagram.com/shlokapai?igsh=d2dqOGI4YmRtdjNo&utm_source=qr", github: "https://github.com/Shloka-Pai", behance: "" },
    { name: "Krish Agrawal", role: "Technical Team Member", photo: "/Technical Team/krish Agrawal.jpg", quote: "Building the future, one code at a time", linkedin: "https://www.linkedin.com/in/krishagrawal75", instagram: "https://www.instagram.com/Krishagrawal.23/", github: "https://github.com/krishagrawal623", behance: "" },
    { name: "Kapil Mohite", role: "Technical Team Member", photo: "/Technical Team/kapil_mohite.jpeg", quote: "Passionate about technology and teamwork", linkedin: "no entry", instagram: "no entry", github: "no entry", behance: "" },
    { name: "Snigdha Singh", role: "Technical Team Member", photo: "/Technical Team/Snigdha.jpg", quote: "Transforming ideas into solutions", linkedin: "Not created yet", instagram: "https://www.instagram.com/_snigy_", github: "not created", behance: "" },
    { name: "Ashutosh Srivastava", role: "Technical Team Member", photo: "/Technical Team/Ashutosh Srivastava .jpg", quote: "Transforming ideas into solutions", linkedin: "no entry", instagram: "no entry", github: "no entry", behance: "" },
    { name: "Ansh Rohilla", role: "Technical Team Member", photo: "/Technical Team/Ansh.png", quote: "Transforming ideas into solutions", linkedin: "https://www.linkedin.com/in/ansh-rohilla-77691a202", instagram: "https://www.instagram.com/duhhitz_anshh?igsh=eDNqeTYxNnprYXVo&utm_source=qr", github: "https://github.com/ansh-rohilla", behance: "" },
  ],
  website: [
    { name: "Aditya Nikam", role: "Website Team Member", photo: "/Website Team/Aditya_Nikam.jpg", quote: "Engaging the audience with creative content", linkedin: "https://www.linkedin.com/in/aditya-nikam-341737322/", instagram: "https://www.instagram.com/aditya_nikam_10/", github: "no entry", behance: "" },
    { name: "Aryan Shridhar Gulhane", role: "Website Team Member", photo: "/Website Team/Aryan Gulhane_ website team1.jpg", quote: "Creating Digital Experiences", linkedin: "https://www.linkedin.com/in/aryan-gulhane-a41b34230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/aryangulhane21", github: "https://github.com/Aryangulhane", behance: "" },
    { name: "Dikshant Rawat", role: "Website Team Member", photo: "/Website Team/Dikshant Rawat.png", quote: "Building community engagement", linkedin: "https://www.linkedin.com/in/dikshant-rawat-8084542a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "https://www.instagram.com/rawt.fht/", github: "https://github.com/Dikshant-Rawat", behance: "" },
  ],
  social: [
    { name: "Hardik Kumar", role: "Social Media Team Lead", photo: "/Social Media Team/Hardik.png", quote: "Engaging the audience with creative content", linkedin: "https://www.linkedin.com/in/hardikkr01", instagram: "https://instagram.com/Rjhardik01", github: "https://github.com/rjhardik01", behance: "" },
    { name: "Mithilesh Deshmukh", role: "Social Media Team Member", photo: "/Social Media Team/Mithilesh .png", quote: "Creating impact through social media", linkedin: "https://www.linkedin.com/in/mithilesh-deshmukh-b39b89296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/_mithilesh_d?igsh=MWRjMXM2N3prNjB5ZA==", github: "https://github.com/Mythh0", behance: "" },
    { name: "Vivek", role: "Social Media Team Member", photo: "/Social Media Team/Vivek.png", quote: "Building community engagement", linkedin: "no entry", instagram: "no entry", github: "no entry", behance: "" },
    { name: "Soham Bodakhe", role: "Social Media Team Member", photo: "/Social Media Team/Soham Bodakhe Sy Soc.jpg", quote: "Building community engagement", linkedin: "https://linkedin.com/in/saksham", instagram: "https://www.instagram.com/iblamesohm/", github: "https://github.com/iblamesohm", behance: "" },
    { name: "Aarya Shah", role: "Social Media Team Member", photo: "/Social Media Team/aarya.png", quote: "Building community engagement", linkedin: "https://www.linkedin.com/in/aarya-shah-838a38365?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "https://www.instagram.com/aaryashah_03?igsh=MTRka3FtM2w0bDNkNg%3D%3D&utm_source=qr", github: "not created", behance: "" },
    { name: "Varad Bhoyar", role: "Social Media Team Member", photo: "/Social Media Team/Varad Bhoyar  Fy SOC.jpg", quote: "Building community engagement", linkedin: "https://www.linkedin.com/in/varad-bhoyar-696855388?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://instagram.com/vaaradd.7", github: "https://github.com/varad0709", behance: "" },
  ],
  design: [
    { name: "Shrawni Avhad", role: "Design Lead", photo: "/Design Team/Shrawni.jpg", quote: "Creating designs that speak volumes", linkedin: "https://www.linkedin.com/in/shrawni-avhad-017b602b9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/_.shrawniii/", github: "", behance: "https://www.behance.net/shrawniavhad", },
    { name: "Joshua Robert", role: "Design Team Member", photo: "/Design Team/Joshua Robert.png", quote: "Bringing creativity to life through design", linkedin: "https://linkedin.com/in/divyakanojiya", instagram: "https://instagram.com/divyakanojiya", github: "https://github.com/codewithjoshuah", behance: "" },
    { name: "Joyce Podili", role: "Design Team Member", photo: "/Design Team/Joyce Podili.png", quote: "Designing with purpose and passion", linkedin: "https://www.linkedin.com/in/joyce-podili-928693373/", instagram: "Don't have one", github: "https://github.com/JoycePodili", behance: "" },
    { name: "Leena Patil", role: "Design Team Member", photo: "/Design Team/Leena Patil .jpg", quote: "Creating visual experiences that captivate", linkedin: "https://www.linkedin.com/in/leena-patil-309093339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "Not on Instagram", github: "https://github.com/leenapatil-cse", behance: "" },
    { name: "Shivansh Maheshwari", role: "Design Team Member", photo: "/Design Team/shivansh maheshwari.png", quote: "Transforming ideas into beautiful designs", linkedin: "https://in.linkedin.com/in/shivansh-undefined-32734a360", instagram: "https://www.instagram.com/shivansh__m/", github: "https://github.com/shivary504", behance: "" },
  ],
  events: [
    { name: "Jayati Kichambare", role: "Events Team Lead", photo: "/Event Management Team/Jayati_Kichambare.jpg", quote: "Making events unforgettable", linkedin: "https://www.linkedin.com/in/jayatik", instagram: "https://www.instagram.com/jayeati?igsh=am5jamY3N2preHNv", github: "https://github.com/jayaatea", behance: "" },
    { name: "Disha Bendre", role: "Events Management Team", photo: "/Event Management Team/Disha Bendre.png", quote: "Organizing with attention to detail", linkedin: "https://www.linkedin.com/in/disha-bendre-62b195354", instagram: "https://www.instagram.com/bendredisha26", github: "https://github.com/Dishu-26", behance: "" },
    { name: "Jaival Tamkuwala", role: "Events Management Team", photo: "/Event Management Team/Jaival Tamkuwala.png", quote: "Creating seamless event experiences", linkedin: "https://www.linkedin.com/in/jaivaltamakuwala/", instagram: "https://www.instagram.com/jaival.12", github: "https://www.github.com/Jaival-12", behance: "" },
    { name: "Reeva Rawat", role: "Events Management Team", photo: "/Event Management Team/S.jpg", quote: "Bringing creativity and structure to events", linkedin: "https://www.linkedin.com/in/reeva-rawat-4baa37259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", instagram: "https://www.instagram.com/rawat_reeva?igsh=MTRvb3lyejd5c3J6Mg%3D%3D&utm_source=qr", github: "https://github.com/reevarawat31", behance: "" },
    { name: "Rudra Mamidwar", role: "Events Management Team", photo: "/Event Management Team/Rudra Mamidwar.png", quote: "Mastering the art of event coordination", linkedin: "https://linkedin.com/in/raghavendradowivedi", instagram: "https://instagram.com/iam_rudra_20", github: "no entry", behance: "" },
    { name: "Shambhavi Mishra", role: "Events Management Team", photo: "/Event Management Team/Shambhavi Mishra.jpg", quote: "Delivering exceptional event experiences", linkedin: "https://www.linkedin.com/in/shambhavi-mishra-357a1928b/", instagram: "https://www.instagram.com/__mishrashambhavi?igsh=MWZkbng4eXRoYzR0Mw%3D%3D&utm_source=qr", github: "https://github.com/shambhavi-318", behance: "" },
    { name: "Tejas Joshi", role: "Events Management Team", photo: "/Event Management Team/Tejas Joshi.png", quote: "Making every event memorable", linkedin: "https://www.linkedin.com/in/tejas-joshi-43301a389?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/tejasjoshi_07?igsh=MWZjaDM3NWNhbmw2dw==", github: "https://www.github.com/devilmaster1007-TJ", behance: "" },
    { name: "Shreya Malhan", role: "Events Management Team", photo: "/Event Management Team/Shreya Malhan.jpg", quote: "Making every event memorable", linkedin: "https://linkedin.com/in/shreya_malhan", instagram: "https://instagram.com/shreya_malhan", github: "no entry", behance: "" },
    { name: "Sarthak Choudhari", role: "Events Management Team", photo: "/Event Management Team/Sarthak Choudhari.jpg", quote: "Making every event memorable", linkedin: "https://www.linkedin.com/in/sarthak-choudhari?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/sarthak__choudhari?igsh=MWloa3gzdjE2YnlxeQ==", github: "https://github.com/sarthC", behance: "" },
    { name: "Tanishq Singh", role: "Events Management Team", photo: "/Event Management Team/Tanishq.png", quote: "Making every event memorable", linkedin: "https://www.linkedin.com/in/tanishq-singh-555856388/", instagram: "https://instagram.com/tanishqsingh.__", github: "https://github.com/tanishqcodes4u", behance: "" },
    { name: "Tatav Shah", role: "Events Management Team", photo: "/Event Management Team/Tatva shah.jpg", quote: "Making every event memorable", linkedin: "Not created yet", instagram: "https://instagram.com/Tatvashah09", github: "Not created yet", behance: "" },
  ],
  marketing: [
    { name: "Tejas Deshpande", role: "Marketing Team Lead", photo: "/Marketing Team/Tejas.jpg", quote: "Building impactful marketing strategies", linkedin: "https://www.linkedin.com/in/tejas-deshpande-43349431a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/tejasdeshpandey?igsh=MTZuaHc2c2FzbGw2Yw==", github: "Not created", behance: "" },
    { name: "Tanmay Srivastava", role: "Marketing Team Member", photo: "/Marketing Team/Tanmay.jpeg", quote: "Strategizing for maximum outreach", linkedin: "https://www.linkedin.com/in/tanmay-srivastava31?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/__tanmay_31?igsh=Z3phazJucmxvaWhl", github: "not created", behance: "" },
    { name: "Kaveri", role: "Marketing Team Member", photo: "/Marketing Team/Kaveri.png", quote: "Pushing the boundaries of creativity", linkedin: "no entry", instagram: "no entry", github: "no entry", behance: "" },
    { name: "Aarush Wagh", role: "Marketing Team Member", photo: "/Marketing Team/Aarush.jpg", quote: "Innovative marketing ideas that engage", linkedin: "https://www.linkedin.com/in/aarush-wagh-296275342?utm_source=share_via&utm_content=profile&utm_medium=member_android", instagram: "https://www.instagram.com/aruss.exe?igsh=MTRqMmkyYXJscndwdg==", github: "https://github.com/AarushW11", behance: "" },
    { name: "Anika Agarwal", role: "Marketing Team Member", photo: "/Marketing Team/Anika Agarwal .jpg", quote: "Delivering brand excellence", linkedin: "https://www.linkedin.com/in/anika-agarwal-b4253b362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/anika._.2710?igsh=dmEwdjhvaDBldGNm", github: "https://github.com/anika2710", behance: "" },
    { name: "Anshul Gupta", role: "Marketing Team Member", photo: "/Marketing Team/Anshul gupta .jpg", quote: "Amplifying brand presence with creativity", linkedin: "https://in.linkedin.com/in/anshul-gupta-510bab353", instagram: "https://www.instagram.com/anshul_09gupta?igsh=NnZ6cWI4dGJzaTRn", github: "https://github.com/ag0928", behance: "" },
    { name: "Subhiksha Ram", role: "Marketing Team Member", photo: "/Marketing Team/Subhiksha.png", quote: "Amplifying brand presence with creativity", linkedin: "https://www.linkedin.com/in/subhiksha-ram-8b9b64324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", instagram: "https://www.instagram.com/subhikshaaaaa_?igsh=MTZyMGFuNmxrdTNmcw==", github: "not created", behance: "" },
  ],
}
