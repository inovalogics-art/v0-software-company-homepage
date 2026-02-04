"use client"

import { Code2, Smartphone, Palette, PenTool, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom enterprise software solutions built with cutting-edge technologies. Scalable, secure, and tailored to your business needs.",
    features: ["Enterprise Applications", "Cloud Solutions", "API Development", "System Integration"],
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Apps",
    description: "Responsive web applications and native mobile apps that deliver exceptional user experiences across all platforms.",
    features: ["iOS & Android Apps", "Progressive Web Apps", "Cross-Platform Development", "E-commerce Solutions"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that converts visitors into customers. We create intuitive interfaces that delight users.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description: "Compelling visual identities and marketing materials that communicate your brand's story effectively.",
    features: ["Brand Identity", "Marketing Collateral", "Iconography", "Illustrations"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Our collection of tech services spans every stage of digital transformation
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore how we help businesses transform with innovative technology solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-background border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group/btn">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
