/*
 * OPERAÇÃO CARTA
 * Personalize o objeto LETTER para criar uma carta.
 * O conteúdo deste arquivo é público quando hospedado como site estático.
 */
const LETTER = {
  date: "Com carinho,",
  signature: "Seu nome",
  ending: "E se estas palavras conseguiram chegar até você, já valeu a pena escrevê-las.",
  pages: [
    {
      chapter: "CAPÍTULO I",
      title: "Antes de tudo...",
      paragraphs: [
        "Existem coisas que a gente sente e nem sempre consegue dizer no momento certo.",
        "Por isso, resolvi deixar estas palavras aqui. Sem pressa, sem interrupções, apenas um pequeno espaço para dizer o que talvez merecesse ser dito há algum tempo."
      ]
    },
    {
      chapter: "CAPÍTULO II",
      title: "O que eu queria dizer",
      paragraphs: [
        "Quero que você saiba que sua presença tem um significado especial para mim.",
        "Às vezes são os detalhes mais simples que ficam guardados: uma conversa, um sorriso, uma lembrança que aparece sem avisar."
      ]
    },
    {
      chapter: "CAPÍTULO III",
      title: "Uma última coisa",
      paragraphs: [
        "Não escrevi esta carta esperando uma resposta perfeita. Escrevi porque algumas palavras merecem encontrar seu caminho até alguém.",
        "Obrigado por chegar até aqui. Guarde esta mensagem com o mesmo carinho com que ela foi preparada."
      ]
    }
  ]
};

const $ = (selector) => document.querySelector(selector);
const screens = [$("#intro"), $("#reading"), $("#ending")];
let currentPage = 0;

function showScreen(target) {
  screens.forEach((screen) => screen.classList.toggle("active", screen === target));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDots() {
  const container = $("#dots");
  container.replaceChildren();
  LETTER.pages.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === currentPage) dot.classList.add("current");
    container.append(dot);
  });
}

function renderPage() {
  const page = LETTER.pages[currentPage];
  $("#chapter").textContent = page.chapter;
  $("#page-number").textContent =
    String(currentPage + 1).padStart(2, "0") + " / " + String(LETTER.pages.length).padStart(2, "0");
  $("#letter-date").textContent = LETTER.date;
  $("#page-title").textContent = page.title;
  $("#previous").disabled = currentPage === 0;
  $("#next").textContent = currentPage === LETTER.pages.length - 1 ? "Finalizar →" : "Continuar →";

  const content = $("#letter-content");
  content.replaceChildren();
  page.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    content.append(p);
  });
  renderDots();
}

function openLetter() {
  const button = $("#open-letter");
  button.classList.add("opened");
  button.disabled = true;
  window.setTimeout(() => {
    currentPage = 0;
    renderPage();
    showScreen($("#reading"));
    button.disabled = false;
  }, 500);
}

function nextPage() {
  if (currentPage < LETTER.pages.length - 1) {
    currentPage += 1;
    renderPage();
    return;
  }
  $("#signature").textContent = LETTER.signature;
  $("#ending-message").textContent = LETTER.ending;
  showScreen($("#ending"));
}

function previousPage() {
  if (currentPage > 0) {
    currentPage -= 1;
    renderPage();
  }
}

$("#open-letter").addEventListener("click", openLetter);
$("#next").addEventListener("click", nextPage);
$("#previous").addEventListener("click", previousPage);
$("#read-again").addEventListener("click", () => {
  $("#open-letter").classList.remove("opened");
  currentPage = 0;
  showScreen($("#intro"));
});

document.title = "Uma carta para você";
