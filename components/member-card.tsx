import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { FaLinkedin, FaInstagram } from "react-icons/fa"

interface MemberCardProps {
  name: string
  role: string
  photo: string
  quote: string
  linkedin: string
  instagram: string
}

export function MemberCard({ name, role, photo, quote, linkedin, instagram }: MemberCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={photo || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="mt-2 text-sm italic">"{quote}"</p>
          <div className="mt-4 flex space-x-2">
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <FaLinkedin size={20} />
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

