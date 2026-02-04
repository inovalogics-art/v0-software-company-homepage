"use client"

import { CheckCircle, Shield, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with industry-leading security practices",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "95% of projects delivered on or before deadline",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description: "Expert engineers assigned exclusively to your project",
  },
]

const benefits = [
  "12+ years of US market expertise",
  "Agile development methodology",
  "24/7 dedicated support",
  "Transparent communication",
  "Competitive pricing",
  "Post-launch maintenance",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
              Faster iteration.{" "}
              <span className="text-primary">More innovation.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              The platform for rapid progress. Let your team focus on building features instead of managing 
              infrastructure with our streamlined development process, integrated collaboration tools, and 
              expert guidance every step of the way.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Logos */}
        <div className="mt-20 pt-16 border-t border-border">
          <p className="text-center text-muted-foreground mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {["TechCorp", "InnovateCo", "DataFlow", "CloudNine", "NextGen", "FutureX"].map((company) => (
              <div
                key={company}
                className="text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
