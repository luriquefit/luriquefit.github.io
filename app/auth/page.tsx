"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LoadingScreen from "@/components/loading-screen"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleAuthMode = () => setIsLogin(!isLogin)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <Image
              src="/images/flor-removebg-preview.png"
              alt="Flor Loading"
              width={64}
              height={64}
              className="animate-spin"
              priority
            />
          </div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/fotosection4.jpeg"
            alt="Auth Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Back Button */}
        <Link href="/" className="absolute top-6 left-6 z-10">
          <motion.div
            className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-light">Voltar ao Início</span>
          </motion.div>
        </Link>

        {/* Auth Card */}
        <motion.div
          className="w-full max-w-md z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          <Card className="bg-gray-900/40 border-gray-800 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/images/flor-removebg-preview.png"
                  alt="Flor"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
              <CardTitle className="text-2xl font-light text-white">
                {isLogin ? "Bem-vindo de Volta" : "Junte-se ao Luriquefit"}
              </CardTitle>
              <CardDescription className="text-gray-400 font-light">
                {isLogin ? "Entre para continuar sua jornada fitness" : "Comece sua transformação hoje"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <motion.form
                className="space-y-4"
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }}
                key={isLogin ? "login" : "register"}
              >
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300 font-light">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 font-light">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 font-light">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300 font-light">
                      Confirmar Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 pr-10"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors font-light"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 font-light py-3"
                >
                  {isLogin ? "Entrar" : "Criar Conta"}
                </Button>
              </motion.form>

              <div className="mt-6 space-y-3">
                <Button
                  type="button"
                  className="w-full bg-white/10 border border-gray-600 text-white hover:bg-white/20 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300 font-light py-3 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continuar com Google</span>
                </Button>

                <Button
                  type="button"
                  className="w-full bg-white/10 border border-gray-600 text-white hover:bg-white/20 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300 font-light py-3 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    />
                  </svg>
                  <span>Continuar com Apple</span>
                </Button>
              </div>

              <div className="mt-6 flex items-center">
                <div className="flex-1 border-t border-gray-700"></div>
                <div className="px-4 text-gray-500 text-sm font-light">ou</div>
                <div className="flex-1 border-t border-gray-700"></div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400 font-light">
                  {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
                  <button
                    onClick={toggleAuthMode}
                    className="ml-2 text-purple-400 hover:text-purple-300 transition-colors font-light underline"
                  >
                    {isLogin ? "Cadastre-se" : "Entre"}
                  </button>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm font-light">
                  <p>Ao continuar, você concorda com nossos</p>
                  <div className="flex justify-center space-x-4 mt-1">
                    <button className="hover:text-purple-400 transition-colors">Termos de Serviço</button>
                    <span>•</span>
                    <button className="hover:text-purple-400 transition-colors">Política de Privacidade</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
