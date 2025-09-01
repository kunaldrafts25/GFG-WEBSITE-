import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function JoinUs() {
  return (
    <section className="bg-[#00A36C] px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Ready to Join?
        </h2>
        <p className="mb-8 text-lg text-white/90">
          Sign up for our newsletter to stay updated with latest events and
          opportunities
        </p>
        <form className="flex flex-col gap-4 sm:flex-row sm:gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white"
          />
          <Button className="bg-black text-white hover:bg-black/80">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

