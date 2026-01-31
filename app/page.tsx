"use client"

import { useState, useEffect, useRef } from "react"
import {
  Briefcase,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Star,
  ChevronDown,
  Moon,
  Sun,
  CheckCircle,
  Award,
  Database,
  BarChart3,
  FileSpreadsheet,
  Users,
  GitBranch,
  Send,
  X,
  Linkedin,
  MessageCircle,
  Heart,
  Copyright,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// Data
const experiences = [
  {
    id: "exp1",
    title: "Consultor Independiente",
    company: "Asesoría Financiera Especializada",
    period: "2024 - Presente",
    location: "Temuco",
    achievements: [
      "Implementación de IFRS en 2 empresas con aprobación sin observaciones",
      "Reducción de 20% en tiempos de cierre mediante automatización",
      "Diseño de sistemas de reportería que mejoraron visibilidad de KPIs en 40%",
      "Capacitación de 30+ profesionales en IFRS y herramientas financieras",
    ],
  },
  {
    id: "exp2",
    title: "Gerente de Finanzas",
    company: "SG 2000 S.A. (Sector Agrícola)",
    period: "2022 - 2024",
    location: "Temuco",
    achievements: [
      "Transición exitosa a IFRS en 8 meses con capacitación de equipo (5 personas)",
      "Reducción de tiempo de cierre mensual de 15 a 7 días (53%)",
      "Optimización de estructura de pasivos, reduciendo costo financiero 12%",
      "Forecast con precisión del 92% vs. resultados reales",
    ],
  },
  {
    id: "exp3",
    title: "Jefe de Contabilidad Corporativo",
    company: "Esval S.A. (Servicios Sanitarios)",
    period: "2016 - 2019",
    location: "Valparaíso",
    achievements: [
      "Consolidación de 6 sociedades con cero observaciones CMF/SISS (3 años)",
      "Auditorías sin salvedades (PwC) en 100% de períodos",
      "Reducción de tiempo de consolidación de 12 a 8 días (33%)",
      "Optimización tributaria que redujo carga fiscal en 8% anual",
    ],
  },
]

const education = [
  {
    icon: Award,
    title: "Certificado IFRS (ICAEW)",
    year: "2018",
    description: "Instituto de Contadores Públicos en Inglaterra y Gales | 78% aprobación",
    color: "text-primary",
  },
  {
    icon: Database,
    title: "Inteligencia Artificial Generativa",
    year: "2025",
    description: "Aplicaciones para automatización de procesos empresariales",
    color: "text-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Post-Título Contabilidad Internacional",
    year: "2008",
    description: "Universidad de Santiago de Chile | Diplomado NIIF/IFRS",
    color: "text-sky-500",
  },
  {
    icon: Award,
    title: "Contador Público y Auditor",
    year: "1995",
    description: "Universidad de Magallanes",
    color: "text-amber-500",
  },
]

const skills = [
  { name: "IFRS / Contabilidad", level: 95, icon: BarChart3, color: "bg-primary", description: "Experto Certificado (ICAEW)" },
  { name: "SAP FI-CO", level: 90, icon: Database, color: "bg-emerald-500", description: "Avanzado + Implementación" },
  { name: "Power BI", level: 88, icon: BarChart3, color: "bg-sky-500", description: "Dashboards Avanzados" },
  { name: "Excel", level: 98, icon: FileSpreadsheet, color: "bg-amber-500", description: "Experto (Macros, Power Query)" },
  { name: "Liderazgo", level: 92, icon: Users, color: "bg-rose-500", description: "Hasta 8 personas" },
  { name: "Git/GitHub", level: 75, icon: GitBranch, color: "bg-slate-500", description: "Control de Versiones" },
]

const expertise = [
  "Implementación IFRS",
  "Estados Financieros",
  "Auditorías Externas",
  "Cumplimiento CMF/SISS",
  "Transformación Digital",
  "Implementación SAP",
  "Automatización Procesos",
  "Reportería Ejecutiva",
  "Planificación Tributaria",
]

export default function CVPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (formData.name.trim().length < 3) newErrors.name = "Por favor ingresa tu nombre"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Por favor ingresa un correo válido"
    if (formData.subject.trim().length < 5) newErrors.subject = "Por favor ingresa un asunto"
    if (formData.message.trim().length < 10) newErrors.message = "Por favor ingresa un mensaje"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowSuccess(true)
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setShowSuccess(false)
      }, 3000)
    }
  }

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setErrors({})
    setShowSuccess(false)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = element.offsetTop - 80
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }

  return (
    <div className={cn("min-h-screen bg-background text-foreground transition-colors duration-300")}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollToSection("inicio")}
            className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors"
          >
            <Briefcase className="h-5 w-5" />
            Francisco Moraga
          </button>

          <div className="hidden md:flex items-center gap-6">
            {["inicio", "experiencia", "educacion", "habilidades", "contacto"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm hover:text-primary transition-colors capitalize"
              >
                {section === "educacion" ? "Educación" : section}
              </button>
            ))}
            <Button variant="outline" size="icon" onClick={toggleTheme} className="border-white/20 hover:bg-white/10">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>

          <Button variant="outline" size="icon" onClick={toggleTheme} className="md:hidden border-white/20 hover:bg-white/10">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="inicio"
        ref={(el) => { sectionRefs.current.inicio = el }}
        className="py-16 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-primary flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-primary/20">
                FM
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance">
                Francisco Javier Moraga Cabezas
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <Badge className="bg-primary text-primary-foreground">Contador Público y Auditor</Badge>
                <Badge className="bg-emerald-500 text-white">IFRS Certificado (ICAEW)</Badge>
              </div>

              <p className="text-muted-foreground text-lg mb-6 max-w-2xl text-pretty">
                Especialista en implementación de normativas internacionales, gestión financiera corporativa y
                transformación digital con más de 25 años de experiencia en empresas líderes del mercado chileno.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+56956872559">
                    <Phone className="h-4 w-4 mr-2" />
                    +56 9 5687 2559
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:francisco.moraga@pm.me">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50" asChild>
                  <a href="https://wa.me/56956872559" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="border-sky-500 text-sky-600 hover:bg-sky-50" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>

              <div className="flex justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">25+</p>
                  <p className="text-sm text-muted-foreground">Años Experiencia</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-500">13</p>
                  <p className="text-sm text-muted-foreground">Sociedades Consolidadas</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-sky-500">100%</p>
                  <p className="text-sm text-muted-foreground">Cumplimiento Normativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experiencia"
        ref={(el) => { sectionRefs.current.experiencia = el }}
        className={cn(
          "py-16 bg-muted/50 transition-all duration-700",
          visibleSections.has("experiencia") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            Experiencia Profesional
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {experiences.map((exp, index) => (
              <AccordionItem
                key={exp.id}
                value={exp.id}
                className={cn(
                  "bg-card border rounded-lg shadow-sm transition-all duration-500 hover:shadow-md",
                  visibleSections.has("experiencia") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-2 text-left">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.title}</h3>
                      <p className="text-muted-foreground text-sm">{exp.company}</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground w-fit">{exp.period}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Ubicación:</strong> {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="educacion"
        ref={(el) => { sectionRefs.current.educacion = el }}
        className={cn(
          "py-16 transition-all duration-700",
          visibleSections.has("educacion") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            Educación y Certificaciones
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {education.map((edu, index) => (
              <Card
                key={edu.title}
                className={cn(
                  "transition-all duration-500 hover:shadow-lg hover:-translate-y-1",
                  visibleSections.has("educacion") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6 text-center">
                  <edu.icon className={cn("h-12 w-12 mx-auto mb-4", edu.color)} />
                  <h3 className="font-semibold mb-1">{edu.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{edu.year}</p>
                  <p className="text-xs text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="habilidades"
        ref={(el) => { sectionRefs.current.habilidades = el }}
        className={cn(
          "py-16 bg-muted/50 transition-all duration-700",
          visibleSections.has("habilidades") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <Star className="h-8 w-8 text-primary" />
            Habilidades Técnicas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className={cn(
                  "transition-all duration-500 hover:shadow-lg",
                  visibleSections.has("habilidades") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <skill.icon className={cn("h-6 w-6", skill.color.replace("bg-", "text-"))} />
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", skill.color)}
                      style={{
                        width: visibleSections.has("habilidades") ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="border-t pt-8">
            <h3 className="font-semibold text-lg mb-4">Áreas de Expertise</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {expertise.map((item, index) => (
                <div
                  key={item}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-500",
                    visibleSections.has("habilidades") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${index * 50 + 500}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        ref={(el) => { sectionRefs.current.contacto = el }}
        className={cn(
          "py-16 transition-all duration-700",
          visibleSections.has("contacto") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            Ponte en Contacto
          </h2>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-semibold text-lg mb-4">Información de Contacto</h3>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Dirección</h4>
                  <p className="text-muted-foreground text-sm">
                    Av. Las Encinas 02786, Barrio Inglés
                    <br />
                    Temuco, Araucanía, Chile
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Teléfono</h4>
                  <a href="tel:+56956872559" className="text-primary hover:underline">
                    +56 9 5687 2559
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-rose-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:francisco.moraga@pm.me" className="text-primary hover:underline">
                    francisco.moraga@pm.me
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Linkedin className="h-6 w-6 text-sky-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Mi Perfil LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (e.target.value.trim().length >= 3) setErrors({ ...errors, name: "" })
                    }}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) setErrors({ ...errors, email: "" })
                    }}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Asunto *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value })
                      if (e.target.value.trim().length >= 5) setErrors({ ...errors, subject: "" })
                    }}
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (e.target.value.trim().length >= 10) setErrors({ ...errors, message: "" })
                    }}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="flex gap-3">
                  <Button type="submit" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={handleReset}>
                    <X className="h-4 w-4 mr-2" />
                    Limpiar
                  </Button>
                </div>

                {showSuccess && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    ¡Mensaje enviado correctamente! Te contactaremos pronto.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2 mb-2">
            <Copyright className="h-4 w-4" />
            2026 Francisco Javier Moraga Cabezas - CV Interactivo
          </p>
          <p className="text-slate-400 text-sm mb-4">
            Desarrollado con <Heart className="h-4 w-4 inline text-rose-500" /> | Next.js - React - Tailwind CSS
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10" asChild>
              <a href="tel:+56956872559">
                <Phone className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10" asChild>
              <a href="mailto:francisco.moraga@pm.me">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10" asChild>
              <a href="https://wa.me/56956872559" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
