import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GFG%20LOGO-638eNrWuLiDqdbJthZaYoDd3uEgU2s.png"
          alt="GeeksforGeeks Student Chapter"
          width={600}
          height={120}
          className="mx-auto mb-8"
          priority
        />
        <h1 className="mb-6 text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
          Empowering Future Tech Leaders
        </h1>
        <p className="mb-8 text-lg text-gray-400 md:text-xl">
          Join the largest coding community at MIT-ADT University
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-[#00A36C] hover:bg-[#008f5d]">
            Join Now
          </Button>
          <Button size="lg" variant="outline" className="text-white">
            Learn More
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
    </section>
  )
}

