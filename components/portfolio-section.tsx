"use client"

import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "FinanceFlow Dashboard",
    category: "Web Application",
    description: "Enterprise financial management platform with real-time analytics and reporting.",
    tags: ["React", "Node.js", "PostgreSQL"],
    result: "40% increase in operational efficiency",
    color: "from-[#0A2E6E] to-[#00A8FF]",
  },
  {
    title: "HealthTrack Mobile",
    category: "Mobile App",
    description: "HIPAA-compliant patient management app for healthcare providers.",
    tags: ["React Native", "AWS", "GraphQL"],
    result: "150K+ active users",
    color: "from-[#00A8FF] to-[#0A2E6E]",
  },
  {
    title: "RetailHub E-commerce",
    category: "E-commerce Platform",
    description: "Scalable multi-vendor marketplace with AI-powered recommendations.",
    tags: ["Next.js", "Stripe", "MongoDB"],
    result: "$2M+ in monthly transactions",
    color: "from-[#0A2E6E] to-[#00A8FF]",
  },
  {
    title: "LogiTrack System",
    category: "Enterprise Software",
    description: "Real-time fleet management and logistics optimization platform.",
    tags: ["Python", "IoT", "Machine Learning"],
    result: "30% reduction in delivery times",
    color: "from-[#00A8FF] to-[#0A2E6E]",
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Case studies that showcase real results
          </h2>
          <p className="text-muted-foreground text-lg">
            See how we've helped businesses transform their digital presence and achieve measurable growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20" />
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                  <span className="text-sm text-muted-foreground">{project.result}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
