import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import SeasonalUrgency from "@/components/sections/seasonal-urgency"
import LiveNotifications from "@/components/live-notifications"

async function getHomePageContent() {
  const supabase = await createClient()

  console.log("[v0] Fetching about content from database...")
  const { data: aboutRows, error } = await supabase.from("site_content").select("*").eq("section", "about")

  console.log("[v0] About content query result:", { aboutRows, error })

  console.log("[v0] Fetching hero content from database...")
  const { data: heroRows, error: heroError } = await supabase.from("site_content").select("*").eq("section", "hero")

  console.log("[v0] Hero content query result:", { heroRows, heroError })

  const aboutContent: any = {}
  if (aboutRows && !error) {
    aboutRows.forEach((row: any) => {
      aboutContent[row.content_key] = row.content_value
    })
  }

  const heroContent: any = {}
  if (heroRows && !heroError) {
    heroRows.forEach((row: any) => {
      heroContent[row.content_key] = row.content_value
    })
  }

  console.log("[v0] Organized about content:", aboutContent)
  console.log("[v0] Organized hero content:", heroContent)

  return {
    aboutContent,
    heroContent,
  }
}

export default async function HomePage() {
  const { aboutContent, heroContent } = await getHomePageContent()

  console.log("[v0] About content passed to component:", aboutContent)
  console.log("[v0] Hero content passed to component:", heroContent)

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection heroContent={heroContent} />
      <SeasonalUrgency />
      <AboutSection aboutContent={aboutContent} />
      <ProductsSection />
      <ContactSection />
      <Footer />
      <LiveNotifications />
    </main>
  )
}
