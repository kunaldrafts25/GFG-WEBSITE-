import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { FaLinkedin, FaInstagram } from "react-icons/fa"
import { MemberCardProps } from "@/types"

export function MemberCard({ name, role, photo, quote, linkedin, instagram }: MemberCardProps) {
  return (
    <Card className="flex flex-col items-center text-center p-4">
      <div className="w-48 h-48 relative rounded-full overflow-hidden">
        <Image
          src={photo || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="mt-4 p-0 w-full">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="mt-2 text-sm italic">"{quote}"</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaLinkedin size={20} />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={20} />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
