import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Wraper from "./components/Wraper";
import bannerlogo from "./assets/bannerlogo.png";
import bannermb from "./assets/bannermb.png";
import bannerlu from "./assets/bannerlu.png";

function App() {
  // Exemplo simples para trocar imagem pelo tamanho da tela
  const isDesktop = window.innerWidth >= 768;
  const bannerBg = isDesktop ? bannerlu : bannermb;

  return (
    <div className="bg-black flex flex-col items-center">
      <Navbar />
      <div className="border-b-4 border-purple-800 w-full">
        <img
          src={bannerlogo}
          alt="#logo"
          className="w-96 h-96 object-center object-cover mx-auto"
        />
      </div>
      {/* Banner background ocupa pelo menos 70% da tela */}
      <div
        className="w-full min-h-[70vh] bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${bannerBg})`,
        }}
      />
      <Wraper />
      <Hero />
    </div>
  );
}

export default App;
