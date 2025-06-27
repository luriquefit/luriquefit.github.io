import { useState, useEffect, useRef } from "react";
import logo from "../assets/imgflorofc-removebg-preview.png";
import { X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Impede rolagem do body quando o menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      // Verifica se o clique foi fora do menu
      // Se o menu estiver aberto e o clique não for dentro do menu, fecha o menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Fecha o menu ao clicar em um link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-10 left-0 w-full px-4 z-50">
        <div className="flex items-center">
          <button
            className="flex flex-col items-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="side-menu"
          >
            <img
              src={logo}
              alt="Heart Mascot"
              className="w-[60px] transform rotate-[30deg] transition-transform duration-500 hover:rotate-[360deg]"
            />
            <h1 className="text-white text-xl font-bold pt-2">menu</h1>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          aria-hidden="true"
        />
      )}

      <div
        ref={menuRef}
        id="side-menu"
        className={`fixed top-0 left-0 h-full w-2/3 max-w-sm bg-black text-white z-50 p-6 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="navigation"
        aria-hidden={!menuOpen}
      >
        {/* HEADER DO MENU */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h5 className="text-xl font-semibold">Menu</h5>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col pt-6 space-y-4 text-lg font-mono">
          <a
            href="#home"
            className="nav-link relative after:content-[''] after:block after:h-0.5 after:bg-purple-600 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            onClick={handleLinkClick}
          >
            Home
          </a>
          <a
            href="#EmForma"
            className="nav-link relative after:content-[''] after:block after:h-0.5 after:bg-purple-600 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            onClick={handleLinkClick}
          >
            Saúde
          </a>
          <a
            href="#consul1"
            className="nav-link relative after:content-[''] after:block after:h-0.5 after:bg-purple-600 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            onClick={handleLinkClick}
          >
            Consultoria
          </a>
          <a
            href="#aula"
            className="nav-link relative after:content-[''] after:block after:h-0.5 after:bg-purple-600 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            onClick={handleLinkClick}
          >
            Aulas
          </a>
          <a
            href="#contato"
            className="nav-link relative after:content-[''] after:block after:h-0.5 after:bg-purple-600 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100"
            onClick={handleLinkClick}
          >
            Contato
          </a>
          <a
            href="calculator.html"
            className="btn-link border border-white rounded-full px-4 py-2 transition-colors duration-300 hover:bg-purple-600 hover:text-white"
            onClick={handleLinkClick}
          >
            Calcular KCAL
          </a>
          <a
            href="login.html"
            className="btn-link border border-white rounded-full px-4 py-2 transition-colors duration-300 hover:bg-purple-600 hover:text-white"
            onClick={handleLinkClick}
          >
            Login
          </a>
        </div>
      </div>
    </>
  );
}
