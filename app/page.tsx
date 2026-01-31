"use client"

import { useState, useEffect, useRef } from "react"
import {
  Briefcase,
  Phone,
  Mail,
  GraduationCap,
  Star,
  MessageSquare,
  MapPin,
  ChevronDown,
  CheckCircle,
  Award,
  Bot,
  BookOpen,
  Scroll,
  BarChart3,
  Database,
  FileSpreadsheet,
  Users,
  Code,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

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
    color: "text-blue-600",
  },
  {
    icon: Bot,
    title: "Inteligencia Artificial Generativa",
    year: "2025",
    description: "Aplicaciones para automatización de procesos empresariales",
    color: "text-emerald-600",
  },
  {
    icon: BookOpen,
    title: "Post-Título Contabilidad Internacional",
    year: "2008",
    description: "Universidad de Santiago de Chile | Diplomado NIIF/IFRS",
    color: "text-cyan-600",
  },
  {
    icon: Scroll,
    title: "Contador Público y Auditor",
    year: "1995",
    description: "Universidad de Magallanes",
    color: "text-amber-600",
  },
]

const skills = [
  { name: "IFRS / Contabilidad", icon: BarChart3, level: 95, description: "Experto Certificado (ICAEW)", color: "bg-blue-600" },
  { name: "SAP FI-CO", icon: Database, level: 90, description: "Avanzado + Implementación", color: "bg-emerald-600" },
  { name: "Power BI", icon: BarChart3, level: 88, description: "Dashboards Avanzados", color: "bg-cyan-600" },
  { name: "Excel", icon: FileSpreadsheet, level: 98, description: "Experto (Macros, Power Query)", color: "bg-amber-600" },
  { name: "Liderazgo", icon: Users, level: 92, description: "Hasta 8 personas", color: "bg-red-600" },
  { name: "Git/GitHub", icon: Code, level: 75, description: "Control de Versiones", color: "bg-slate-600" },
]

const expertiseAreas = [
  ["Implementación IFRS", "Estados Financieros", "Auditorías Externas"],
  ["Cumplimiento CMF/SISS", "Transformación Digital", "Gestión de Equipos"],
]

export default function CVPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [openExperience, setOpenExperience] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formSuccess, setFormSuccess] = useState(false)
  const [countersAnimated, setCountersAnimated] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            setCountersAnimated(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [countersAnimated])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (formData.name.trim().length < 3) errors.name = "El nombre debe tener al menos 3 caracteres"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email inválido"
    if (formData.subject.trim().length < 5) errors.subject = "El asunto debe tener al menos 5 caracteres"
    if (formData.message.trim().length < 10) errors.message = "El mensaje debe tener al menos 10 caracteres"
    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setFormSuccess(true)
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setFormSuccess(false)
      }, 3000)
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const top = element.offsetTop - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-slate-900 text-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <button onClick={() => scrollToSection("inicio")} className="flex items-center gap-2 text-lg font-bold">
            <Briefcase className="h-5 w-5" />
            Francisco Moraga
          </button>
          <div className="hidden items-center gap-6 md:flex">
            {["inicio", "experiencia", "educacion", "habilidades", "contacto"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm capitalize text-slate-300 transition-colors hover:text-white"
              >
                {section === "educacion" ? "Educación" : section}
              </button>
            ))}
            <Button variant="outline" size="icon" onClick={toggleTheme} className="ml-2 border-slate-600 text-white hover:bg-slate-800">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme} className="border-slate-600 text-white hover:bg-slate-800 md:hidden">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" ref={heroRef} className="bg-gradient-to-br from-blue-50 to-slate-100 py-16 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="inline-flex h-48 w-48 items-center justify-center rounded-full border-4 border-blue-600 bg-blue-600 text-5xl font-bold text-white shadow-lg">
                FM
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="mb-4 text-balance text-3xl font-bold text-blue-700 dark:text-blue-400 md:text-4xl">
                Francisco Javier Moraga Cabezas
              </h1>
              <div className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                <Badge className="bg-blue-600 text-white">Contador Público y Auditor</Badge>
                <Badge className="bg-emerald-600 text-white">IFRS Certificado (ICAEW)</Badge>
              </div>
              <p className="mx-auto mb-6 max-w-2xl text-pretty text-slate-600 dark:text-slate-300 lg:mx-0">
                Especialista en implementación de normativas internacionales, gestión financiera corporativa y transformación digital con más de 25 años de experiencia en empresas líderes del mercado chileno.
              </p>
              <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+56956872559">
                    <Phone className="mr-2 h-4 w-4" /> +56 9 5687 2559
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:francisco.moraga@pm.me">
                    <Mail className="mr-2 h-4 w-4" /> Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50" asChild>
                  <a href="https://wa.me/56956872559" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
              <div className="flex justify-center gap-8 lg:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{countersAnimated ? "25+" : "0"}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Años Experiencia</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{countersAnimated ? "13" : "0"}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Sociedades Consolidadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{countersAnimated ? "100%" : "0%"}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Cumplimiento Normativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 flex items-center justify-center gap-3 text-2xl font-bold md:text-3xl">
            <Briefcase className="h-8 w-8 text-blue-600" />
            Experiencia Profesional
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {experiences.map((exp) => (
              <Collapsible key={exp.id} open={openExperience === exp.id} onOpenChange={() => setOpenExperience(openExperience === exp.id ? null : exp.id)}>
                <Card className="transition-transform hover:translate-x-1">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{exp.period}</Badge>
                          <ChevronDown className={cn("h-5 w-5 transition-transform", openExperience === exp.id && "rotate-180")} />
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" /> {exp.location}
                      </p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="educacion" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 flex items-center justify-center gap-3 text-2xl font-bold md:text-3xl">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            Educación y Certificaciones
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {education.map((edu, idx) => (
              <Card key={idx} className="text-center transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <edu.icon className={cn("mx-auto mb-4 h-12 w-12", edu.color)} />
                  <h3 className="mb-1 font-semibold">{edu.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{edu.year}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 flex items-center justify-center gap-3 text-2xl font-bold md:text-3xl">
            <Star className="h-8 w-8 text-blue-600" />
            Habilidades Técnicas
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, idx) => (
              <Card key={idx} className="transition-shadow hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <skill.icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className={cn("h-full rounded-full transition-all duration-1000", skill.color)} style={{ width: `${skill.level}%` }} />
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl border-t pt-8">
            <h3 className="mb-4 text-lg font-semibold">Áreas de Expertise</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {expertiseAreas.map((areas, colIdx) => (
                <div key={colIdx} className="space-y-2">
                  {areas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 flex items-center justify-center gap-3 text-2xl font-bold md:text-3xl">
            <Mail className="h-8 w-8 text-blue-600" />
            Contacto
          </h2>
          <Card className="mx-auto max-w-2xl">
            <CardContent className="pt-6">
              {formSuccess && (
                <div className="mb-4 rounded-lg bg-emerald-100 p-4 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  Mensaje enviado exitosamente. Gracias por contactarme.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={formErrors.subject ? "border-red-500" : ""}
                    />
                    {formErrors.subject && <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={formErrors.message ? "border-red-500" : ""}
                  />
                  {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Enviar Mensaje
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                      setFormErrors({})
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Francisco Javier Moraga Cabezas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
