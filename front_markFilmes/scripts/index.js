import getDados from "./getDados.js";

const elementos = {
    top5:       document.querySelector('[data-name="top5"]'),
    lancamentos:document.querySelector('[data-name="lancamentos"]'),
    series:     document.querySelector('[data-name="series"]'),
    filmes:     document.querySelector('[data-name="filmes"]'),
    categoria:  document.querySelector('[data-name="categoria"]'),
};

// ── Criação de listas ──────────────────────────────────────────────────────────

function criarListaSeries(elemento, dados) {
    if (!elemento || !dados) return;
    const ul = document.createElement('ul');
    ul.className = 'lista';
    ul.innerHTML = dados.map(item => `
        <li>
            <a href="detalhes.html?id=${item.id}">
                <img src="${item.poster}" alt="${item.titulo}" loading="lazy">
                <span class="card-titulo">${item.titulo}</span>
            </a>
        </li>
    `).join('');
    elemento.innerHTML = '';
    elemento.appendChild(ul);
}

function criarListaFilmes(elemento, dados) {
    if (!elemento || !dados) return;
    const ul = document.createElement('ul');
    ul.className = 'lista';
    ul.innerHTML = dados.map(item => `
        <li>
            <a href="detalhes-filmes.html?id=${item.id}">
                <img src="${item.poster}" alt="${item.titulo}" loading="lazy">
                <span class="card-titulo">${item.titulo}</span>
            </a>
        </li>
    `).join('');
    elemento.innerHTML = '';
    elemento.appendChild(ul);
}

// ── Carregamento inicial ───────────────────────────────────────────────────────

function carregarSeries() {
    Promise.all([
        getDados('/series/top5'),
        getDados('/series/lancamentos'),
        getDados('/series'),
    ]).then(([top5, lancamentos, series]) => {
        criarListaSeries(elementos.top5, top5);
        criarListaSeries(elementos.lancamentos, lancamentos);
        criarListaSeries(elementos.series, series.slice(0, 5));
    }).catch(() => console.error('Erro ao carregar séries'));
}

function carregarFilmes() {
    getDados('/filmes')
        .then(data => criarListaFilmes(elementos.filmes, data.slice(0, 5)))
        .catch(() => console.error('Erro ao carregar filmes'));
}

// ── Filtro de categoria ────────────────────────────────────────────────────────

const categoriaSelect = document.querySelector('[data-categorias]');
const sectionsNormais = document.querySelectorAll('.section:not([data-name="categoria"])');

categoriaSelect.addEventListener('change', function () {
    const categoriaSelecionada = categoriaSelect.value;

    if (categoriaSelecionada === 'todos') {
        // Mostra tudo e esconde seção de pesquisa
        sectionsNormais.forEach(s => s.classList.remove('hidden'));
        elementos.categoria.classList.add('hidden');
        return;
    }

    // Esconde seções normais e mostra seção de resultado
    sectionsNormais.forEach(s => s.classList.add('hidden'));
    elementos.categoria.classList.remove('hidden');
    elementos.categoria.querySelector('h2').textContent =
        `Títulos: ${categoriaSelecionada.charAt(0).toUpperCase() + categoriaSelecionada.slice(1)}`;

    // CORRIGIDO: a função correta é criarListaSeries (antes chamava "criarLista" que não existe)
    // Busca séries E filmes da categoria e exibe juntos
    Promise.all([
        getDados(`/series/categoria/${encodeURIComponent(categoriaSelecionada)}`),
        getDados(`/filmes/categoria/${encodeURIComponent(categoriaSelecionada)}`),
    ]).then(([series, filmes]) => {
        const todos = [...series, ...filmes];
        criarListaSeries(elementos.categoria, todos);
    }).catch(() => console.error('Erro ao carregar categoria'));
});

// ── Executa ───────────────────────────────────────────────────────────────────
carregarSeries();
carregarFilmes();
