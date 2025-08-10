"use client"

import { Menu, X, Instagram, Github, Send, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"


import React, { useState } from "react"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalMessage, setModalMessage] = useState("")
  const [modalSuccess, setModalSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    message: "",
  })

  const [isPending, setIsPending] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    closeMenu()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)

    console.log("Enviando formulário")

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      setModalTitle(data.success ? "Sucesso!" : "Erro")
      setModalMessage(data.message)
      setModalSuccess(data.success)
      setIsModalOpen(true)
      if (data.success) {
        setFormData({ name: "", email: "", confirmEmail: "", message: "" })
      }
    } catch {
      setModalTitle("Erro")
      setModalMessage("Ocorreu um erro ao enviar o formulário. Tente novamente em instantes")
      setModalSuccess(false)
      setIsModalOpen(true)
    } finally {
      setIsPending(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="relative">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center bg-gradient-to-r from-[#8f37e1] via-[#9d4eed] to-[#824fb1] w-full h-20 px-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Logo do site"
                width={60}
                height={60}
                className="rounded-full border-2 border-white/20 shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
            <div className="text-white">
              <h2 className="font-bold text-lg">HSO Solutions</h2>
              <p className="text-xs opacity-90">Soluções em Software</p>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-1">
              {[
                { label: "HOME", id: "sobre" },
                { label: "SOBRE", id: "sobre" },
                { label: "SKILLS", id: "skills" },
                { label: "SERVIÇOS", id: "portfolio" },
                { label: "CONTATO", id: "formulario-contato" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white px-4 py-2 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 font-medium"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-[#8f37e1] to-[#824fb1] px-4 py-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Logo do site"
              width={50}
              height={50}
              className="rounded-full border border-white/20"
            />
            <div className="text-white">
              <h2 className="font-bold text-sm">HSO Solutions</h2>
              <p className="text-xs opacity-90">Soluções em Software</p>
            </div>
          </div>
          <button onClick={toggleMenu} className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={closeMenu} />
            <div className="fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-[#8f37e1] to-[#824fb1] z-50 transform transition-transform duration-300 shadow-2xl">
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h3 className="text-white font-bold">Menu</h3>
                <button onClick={closeMenu} className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <nav className="p-4">
                {[
                  { label: "HOME", id: "sobre" },
                  { label: "SOBRE", id: "sobre" },
                  { label: "SKILLS", id: "skills" },
                  { label: "SERVIÇOS", id: "portfolio" },
                  { label: "CONTATO", id: "formulario-contato" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white p-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </header>

      <main>
        {/* Hero/About Section */}
        <section
          id="sobre"
          className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#8f37e1]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#824fb1]/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center min-h-screen">
            <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
                  Transformando Ideias em Realidade
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 font-light">
                  Soluções tecnológicas inovadoras para o seu negócio
                </p>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-gray-200">
                <p>
                  Nossa missão é desenvolver sistemas, sites e ferramentas personalizadas que atendam exatamente às suas
                  necessidades. Combinamos visão técnica atualizada com prática para criar soluções tecnológicas
                  inovadoras.
                </p>
                <p>
                  Cada projeto é planejado com atenção aos mínimos detalhes, sempre buscando oferecer resultados
                  práticos, funcionais e alinhados aos seus objetivos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => scrollToSection("formulario-contato")}
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#8f37e1] to-[#824fb1] rounded-full font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Solicitar Orçamento</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9d4eed] to-[#9333ea] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button
                    onClick={() => scrollToSection("portfolio")}
                    className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >
                    Ver Serviços
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8f37e1]/30 to-[#824fb1]/30 rounded-3xl blur-2xl transform rotate-6"></div>
                <Image
                  src="/images/img-sobre.png"
                  alt="Criação de site"
                  width={500}
                  height={400}
                  className="relative z-10 rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Habilidades e Tecnologias
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Domínio em tecnologias modernas para criar soluções completas e eficientes
              </p>
            </div>

            <div className=" text-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  img: "/images/html.png",
                  title: "HTML5",
                  description:
                    "Estruturação semântica e acessível de páginas web modernas, criando bases sólidas para projetos escaláveis.",
                },
                {
                  img: "/images/css.png",
                  title: "CSS3 & Design",
                  description:
                    "Interfaces responsivas e atraentes com animações fluidas, garantindo experiência excepcional em todos os dispositivos.",
                },
                {
                  img: "/images/javascript.png",
                  title: "JavaScript",
                  description:
                    "Interatividade avançada e funcionalidades dinâmicas que transformam sites em aplicações modernas e envolventes.",
                },
                {
                  img: "/images/React-icon.png",
                  title: "React",
                  description:
                    "Desenvolvimento de aplicações web modernas e performáticas com componentes reutilizáveis e renderização otimizada.",
                },
                {
                  img: "/images/node-js.png",
                  title: "Node.js",
                  description:
                    "APIs escaláveis e servidores de alta performance para aplicações que demandam velocidade e confiabilidade.",
                },
                {
                  img: "/images/typescript-icon.png",
                  title: "TypeScript",
                  description:
                    "Desenvolvimento mais seguro e produtivo com tipagem estática, reduzindo bugs e melhorando a manutenibilidade do código.",
                },
              ].map((skill, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8f37e1]/5 to-[#824fb1]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <Image
                        src={skill.img || "/placeholder.svg"}
                        alt={skill.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8f37e1]/20 to-[#824fb1]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{skill.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-center">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="portfolio"
          className="py-20 bg-gradient-to-br from-[#8f37e1] via-[#9d4eed] to-[#824fb1] relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Nossos Serviços</h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
                Soluções completas e personalizadas para transformar sua visão em realidade digital. Cada projeto é
                único e desenvolvido com excelência técnica.
              </p>
            </div>

            <div className=" text-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Sistemas Web Personalizados",
                  description:
                    "Desenvolvimento de sistemas CRUD completos com React/Next.js para gestão empresarial, controle de estoque, CRM e dashboards inteligentes.",
                  icon: "🔧",
                },
                {
                  title: "Sites & Landing Pages",
                  description:
                    "Criação de sites modernos com Next.js, responsivos e otimizados para SEO, com foco em conversão e experiência do usuário.",
                  icon: "🌐",
                },
                {
                  title: "Automação com JavaScript",
                  description:
                    "Scripts Node.js para automatizar processos repetitivos, web scraping, integração de sistemas e workflows empresariais.",
                  icon: "🤖",
                },
                {
                  title: "APIs & Integrações",
                  description:
                    "Desenvolvimento de APIs RESTful com Node.js e integração entre sistemas para comunicação eficiente de dados.",
                  icon: "🔗",
                },
                {
                  title: "Consultoria Técnica",
                  description:
                    "Orientação especializada em arquitetura JavaScript/TypeScript, escolha de tecnologias e otimização de performance.",
                  icon: "💡",
                },
                {
                  title: "UX/UI Design",
                  description:
                    "Prototipação de interfaces modernas com React e design systems completos para experiências digitais excepcionais.",
                  icon: "🎨",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-purple-100 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="formulario-contato" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8f37e1] to-[#824fb1] bg-clip-text text-transparent mb-6">
                  Pronto para Transformar sua Ideia?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Solicite um orçamento personalizado e descubra como podemos impulsionar seu negócio com tecnologia de
                  ponta
                </p>
              </div>

              {/* Benefits Cards */}
              <div className="text-xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: "⚡",
                    title: "Desenvolvimento Ágil",
                    description:
                      "Entrega rápida com metodologias modernas e comunicação transparente durante todo o processo.",
                  },
                  {
                    icon: "🎯",
                    title: "Soluções Sob Medida",
                    description:
                      "Cada projeto é único e desenvolvido especificamente para atender suas necessidades e objetivos.",
                  },
                  {
                    icon: "🚀",
                    title: "Tecnologia de Ponta",
                    description:
                      "Utilizamos as mais modernas tecnologias JavaScript/TypeScript para garantir performance e escalabilidade.",
                  },
                  {
                    icon: "💎",
                    title: "Qualidade Premium",
                    description:
                      "Código limpo, documentado e testado, com suporte contínuo e manutenção especializada.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{benefit.icon}</div>
                      <div>
                        <h3 className="  font-bold text-gray-800 mb-2">{benefit.title}</h3>
                        <p className=" text-xl text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Solicitar Orçamento</h3>
                  <p className="text-gray-600">Preencha o formulário e receba uma proposta personalizada</p>
                </div>

                <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-lg font-bold text-gray-900">
                        Nome Completo *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled={!!isPending}
                        className="h-12 rounded-xl border-gray-200 focus:border-[#8f37e1] focus:ring-[#8f37e1] transition-colors"
                        placeholder="Seu nome completo"
                        onChange={handleChange}
                        value={formData.name}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-lg font-bold text-gray-900">
                        E-mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        disabled={!!isPending}
                        className=" h-12 rounded-xl border-gray-200 focus:border-[#8f37e1] focus:ring-[#8f37e1] transition-colors"
                        placeholder="seu@email.com"
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmEmail" className="text-lg font-bold text-gray-900">
                      Confirmar E-mail *
                    </label>
                    <Input
                      id="confirmEmail"
                      name="confirmEmail"
                      type="email"
                      required
                      disabled={!!isPending}
                      className="h-12 rounded-xl border-gray-200 focus:border-[#8f37e1] focus:ring-[#8f37e1] transition-colors"
                      placeholder="Confirme seu e-mail"
                      onChange={handleChange}
                      value={formData.confirmEmail}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-lg font-bold text-gray-900">
                      Descreva seu Projeto *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      disabled={!!isPending}
                      rows={6}
                      className="rounded-xl border-gray-200 focus:border-[#8f37e1] focus:ring-[#8f37e1] transition-colors resize-none"
                      placeholder="Conte-nos sobre seu projeto, objetivos e necessidades específicas..."
                      onChange={handleChange}
                      value={formData.message}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={!!isPending}
                      className="w-full h-14 bg-gradient-to-r from-[#8f37e1] to-[#824fb1] hover:from-[#9d4eed] hover:to-[#9333ea] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending && (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Enviando...</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Send size={20} />
                        <span>Solicitar Orçamento Gratuito</span>
                      </div>
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Resposta em até 24 horas • Orçamento sem compromisso • Consultoria gratuita
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-full border-2 border-white/20"
              />
              <div>
                <h3 className="text-xl font-bold">HSO Solutions</h3>
                <p className="text-gray-300">Soluções em Software</p>
              </div>
            </div>

            <div className="flex space-x-6">
              {[
                { href: "https://www.instagram.com/@alex.oliveira.dev", icon: Instagram, label: "Instagram" },
                { href: "https://github.com/alex-oliveira-dev", icon: Github, label: "GitHub" },
                {
                  href: "https://www.tiktok.com/@alex.oliveira.dev",
                  icon: () => (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  ),
                  label: "TikTok",
                },
                {
                  href: "https://wa.me/5511939591754",
                  icon: () => (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085" />
                    </svg>
                  ),
                  label: "WhatsApp",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  {React.createElement(social.icon)}
                </a>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-300">© 2025 HSO Soluções em Software. Todos os direitos reservados.</p>
              <p className="text-sm text-gray-400 mt-2">Desenvolvido com ❤️ e tecnologia JavaScript/TypeScript</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Success/Error Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {modalSuccess ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : (
                <AlertCircle className="text-red-500" size={24} />
              )}
              <span>{modalTitle}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">{modalMessage}</p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsModalOpen(false)}
              className={modalSuccess ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}
            >
              {modalSuccess ? "Perfeito!" : "Entendi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
