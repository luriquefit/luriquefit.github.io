// Script para automatizar deploy de user page no GitHub Pages

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import process from "process";

const distPath = path.resolve("dist");
const rootPath = process.cwd();

// Função para mover arquivos e pastas de dist para raiz
function moveDistToRoot() {
  if (!fs.existsSync(distPath)) {
    console.error("A pasta dist não existe. Rode 'npm run build' antes.");
    process.exit(1);
  }

  const files = fs.readdirSync(distPath);
  files.forEach((file) => {
    const from = path.join(distPath, file);
    const to = path.join(rootPath, file);
    if (fs.existsSync(to)) {
      fs.rmSync(to, { recursive: true, force: true });
    }
    fs.renameSync(from, to);
  });
  fs.rmSync(distPath, { recursive: true, force: true }); // <-- Corrigido aqui
  console.log("Conteúdo de dist movido para a raiz.");
}

// Função para commit e push
function gitCommitAndPush() {
  try {
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "Deploy user page"', { stdio: "inherit" });
    execSync("git push origin main", { stdio: "inherit" });
    console.log("Deploy enviado para o GitHub!");
  } catch (err) {
    console.error("Erro ao fazer commit/push:", err.message);
    console.error(err);
  }
}

// Execução
moveDistToRoot();
gitCommitAndPush();
