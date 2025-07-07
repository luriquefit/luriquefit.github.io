import PlanosImg from "../assets/bannerPlans.png";
import Plan1 from "../assets/plano1.png";
import Plan2 from "../assets/plano2.png";
import Plan3 from "../assets/plano3.png";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PlanosIntr() {
  //Gsap para animação de entrada da imagem
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".imagem", {
      x: 0,
      opacity: 1,
      rotate: "0deg",
      scrollTrigger: {
        trigger: ".imgPlan",
        start: "top 60%",
        end: "bottom 70%",
        scrub: true,
        //markers: true,
      },
    });

    return () => {
      gsap.killTweensOf(".imagem");
    };
  }, []);

  //Gsap para anmimação dos planos

  return (
    <div className="w-full bg-black flex flex-col md:flex-row overflow-x-hidden m-2 imgPlan">
      <div className="w-full max-w-5xl relative imagem -translate-x-full opacity-0 rotate-180">
        <img src={PlanosImg} alt="Plano de Treino" />
      </div>
      <div className="w-full max-w-5xl p-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-white">Planos de Treino</h1>
        <p className="text-gray-400">
          Quer fazer parte do time? Escolha seu plano de consultoria e venha ser
          #LuRiqueFIT
        </p>
        <span className="text-purple-500 font-bold">
          Seja sua melhor versão
        </span>
      </div>
    </div>
  );
}
