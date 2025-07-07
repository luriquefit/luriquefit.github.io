import { useLayoutEffect, useRef } from "react";
import Plan1 from "../assets/plano1.png";
import Plan2 from "../assets/plano2.png";
import Plan3 from "../assets/plano3.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PlansCards() {
  const el = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const endValue = window.innerWidth < 768 ? "bottom -40%" : "bottom 80%";

      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".plan",
            scrub: true,
            start: "top 100%",
            end: endValue,
          },
        })
        .fromTo(
          "#plan1",
          {
            opacity: 0,
            x: 160,
          },
          {
            opacity: 1,
            x: 0,
          }
        )
        .fromTo(
          "#plan2",
          {
            opacity: 0,
            x: 160,
          },
          {
            opacity: 1,
            x: 0,
          }
        )
        .fromTo(
          "#plan3",
          {
            opacity: 0,
            x: 160,
          },
          {
            opacity: 1,
            x: 0,
          }
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-stretch gap-8 p-6 plansContent mb-10"
      ref={el}
    >
      {/* CARD 1 */}
      <div
        className="w-full md:w-[30%] bg-black rounded-2xl border-l-4 border-purple-900 overflow-hidden shadow-xl plan"
        id="plan1"
      >
        <img
          className="w-full h-56 object-cover"
          src={Plan1}
          alt="Imagem do card"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">PLANO CHAMPS</h2>
          <p className="text-gray-300 mt-3">
            Descrição breve sobre o conteúdo deste card, ideal para chamar
            atenção.
          </p>
          <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition mx-auto block">
            Saiba mais
          </button>
        </div>
      </div>

      {/* CARD 2 */}
      <div
        className="w-full md:w-[30%] bg-black rounded-2xl border-l-4 border-purple-900 overflow-hidden shadow-xl plan"
        id="plan2"
      >
        <img
          className="w-full h-56 object-cover"
          src={Plan2}
          alt="Imagem do card"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">PLANO GOD</h2>
          <p className="text-gray-300 mt-3">
            Descrição breve sobre o conteúdo deste card, ideal para chamar
            atenção.
          </p>
          <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition mx-auto block">
            Saiba mais
          </button>
        </div>
      </div>

      {/* CARD 3 */}
      <div
        className="w-full md:w-[30%] bg-black rounded-2xl border-l-4 border-purple-900 overflow-hidden shadow-xl plan"
        id="plan3"
      >
        <img
          className="w-full h-56 object-cover"
          src={Plan3}
          alt="Imagem do card"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">PLANO HOMEM MORCEGO</h2>
          <p className="text-gray-300 mt-3">
            Descrição breve sobre o conteúdo deste card, ideal para chamar
            atenção.
          </p>
          <button className="mt-6 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 transition mx-auto block">
            Saiba mais
          </button>
        </div>
      </div>
    </div>
  );
}
