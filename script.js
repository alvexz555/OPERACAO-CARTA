/*
 * CARTA GUARDADA
 * Personalize o objeto LETTER para criar sua própria carta.
 * Em um site estático, este conteúdo fica visível para quem visitar a página.
 */
const LETTER = {
  date: "Escrito com carinho,",
  signature: "Seu nome",
  ending: "Se algum dia esta carta voltar às suas mãos, espero que ela ainda consiga trazer um pouco do carinho com que foi escrita.",
  pages: [
    {
      chapter: "PÁGINA I",
      title: "Antes de tudo...",
      paragraphs: [
        "Existem coisas que a gente sente e nem sempre consegue dizer no momento certo.",
        "Então resolvi escrever. Queria que estas palavras tivessem um lugar para ficar, sem pressa e sem desaparecer no meio de tantas notificações."
      ]
    },
    {
      chapter: "PÁGINA II",
      title: "O que ficou guardado",
      paragraphs: [
        "Quero que você saiba que sua presença tem um significado especial para mim.",
        "Às vezes são os detalhes mais simples que permanecem: uma conversa que se estende, um sorriso inesperado, uma lembrança que aparece quando a gente menos espera."
      ]
    },
    {
      chapter: "PÁGINA III",
      title: "Só mais uma coisa",
      paragraphs: [
        "Não escrevi esta carta esperando uma resposta perfeita. Escrevi porque algumas palavras merecem encontrar seu caminho até alguém.",
        "Se chegou até aqui, obrigado por dedicar um pedacinho do seu tempo a estas linhas. Espero que guarde esta carta com carinho."
      ]
    }
  ]
};

const $ = (selector) => document.querySelector(selector);
const screens = [$("#intro"), $("#reading"), $("#ending")];
let currentPage = 0;
let isOpening = false;

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
  if (!page) return;

  $("#chapter").textContent = page.chapter;
  $("#page-number").textContent =
    String(currentPage + 1).padStart(2, "0") + " / " +
    String(LETTER.pages.length).padStart(2, "0");
  $("#letter-date").textContent = LETTER.date;
  $("#page-title").textContent = page.title;
  $("#previous").disabled = currentPage === 0;
  $("#next").textContent = currentPage === LETTER.pages.length - 1
    ? "Encerrar a carta →"
    : "Próxima página →";

  const content = $("#letter-content");
  content.replaceChildren();
  page.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    content.append(p);
  });

  const paper = $("#paper");
  paper.classList.remove("page-turn");
  void paper.offsetWidth;
  paper.classList.add("page-turn");
  renderDots();
}

function openLetter() {
  if (isOpening) return;
  isOpening = true;
  const button = $("#open-letter");
  button.classList.add("opened");
  button.disabled = true;

  window.setTimeout(() => {
    currentPage = 0;
    renderPage();
    showScreen($("#reading"));
    button.disabled = false;
    isOpening = false;
  }, 650);
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

document.title = "Carta Guardada";
