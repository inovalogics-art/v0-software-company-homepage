"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CTO, TechVentures Inc",
    content: "NexaTech delivered our enterprise platform 2 weeks ahead of schedule. Their attention to detail and technical expertise exceeded our expectations. We've seen a 40% improvement in our operational efficiency.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, HealthFirst",
    content: "Working with NexaTech was a game-changer for our startup. They understood our vision and built a mobile app that our users love. The team's responsiveness and professionalism are unmatched.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Product, RetailMax",
    content: "The UI/UX redesign transformed our e-commerce platform. Conversion rates jumped 35% within the first month. NexaTech's team truly understands how to create user experiences that convert.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            What our clients say about us
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it. Here's what industry leaders have to say about working with NexaTech.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-muted/30 border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 leading-relaxed">{testimonial.content}</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
