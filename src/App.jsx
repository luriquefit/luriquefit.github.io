import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Wraper from "./components/Wraper";

function App() {
  return (
    <div className="bg-black flex flex-col items-center">
      <Navbar />
      <div className="border-b-4 border-purple-800 w-full">
        <img
          src="./src/assets/bannerlogo.png"
          alt="#logo"
          className="w-96 h-96 object-center object-cover mx-auto"
        />
      </div>
      {/* Banner background ocupa pelo menos 70% da tela */}
      <div
        className="
          w-full min-h-[70vh]
          bg-[url('./src/assets/bannermb.png')]
          md:bg-[url('./src/assets/bannerlu.png')]
          bg-center bg-cover bg-fixed
        "
      />
      <Wraper />
      <Hero />
    </div>
  );
}

export default App;
