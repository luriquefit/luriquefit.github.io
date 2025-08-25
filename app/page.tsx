"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Instagram, Twitter, Mail, Phone } from "lucide-react"
import Image from "next/image"
import LoadingScreen from "@/components/loading-screen"

// Remova o cálculo de basePath do topo do arquivo
// const basePath = process.env.NODE_ENV === 'production' ? '/luriquefit.github.io' : '';

export default function LuriquefitInspired() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const menuItemVariants = {
    closed: {
      x: -50,
      opacity: 0,
    },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut",
      },
    }),
  }

  const pricingPlans = [
    {
      name: "Básico",
      description: "Perfeito para iniciantes começando sua jornada fitness",
      price: "R$ 89",
      period: "/mês",
      features: ["2 sessões por semana", "Guia nutricional básico", "Acompanhamento de progresso", "Suporte por email"],
    },
    {
      name: "Premium",
      description: "Transformação completa com atenção personalizada",
      price: "R$ 179",
      period: "/mês",
      features: [
        "Sessões ilimitadas",
        "Personal trainer",
        "Plano nutricional personalizado",
        "Suporte 24/7",
        "Conteúdo exclusivo",
      ],
    },
  ]

  // Calcule basePath dentro do componente, usando useMemo para garantir que é igual no SSR e client
  const basePath = typeof window !== "undefined" && window.location.pathname.startsWith("/luriquefit.github.io")
    ? "/luriquefit.github.io"
    : "";

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <Image
              src={`${basePath}/images/flor-removebg-preview.png`}
              alt="Flor Loading"
              width={64}
              height={64}
              className="animate-spin"
              priority
            />
          </div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="container mx-auto px-6 py-6 flex items-center justify-between">
            <motion.button
              onClick={toggleMenu}
              className="flex flex-col items-center space-y-1 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-8 h-8 relative"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Image
                  src={`${basePath}/images/flor-removebg-preview.png`}
                  alt="Flower Menu"
                  width={32}
                  height={32}
                  className="transition-all duration-300"
                />
              </motion.div>
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">menu</span>
            </motion.button>
          </div>
        </nav>

        {/* Slide-in Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/80 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
              />
              <motion.div
                className="fixed top-0 left-0 h-full w-80 bg-black z-50 border-r border-gray-800"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="p-8">
                  <motion.button
                    onClick={toggleMenu}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.button>

                  <div className="mt-16 space-y-8">
                    {/* Corrija os ids dos links removendo acentos */}
                    {[
                      { label: "Início", id: "inicio" },
                      { label: "Sobre", id: "sobre" },
                      { label: "Benefícios", id: "beneficios" },
                      { label: "Depoimentos", id: "depoimentos" },
                      { label: "Preços", id: "precos" },
                      { label: "Contato", id: "contato" },
                    ].map((item, i) => (
                      <motion.a
                        key={item.label}
                        href={`#${item.id}`}
                        className="block text-2xl text-gray-400 hover:text-white transition-colors duration-300 font-light"
                        variants={menuItemVariants}
                        custom={i}
                        initial="closed"
                        animate="open"
                        onClick={toggleMenu}
                        whileHover={{ x: 10 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}

                    <motion.a
                      href={`${basePath}/auth`}
                      className="block text-2xl text-gray-400 hover:text-white transition-colors duration-300 font-light border-t border-gray-800 pt-6"
                      variants={menuItemVariants}
                      custom={6}
                      initial="closed"
                      animate="open"
                      onClick={toggleMenu}
                      whileHover={{ x: 10 }}
                    >
                      Login / Cadastro
                    </motion.a>
                  </div>

                  <motion.div
                    className="absolute bottom-8 left-8 flex space-x-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[Instagram, Twitter, Mail].map((Icon, index) => (
                      <motion.div
                        key={index}
                        className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-300"
                        whileHover={{ scale: 1.2, y: -2 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            {/* Mobile image */}
            <div className="block md:hidden w-full h-full absolute inset-0">
              <Image
                src={`${basePath}/images/bannermb.png`}
                alt="Hero Mobile Background"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            {/* Desktop image */}
            <div className="hidden md:block w-full h-full absolute inset-0">
              <Image
                src={`${basePath}/images/bannerdesk.png`}
                alt="Hero Desktop Background"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <motion.div className="text-center z-10" variants={heroVariants} initial="hidden" animate="visible">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="text-8xl md:text-9xl font-bold mb-4">
                <span className="text-white">L</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">H</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-light mb-6 tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Luriquefit
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Transforme seu corpo e mente com coaching fitness personalizado
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                className="bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 px-8 py-3 text-lg font-light transition-all duration-300"
                size="lg"
              >
                Começar Jornada
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="grid md:grid-cols-2 gap-16 items-center"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
            >
              <motion.div
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0rounded-full" />
                  <Image
                    src={`${basePath}/images/fotosection2.jpeg`}
                    alt="Lurique Coach"
                    width={320}
                    height={320}
                    className={`
                      w-full h-full object-cover rounded-full
                    `}
                    style={{}}
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-light mb-6">Sobre Lurique</h2>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  Com mais de 8 anos de experiência em coaching fitness, acredito em criar transformações sustentáveis
                  que vão além da aparência física. Minha abordagem combina treinamento baseado em ciência com práticas
                  de bem-estar consciente.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  Cada jornada é única, e estou aqui para guiá-lo através da sua com atenção personalizada e apoio
                  inabalável.
                </p>
                <div className="flex items-center space-x-8 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-light text-white">500+</div>
                    <div className="text-sm text-gray-400">Clientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-white">8+</div>
                    <div className="text-sm text-gray-400">Anos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-white">100%</div>
                    <div className="text-sm text-gray-400">Dedicação</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Physical Activity Benefits Section */}
        {/* Corrija o id para "beneficios" */}
        <section id="beneficios" className="py-20 px-6 bg-gray-900/20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">Por Que a Atividade Física Importa</h2>
              <p className="text-gray-400 text-lg font-light">
                Entendendo os fundamentos de um estilo de vida saudável
              </p>
            </motion.div>

            <motion.div
              className="space-y-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-light text-white mb-4">A Ciência Por Trás do Movimento</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    A atividade física não é apenas sobre ter uma boa aparência—é sobre se sentir vivo. Quando você move
                    seu corpo, desencadeia uma cascata de mudanças positivas que afetam todos os aspectos do seu
                    bem-estar.
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    O exercício regular aumenta o fluxo sanguíneo para o cérebro, libera endorfinas (os elevadores
                    naturais de humor do seu corpo) e fortalece seu sistema cardiovascular.
                  </p>
                </div>
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🧠</div>
                      <p className="text-white font-light">Função Cerebral Aprimorada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: "❤️",
                    title: "Saúde do Coração",
                    description:
                      "Fortalece seu sistema cardiovascular, reduzindo o risco de doenças cardíacas em até 35%",
                  },
                  {
                    icon: "😴",
                    title: "Melhor Sono",
                    description:
                      "A atividade regular ajuda a regular os padrões de sono e melhora a qualidade do descanso",
                  },
                  {
                    icon: "⚡",
                    title: "Aumento de Energia",
                    description: "Aumenta a resistência e reduz a fadiga durante suas atividades diárias",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.3 }}
                    className="text-center p-6 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300"
                  >
                    <div className="text-3xl mb-4">{benefit.icon}</div>
                    <h4 className="text-white font-light mb-3">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm font-light">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Running Benefits Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">A Magia da Corrida</h2>
              <p className="text-gray-400 text-lg font-light">
                Descubra por que correr é a forma definitiva de autocuidado
              </p>
            </motion.div>

            <motion.div
              className="space-y-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 md:order-1">
                  <div className="w-full h-64 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🏃‍♀️</div>
                      <p className="text-white font-light">Euforia do Corredor</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 order-1 md:order-2">
                  <h3 className="text-2xl font-light text-white mb-4">O Antidepressivo da Natureza</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    Correr é mais do que apenas colocar um pé na frente do outro. É uma meditação em movimento que limpa
                    sua mente, reduz hormônios do estresse como o cortisol, e inunda seu sistema com endorfinas—os
                    químicos naturais da felicidade.
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">
                    A natureza rítmica da corrida cria um estado meditativo que muitos descrevem como "euforia do
                    corredor." Isso não é apenas um sentimento—é uma resposta neuroquímica cientificamente comprovada.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <motion.div
                  className="inline-block p-8 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-lg border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-xl font-light text-white mb-4">Pronto para Experimentar os Benefícios?</h4>
                  <p className="text-gray-400 font-light mb-6">
                    Comece com apenas 10 minutos por dia. Seu eu futuro agradecerá.
                  </p>
                  <Button className="bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 font-light px-6 py-2">
                    Iniciar Jornada de Corrida
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feedback Section */}
        <section id="depoimentos" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">Depoimentos dos Clientes</h2>
              <p className="text-gray-400 text-lg font-light">O que nossa comunidade diz sobre sua transformação</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Silva",
                  role: "Executiva de Marketing",
                  feedback:
                    "A abordagem da Lurique mudou completamente minha relação com o fitness. A atenção personalizada e métodos sustentáveis fizeram toda a diferença.",
                  rating: 5,
                  image: `${basePath}/placeholder.svg?height=80&width=80&text=SS`,
                },
                {
                  name: "Miguel Santos",
                  role: "Desenvolvedor",
                  feedback:
                    "Depois de anos de tentativas fracassadas, finalmente encontrei um programa que funciona. A abordagem consciente do fitness é exatamente o que eu precisava.",
                  rating: 5,
                  image: `${basePath}/placeholder.svg?height=80&width=80&text=MS`,
                },
                {
                  name: "Ana Costa",
                  role: "Professora",
                  feedback:
                    "O desafio de 30 dias mudou minha vida. Não apenas fisicamente, mas mentalmente. Me sinto mais forte e confiante do que nunca.",
                  rating: 5,
                  image: `${basePath}/placeholder.svg?height=80&width=80&text=AC`,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.3 }}
                >
                  <Card className="bg-gray-900/30 border-gray-800 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-500 group cursor-pointer h-full backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image || `${basePath}/placeholder.svg`}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-light">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>

                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-purple-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-light italic">
                        "{testimonial.feedback}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {/* Corrija o id para "precos" */}
        <section id="precos" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="text-center mb-16"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-4">Planos de Investimento</h2>
              <p className="text-gray-400 text-lg font-light">Escolha seu caminho para a transformação</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.3 }}
                >
                  <Card
                    className="bg-gray-900/30 border-gray-800 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-500 group cursor-pointer h-full backdrop-blur-sm"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)"
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-light text-gray-400 group-hover:text-white transition-colors duration-300 mb-2">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500 group-hover:text-gray-300 transition-colors duration-300 font-light">
                        {plan.description}
                      </CardDescription>
                      <div className="flex items-baseline justify-center mt-4">
                        <span className="text-4xl font-light text-gray-400 group-hover:text-white transition-colors duration-300">
                          {plan.price}
                        </span>
                        <span className="text-gray-500 ml-1">{plan.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-gray-400 group-hover:text-gray-200 transition-colors duration-300 font-light"
                          >
                            <span className="text-purple-400 mr-3">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="px-6 pb-6">
                      <Button className="w-full bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 font-light">
                        Selecionar Plano
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* Corrija o id para "contato" */}
        <footer id="contato" className="py-16 px-6 border-t border-gray-800">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              className="grid md:grid-cols-3 gap-12"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
            >
              <div>
                <h4 className="text-lg font-light text-white mb-4">Conecte-se</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    <Mail className="h-4 w-4" />
                    <span className="font-light">ola@luriquefit.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    <Phone className="h-4 w-4" />
                    <span className="font-light">+55 (11) 99999-9999</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-light text-white mb-4">Siga-nos</h4>
                <div className="flex space-x-4">
                  {[Instagram, Twitter, Mail].map((Icon, index) => (
                    <motion.div
                      key={index}
                      className="text-gray-400 hover:text-purple-400 cursor-pointer transition-colors duration-300"
                      whileHover={{ scale: 1.2, y: -2 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-light text-white mb-4">Navegar</h4>
                <div className="space-y-2">
                  {/* Corrija os links para ids sem acento */}
                  {[
                    { label: "Sobre", id: "sobre" },
                    { label: "Preços", id: "precos" },
                    { label: "Contato", id: "contato" },
                  ].map((link) => (
                    <motion.a
                      key={link.label}
                      href={`#${link.id}`}
                      className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 font-light"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="border-t border-gray-800 mt-12 pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-gray-500 font-light">
                &copy; {new Date().getFullYear()} Luriquefit. Criado com carinho para sua jornada de bem-estar.
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  )
}
