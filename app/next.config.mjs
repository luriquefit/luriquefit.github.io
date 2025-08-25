/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para exportação estática, necessária para o GitHub Pages
  output: 'export',

  // Define o caminho base para o seu repositório no GitHub Pages
  basePath: '/luriquefit.github.io',

  // Define o prefixo dos assets (arquivos estáticos como imagens, css, etc.)
  assetPrefix: '/luriquefit.github.io/',

  // Desativa a otimização de imagens do Next.js, que não é compatível com a exportação estática.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;