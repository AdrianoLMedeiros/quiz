import readlineSync from "readline-sync";
import colecao_perguntas from "./colecao.js";

// Array para armazenar as perguntas já selecionadas no quiz
let perguntas_selecionadas = [];

let acertos = 0;

// Embaralha uma cópia da coleção usando Fisher-Yates
const embaralha = (colecao) => {
  const colecao_embaralhada = [...colecao];

  for (let i = colecao_embaralhada.length - 1; i > 0; i--) {
    const indice_aleatorio = Math.floor(Math.random() * (i + 1));
    [colecao_embaralhada[i], colecao_embaralhada[indice_aleatorio]] = [
      colecao_embaralhada[indice_aleatorio],
      colecao_embaralhada[i],
    ];
  }

  return colecao_embaralhada;
};

// Função para montar o quiz com 10 perguntas aleatórias sem repetição
const monta_quiz = () => {
  perguntas_selecionadas = embaralha(colecao_perguntas).slice(0, 10);
};

const exibe_cabecalho = () => {
  console.log("================================");
  console.log("          QUIZ DE HISTÓRIA");
  console.log("================================\n");

  const nome = readlineSync.question("Qual é o seu nome? ").trim();
  return nome || "Participante";
};

// Função para exibir o resultado do quiz
const exibe_resultado = (nome_usuario) => {
  console.log(
    `\n${nome_usuario}, você acertou ${acertos} de ${perguntas_selecionadas.length} perguntas.`,
  );
};

const main = () => {
  const nome_usuario = exibe_cabecalho();
  console.log(`\nBem-vindo(a), ${nome_usuario}! Vamos começar.\n`);

  monta_quiz();

  for (const pergunta of perguntas_selecionadas) {
    const resposta_usuario = readlineSync
      .question(`${pergunta.pergunta}\nSua resposta: `)
      .trim()
      .toLowerCase();

    if (resposta_usuario === pergunta.resposta.toLowerCase()) {
      acertos++;
      console.log("Resposta correta!\n");
    } else {
      console.log(`Resposta incorreta. A resposta correta é ${pergunta.resposta}.\n`);
    }
  }

  exibe_resultado(nome_usuario);
};

main();
