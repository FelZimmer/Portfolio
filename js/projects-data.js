/**
 * =============================================================================
 * DADOS DOS PROJETOS
 * =============================================================================
 * Esta é a ÚNICA parte do site que você precisa editar para adicionar,
 * remover ou atualizar um projeto. O script.js lê este array e gera os
 * cards automaticamente na seção "Projetos" — nenhum HTML precisa ser tocado.
 *
 * COMO ADICIONAR UM NOVO PROJETO:
 * 1. Copie um dos objetos abaixo (do "{" até o "}").
 * 2. Cole antes ou depois, na posição em que quer que ele apareça.
 * 3. Preencha os campos com as informações do seu projeto.
 * 4. Salve o arquivo — pronto, o card aparece no site.
 *
 * CAMPOS:
 * - id            -> identificador único (sem espaços), ex: 'app-financas'
 * - name          -> nome exibido no card, ex: 'app-financas'
 * - extension     -> extensão exibida ao lado do nome, ex: 'tsx', 'py', 'go'
 * - languageColor -> cor do "pontinho" de linguagem (use uma das variáveis
 *                    de acento do CSS: '#5eead4', '#f0b86e', '#b794f6', '#f589a3')
 * - description   -> frase curta explicando o que o projeto faz
 * - tags          -> array com as tecnologias usadas
 * - demoUrl       -> link para o projeto no ar (use '#' se não tiver)
 * - repoUrl       -> link para o repositório no GitHub (use '#' se não tiver)
 * - featured      -> true/false — mostra um selo "destaque" no card
 * =============================================================================
 */

const projectsData = [
  {
    id: "auron",
    name: "Auron",
    extension: "py",
    languageColor: "#f0b86e",
    description:
      "// Plataforma B2B de monitoramento e proteção contra anomalias solares para data centers, com dashboard em tempo real e relatórios de ROI automatizados.",
    tags: ["Python", "Streamlit", "Plotly"],
    demoUrl: "#",
    repoUrl: "https://github.com/FelZimmer/Auron",
    featured: true,
  },
  {
    id: "StockPilot",
    name: "StockPilot",
    extension: "py",
    languageColor: "#f0b86e",
    description:
      "// Sistema de gerenciamento gerenciamento de produtos e vendas, de uma startup de  e-commerce fictícia. O objetivo é fornecer uma base sólida e escalável para gerenciar as principais entidades do negócio: produtos, categórias, usuários e vendas. ",
    tags: ["Flask", "MongoDB", "PyMongo", "Pydantic", "PyJWT", "HTML5", "CSS"],
    demoUrl: "https://stockpilot-e8rg.onrender.com",
    repoUrl: "https://github.com/FelZimmer/StockPilot",
    featured: true,
  },
  {
    id: "Totsimple",
    name: "totsimple",
    extension: "jsx",
    languageColor: "#5eead4",
    description:
      "// Sistema de totens de autoatendimento para drogarias: digitaliza receitas, organiza pedidos ao farmacêutico e reduz o tempo de espera do cliente.",
    tags: ["React.js", "HTML", "CSS"],
    demoUrl: "#",
    repoUrl: "https://github.com/FelZimmer/Totsimple",
    featured: true,
  },
  {
    id: "babbuns-finances",
    name: "babbuns-finances",
    extension: "js",
    languageColor: "#b794f6",
    description:
      "// Plataforma de educação financeira com chatbot e calculadora financeira interativa, criada para o Future Fest da FIAP School.",
    tags: ["Node.js", "MongoDB", "Google Gemini"],
    demoUrl: "#",
    repoUrl: "#",
    featured: false,
  },
];
