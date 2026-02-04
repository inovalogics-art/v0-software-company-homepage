import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { ChatWidget } from "@/components/chat-widget"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import type { Service, Project, Testimonial, Category } from "@/lib/types"

async function getData() {
  const supabase = await createClient()

  const [
    { data: categories },
    { data: services },
    { data: projects },
    { data: testimonials },
    { data: settings },
  ] = await Promise.all([
    supabase.from("categories").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("services").select("*, category:categories(*)").eq("is_active", true).order("sort_order"),
    supabase.from("projects").select("*, category:categories(*)").eq("is_active", true).eq("is_featured", true).order("sort_order").limit(4),
    supabase.from("testimonials").select("*").eq("is_active", true).eq("is_featured", true).order("sort_order").limit(6),
    supabase.from("site_settings").select("*"),
  ])

  const settingsMap: Record<string, unknown> = {}
  settings?.forEach((s) => {
    settingsMap[s.key] = s.value
  })

  return {
    categories: (categories || []) as Category[],
    services: (services || []) as Service[],
    projects: (projects || []) as Project[],
    testimonials: (testimonials || []) as Testimonial[],
    settings: settingsMap,
  }
}

export default async function HomePage() {
  const { categories, services, projects, testimonials, settings } = await getData()

  return (
    <main className="min-h-screen bg-background">
      <Navigation settings={settings} />
      <HeroSection settings={settings} />
      <ServicesSection services={services} categories={categories} />
      <AboutSection settings={settings} />
      <PortfolioSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection settings={settings} categories={categories} />
      <Footer settings={settings} />
      <ChatWidget />
    </main>
  )
}
