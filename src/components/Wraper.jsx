export default function Wraper() {
  return (
    <div className="w-full overflow-hidden bg-[#8c52ff] h-16 flex items-center border-t-2 border-b-2 border-black">
      <div className="inline-block whitespace-nowrap text-white px-4 py-2 ticker-animate text-[25px] font-bold">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="inline-flex items-center">
            INVERTA AS REGRAS E MUDE O JOGO
            <img
              src="./src/assets/emoji.png"
              alt="emoti"
              className="w-8 h-8 mx-2 inline"
            />
            INVERTA AS REGRAS E MUDE O JOGO
            <img
              src="./src/assets/emoji.png"
              alt="emoti"
              className="w-8 h-8 mx-2 inline"
            />
            INVERTA AS REGRAS E MUDE O JOGO
            <img
              src="./src/assets/emoji.png"
              alt="emoti"
              className="w-8 h-8 mx-2 inline"
            />
            INVERTA AS REGRAS E MUDE O JOGO
            <img
              src="./src/assets/emoji.png"
              alt="emoti"
              className="w-8 h-8 mx-2 inline"
            />
            INVERTA AS REGRAS E MUDE O JOGO
            <img
              src="./src/assets/emoji.png"
              alt="emoti"
              className="w-8 h-8 mx-2 inline"
            />
            INVERTA AS REGRAS E MUDE O JOGO
            <img
              src="./src/assets/emoji.png"
              alt="emoti"
              className="w-8 h-8 mx-2 inline"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
