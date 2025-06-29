export default function Hero() {
  return (
    <section
      id="EmForma"
      className="w-full h-full bg-[#8c52ff] py-16 md:py-20 "
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start text-center md:text-left gap-y-12 md:gap-y-0 md:gap-20">
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src="./src/assets/image.png"
              alt="Aula"
              className="rounded max-w-full mx-auto mr-4"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              ENTRE EM FORMA
            </h1>
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Cuidar da saúde é mais do que estética, é sobre ter energia,
              bem-estar e autoestima. Com o método certo, você transforma seu
              corpo de forma duradoura e inteligente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
