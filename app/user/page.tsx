"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB-V-ZjAvKsK2972BBGyq0fcGcWjwH0pR4",
  authDomain: "luisriquefit.firebaseapp.com",
  projectId: "luisriquefit",
  storageBucket: "luisriquefit.firebasestorage.app",
  messagingSenderId: "744919749403",
  appId: "1:744919749403:web:0e0ce88e388a178555b9be",
  measurementId: "G-NS48N1CMQ4"
};

// Mock de dados de treino para desenvolvimento
const mockTreinos = {
  segunda: "Treino A: Peito, Tríceps e Ombros\n- Supino Reto: 4x10\n- Crucifixo Inclinado: 3x12\n- Elevação Lateral: 4x15\n- Tríceps Corda: 3x12",
  terca: "Treino B: Costas e Bíceps\n- Puxada Frontal: 4x10\n- Remada Curvada: 3x12\n- Rosca Direta: 4x12\n- Rosca Martelo: 3x15",
  quarta: "Descanso Ativo ou Cardio leve (30 min)",
  quinta: "Treino C: Pernas Completo\n- Agachamento Livre: 4x10\n- Leg Press 45: 3x12\n- Cadeira Extensora: 4x15\n- Mesa Flexora: 3x12",
  sexta: "Treino D: Full Body\n- Terra: 3x8\n- Desenvolvimento Militar: 4x10\n- Barra Fixa: 3x até a falha\n- Afundo: 3x12 (cada perna)",
  sabado: "Cardio Intenso (HIIT) ou atividade ao ar livre.",
  domingo: "Descanso",
};

type TreinoSemanal = typeof mockTreinos;

const diasDaSemana = [
  { id: "segunda", label: "Seg" },
  { id: "terca", label: "Ter" },
  { id: "quarta", label: "Qua" },
  { id: "quinta", label: "Qui" },
  { id: "sexta", label: "Sex" },
  { id: "sabado", label: "Sáb" },
  { id: "domingo", label: "Dom" },
];

const ML_POR_COPO = 250;

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [treinos, setTreinos] = useState<TreinoSemanal | null>(null);
  const [mls, setMls] = useState(0);
  const [lastDate, setLastDate] = useState<string>("");

  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app);
    const db = getFirestore(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // Buscando o objeto de treinos do Firestore
          const data = userDoc.data();
          setTreinos(data.treinos || mockTreinos); // Usa mock como fallback
        } else {
          setTreinos(mockTreinos); // Usuário sem dados, usa mock
        }
      } else {
        setUser(null);
        setTreinos(mockTreinos); // Usuário deslogado, usa mock
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const saved = localStorage.getItem("agua");
    if (saved) {
      const { mls: savedMls, date } = JSON.parse(saved);
      if (date === today) {
        setMls(savedMls);
      }
    }
    setLastDate(today);
  }, []);

  useEffect(() => {
    if (lastDate) {
      localStorage.setItem("agua", JSON.stringify({ mls, date: lastDate }));
    }
  }, [mls, lastDate]);

  const adicionarCopo = () => setMls((prev) => prev + ML_POR_COPO);
  const removerCopo = () => setMls((prev) => Math.max(0, prev - ML_POR_COPO));

  const getToday = () => {
    const dayIndex = new Date().getDay();
    const dias = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
    return dias[dayIndex];
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])
  const [isLoading, setIsLoading] = useState(true);

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

    <div className="relative min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">
      <Link href="/" className="absolute top-6 right-6 z-10">
        <motion.div
          className="flex items-center space-x-2 text-neutral-400 hover:text-purple-400 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <span className="font-light text-sm">Voltar ao Início</span>
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </Link>

      <motion.h1
        className="text-3xl md:text-4xl font-light mb-8 text-center text-white pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {user ? `Bem-vindo, ${user.displayName?.split(" ")[0] || ''}!` : "Bem-vindo!"}
      </motion.h1>

      <motion.div
        className="w-full max-w-2xl mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Tabs defaultValue={getToday()} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-neutral-900/80 backdrop-blur-sm">
            {diasDaSemana.map((dia) => (
              <TabsTrigger 
                key={dia.id} 
                value={dia.id} 
                className="text-xs sm:text-sm text-white data-[state=active]:bg-purple-900/60 data-[state=active]:shadow-inner data-[state=active]:shadow-purple-500/20"
              >
                {dia.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {diasDaSemana.map((dia) => (
            <TabsContent key={dia.id} value={dia.id}>
              <Card className="bg-neutral-900/80 border border-purple-800/20 shadow-lg mt-4 shadow-purple-900/10">
                <CardHeader>
                  <CardTitle className="text-xl font-light text-purple-400 capitalize">{dia.id}</CardTitle>
                </CardHeader>
                <CardContent className="whitespace-pre-line text-sm sm:text-base text-neutral-300">
                  {treinos ? treinos[dia.id as keyof TreinoSemanal] : "Carregando treino..."}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="text-center">
            <h2 className="text-xl font-light text-purple-400 mb-4">Hidratação Diária</h2>
            <div className="relative flex flex-col items-center">
                <Image
                    src="/images/garrafa.png"
                    alt="Garrafa de Água"
                    width={80}
                    height={180}
                    className="mb-2"
                    style={{ filter: "drop-shadow(0 0 12px #a855f7)" }}
                />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl font-bold text-purple-300/90">
                    {mls} ml
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={removerCopo} size="sm" className="bg-black text-white border border-purple-700 hover:bg-purple-950 hover:border-purple-600">- {ML_POR_COPO}ml</Button>
          <span className="text-lg text-neutral-300">{Math.floor(mls / ML_POR_COPO)} / 8 copos</span>
          <Button onClick={adicionarCopo} size="sm" className="bg-black text-white border border-purple-700 hover:bg-purple-950 hover:border-purple-600">+ {ML_POR_COPO}ml</Button>
        </div>
        <p className="text-xs text-neutral-400/80 mt-2">Seu progresso de hidratação é salvo e reiniciado diariamente.</p>
      </motion.div>
    </div>
        </>
  );
}