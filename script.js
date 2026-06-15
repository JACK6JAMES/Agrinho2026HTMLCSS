"use strict";

const formulario = document.querySelector("#quizFormulario");
const questoes = [...document.querySelectorAll(".questaoQuiz")];
const aviso = document.querySelector("#avisoQuiz");
const resultado = document.querySelector("#resultadoQuiz");
const resultadoPontuacao = document.querySelector("#resultadoPontuacao");
const resultadoTitulo = document.querySelector("#resultadoTitulo");
const resultadoMensagem = document.querySelector("#resultadoMensagem");
const botaoRefazer = document.querySelector("#botaoRefazer");

function obterFeedback(pontuacao) {
  if (pontuacao <= 3) {
    return {
      titulo: "Continue aprendendo!",
      mensagem: "Revise as práticas sustentáveis apresentadas na página e tente novamente.",
    };
  }

  if (pontuacao <= 6) {
    return {
      titulo: "Bom conhecimento!",
      mensagem: "Você já compreende conceitos importantes e pode aprofundar ainda mais seus conhecimentos.",
    };
  }

  if (pontuacao <= 8) {
    return {
      titulo: "Muito bom!",
      mensagem: "Você demonstrou compreender como produção e preservação podem caminhar juntas.",
    };
  }

  return {
    titulo: "Especialista em agro sustentável!",
    mensagem: "Excelente resultado! Você domina as principais práticas apresentadas no projeto.",
  };
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  let pontuacao = 0;
  let respondidas = 0;
  let primeiraNaoRespondida = null;

  questoes.forEach((questao) => {
    questao.classList.remove("correta", "incorreta", "naoRespondida");
    const marcada = questao.querySelector("input:checked");

    if (!marcada) {
      questao.classList.add("naoRespondida");
      primeiraNaoRespondida ??= questao;
      return;
    }

    respondidas += 1;
    if (marcada.value === questao.dataset.resposta) {
      pontuacao += 1;
      questao.classList.add("correta");
    } else {
      questao.classList.add("incorreta");
    }
  });

  if (respondidas < questoes.length) {
    aviso.textContent = `Responda às ${questoes.length - respondidas} questão(ões) destacada(s) antes de finalizar.`;
    resultado.hidden = true;
    primeiraNaoRespondida?.scrollIntoView({ behavior: "smooth", block: "center" });
    primeiraNaoRespondida?.querySelector("input")?.focus({ preventScroll: true });
    return;
  }

  aviso.textContent = "";
  const feedback = obterFeedback(pontuacao);
  resultadoPontuacao.textContent = `${pontuacao} de ${questoes.length} pontos`;
  resultadoTitulo.textContent = feedback.titulo;
  resultadoMensagem.textContent = feedback.mensagem;
  resultado.hidden = false;
  botaoRefazer.hidden = false;
  resultado.focus({ preventScroll: true });
  resultado.scrollIntoView({ behavior: "smooth", block: "center" });
});

botaoRefazer.addEventListener("click", () => {
  formulario.reset();
  questoes.forEach((questao) => {
    questao.classList.remove("correta", "incorreta", "naoRespondida");
  });
  aviso.textContent = "";
  resultado.hidden = true;
  botaoRefazer.hidden = true;
  questoes[0].scrollIntoView({ behavior: "smooth", block: "center" });
  questoes[0].querySelector("input")?.focus({ preventScroll: true });
});
