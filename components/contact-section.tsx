"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ArrowRight, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get Started</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Let's discuss your project
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Fill out the form below and we'll get back to you within 24 hours with a custom proposal.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-primary/10 border border-primary/30 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Thank you!</h3>
                <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground">Company</Label>
                    <Input
                      id="company"
                      placeholder="Your Company"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground">Service Interest</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="web-mobile">Web & Mobile Apps</SelectItem>
                        <SelectItem value="uiux">UI/UX Design</SelectItem>
                        <SelectItem value="graphic">Graphic Design</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>

          {/* Booking Section */}
          <div className="bg-background rounded-2xl border border-border p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Book a Strategy Call</h3>
                <p className="text-muted-foreground">Pick a time that works best for you</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Schedule a free 30-minute consultation with our team. We'll discuss your project requirements, 
              timeline, and provide a preliminary estimate. No commitment required.
            </p>

            {/* Mock Calendar Widget */}
            <div className="rounded-xl bg-muted/50 border border-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-foreground">February 2026</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-muted/80">
                    {"<"}
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-muted/80">
                    {">"}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-muted-foreground py-2">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 5 // Offset for February 2026
                  const isValid = day >= 1 && day <= 28
                  const isToday = day === 3
                  const isAvailable = isValid && [5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21].includes(day)
                  
                  return (
                    <button
                      key={i}
                      disabled={!isAvailable}
                      className={`py-2 rounded-lg transition-colors ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : isAvailable
                          ? "hover:bg-primary/20 text-foreground cursor-pointer"
                          : isValid
                          ? "text-muted-foreground/50"
                          : "text-transparent"
                      }`}
                    >
                      {isValid ? day : ""}
                    </button>
                  )
                })}
              </div>
            </div>

            <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted bg-transparent">
              Connect with Calendly
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Or email us directly at{" "}
              <a href="mailto:hello@nexatech.com" className="text-primary hover:underline">
                hello@nexatech.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
