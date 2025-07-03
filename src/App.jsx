import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Wraper from "./components/Wraper";
import Carousel from "./components/Carousel";
import bannerlogo from "./assets/bannerlogo.png";

function App() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center overflow-x-hidden">
      <Navbar />
      <div className="border-b-4 border-purple-800 w-full">
        <img
          src={bannerlogo}
          alt="#logo"
          className="w-96 h-96 object-center object-cover mx-auto"
        />
      </div>
      <Carousel />
      <Wraper />
      <Hero />
    </div>
  );
}

export default App;
