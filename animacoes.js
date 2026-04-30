// CONFIGURACOES FACEIS DE EDITAR
const WHATSAPP_LINK =
  "https://wa.me/5511952927991?text=Fala!%20Vim%20pelo%20site%20do%20Laborat%C3%B3rio%20do%20Corte%20e%20quero%20elevar%20o%20n%C3%ADvel%20do%20meu%20corte.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F";

const menuBotao = document.querySelector(".menu-botao");
const menu = document.querySelector(".menu");

if (menuBotao && menu) {
  menuBotao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    menuBotao.setAttribute("aria-expanded", String(aberto));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      menuBotao.setAttribute("aria-expanded", "false");
    });
  });
}

// Atualiza todos os botoes de WhatsApp a partir de um unico lugar.
document.querySelectorAll(".js-whatsapp").forEach((botao) => {
  botao.setAttribute("href", WHATSAPP_LINK);
});

// Efeito de aparecer ao rolar a pagina.
const elementosReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elementosReveal.forEach((elemento) => observer.observe(elemento));
} else {
  elementosReveal.forEach((elemento) => elemento.classList.add("visivel"));
}

// Carrossel simples de depoimentos.
const depoimentos = Array.from(document.querySelectorAll(".depoimento"));
const bolinhasContainer = document.querySelector(".bolinhas");
let depoimentoAtual = 0;
let carrosselTimer;

function mostrarDepoimento(indice) {
  if (!depoimentos.length) return;

  depoimentoAtual = (indice + depoimentos.length) % depoimentos.length;

  depoimentos.forEach((depoimento, i) => {
    depoimento.classList.toggle("ativo", i === depoimentoAtual);
  });

  document.querySelectorAll(".bolinhas button").forEach((botao, i) => {
    botao.classList.toggle("ativo", i === depoimentoAtual);
    botao.setAttribute("aria-current", i === depoimentoAtual ? "true" : "false");
  });
}

function reiniciarCarrossel() {
  window.clearInterval(carrosselTimer);
  carrosselTimer = window.setInterval(() => mostrarDepoimento(depoimentoAtual + 1), 6500);
}

if (depoimentos.length && bolinhasContainer) {
  depoimentos.forEach((_, i) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.setAttribute("aria-label", `Mostrar depoimento ${i + 1}`);
    botao.addEventListener("click", () => {
      mostrarDepoimento(i);
      reiniciarCarrossel();
    });
    bolinhasContainer.appendChild(botao);
  });

  document.querySelectorAll(".carrossel-btn").forEach((botao) => {
    botao.addEventListener("click", () => {
      const direcao = botao.dataset.direcao === "anterior" ? -1 : 1;
      mostrarDepoimento(depoimentoAtual + direcao);
      reiniciarCarrossel();
    });
  });

  mostrarDepoimento(0);
  reiniciarCarrossel();
}

// Formulario estatico: monta uma mensagem e abre o WhatsApp.
const formulario = document.querySelector("#formulario-contato");

if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    window.open(WHATSAPP_LINK, "_blank", "noopener");
  });
}
