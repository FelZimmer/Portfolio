/**
 * =============================================================================
 * SCRIPT PRINCIPAL DO PORTFÓLIO
 * =============================================================================
 * Organizado em pequenas funções independentes, cada uma responsável por
 * uma única funcionalidade. Todas são chamadas a partir de init().
 * =============================================================================
 */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------------------------------------------------------------------------
 * 1. Efeito de digitação no hero
 * ------------------------------------------------------------------------- */
function typeHeroCode() {
  const target = document.getElementById("typedCode");
  if (!target) return;

  const lines = [
    "const dev = {",
    "  nome: 'Felipe De Oliveira Zimmermann',",
    "  cargo: 'Estudante de Eng. de Software @FIAP',",
    "  stack: ['Python', 'API's REST', 'SQL AND NoSQL'],",
    "  foco: 'desenvolvimento back-end',",
    "  status: 'disponível para estágio',",
    "};",
  ];
  const fullText = lines.join("\n");

  // Respeita usuários que preferem menos movimento na tela
  if (prefersReducedMotion) {
    target.textContent = fullText;
    return;
  }

  let index = 0;
  const speedMs = 22;

  function typeNextChar() {
    if (index <= fullText.length) {
      target.textContent = fullText.slice(0, index);
      index += 1;
      setTimeout(typeNextChar, speedMs);
    }
  }
  typeNextChar();
}

/* ---------------------------------------------------------------------------
 * 2. Renderiza os cards de projeto a partir de js/projects-data.js
 * ------------------------------------------------------------------------- */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid || typeof projectsData === "undefined") return;

  const externalLinkIcon =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
  const githubIcon =
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>';

  grid.innerHTML = projectsData
    .map((project) => {
      const featuredBadge = project.featured
        ? '<span class="project-card__featured">destaque</span>'
        : "";

      const tagsHtml = project.tags
        .map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`)
        .join("");

      return `
        <article class="project-card reveal">
          <header class="project-card__header">
            <span class="project-card__lang-dot" style="--dot-color: ${escapeHtml(
              project.languageColor
            )}"></span>
            <span class="project-card__filename"><strong>${escapeHtml(
              project.name
            )}</strong>.${escapeHtml(project.extension)}</span>
            ${featuredBadge}
          </header>
          <div class="project-card__body">
            <p class="project-card__desc">${escapeHtml(project.description)}</p>
            <ul class="project-card__tags">${tagsHtml}</ul>
            <div class="project-card__links">
              <a href="${escapeAttr(project.demoUrl)}" target="_blank" rel="noopener noreferrer">
                ${externalLinkIcon} Demo
              </a>
              <a href="${escapeAttr(project.repoUrl)}" target="_blank" rel="noopener noreferrer">
                ${githubIcon} Código
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

// Escapa texto simples antes de inserir no HTML (evita quebra de layout com caracteres especiais)
function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}
function escapeAttr(value) {
  return String(value ?? "").replace(/"/g, "&quot;");
}

/* ---------------------------------------------------------------------------
 * 3. Menu mobile (abrir/fechar abas em telas pequenas)
 * ------------------------------------------------------------------------- */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const tabs = document.querySelector(".tabs");
  if (!toggle || !tabs) return;

  toggle.addEventListener("click", () => {
    const isOpen = tabs.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link (útil em telas pequenas)
  tabs.querySelectorAll(".tabs__link").forEach((link) => {
    link.addEventListener("click", () => {
      tabs.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------------------------
 * 4. Scrollspy — marca a aba ativa conforme a seção visível
 * ------------------------------------------------------------------------- */
function setupScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".tabs__link");
  if (!sections.length || !links.length) return;

  const linkBySection = new Map();
  links.forEach((link) => {
    linkBySection.set(link.dataset.nav, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkBySection.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------------------
 * 5. Revelação suave de elementos ao rolar a página
 * ------------------------------------------------------------------------- */
function setupRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------------
 * 6. Copiar e-mail para a área de transferência
 * ------------------------------------------------------------------------- */
function setupCopyEmail() {
  const button = document.getElementById("copyEmailBtn");
  const emailLink = document.getElementById("emailLink");
  if (!button || !emailLink) return;

  button.addEventListener("click", async () => {
    const email = emailLink.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      const original = button.textContent;
      button.textContent = "copiado!";
      setTimeout(() => {
        button.textContent = original;
      }, 1800);
    } catch (error) {
      // Ambientes sem permissão de clipboard: aviso simples, sem quebrar a página
      console.warn("Não foi possível copiar automaticamente.", error);
    }
  });
}

/* ---------------------------------------------------------------------------
 * 7. Ano atual no rodapé
 * ------------------------------------------------------------------------- */
function setCurrentYear() {
  const el = document.getElementById("anoAtual");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------------------
 * Inicialização
 * ------------------------------------------------------------------------- */
function init() {
  typeHeroCode();
  renderProjects();
  setupMobileNav();
  setupScrollSpy();
  setupRevealOnScroll();
  setupCopyEmail();
  setCurrentYear();
}

document.addEventListener("DOMContentLoaded", init);
