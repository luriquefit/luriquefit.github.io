"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 mb-8 mx-auto"
          animate={{ rotate: [0, 360, 360, 720] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            times: [0, 0.5, 0.7, 1],
            ease: "easeInOut",
          }}
        >
          <Image
            src="/placeholder.svg?height=64&width=64&text=🌸"
            alt="Loading"
            width={64}
            height={64}
            className="filter brightness-0 invert"
          />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-2xl font-light text-white tracking-wider">
            <span className="text-white">L</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">K</span>
          </div>
          <p className="text-gray-400 text-sm font-light">Carregando sua jornada fitness...</p>
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
