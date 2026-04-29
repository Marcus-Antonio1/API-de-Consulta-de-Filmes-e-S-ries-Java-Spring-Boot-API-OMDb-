import getDados from "./getDados.js";

const elementos = {
    top5:       document.querySelector('[data-name="top5"]'),
    lancamentos:document.querySelector('[data-name="lancamentos"]'),
    filmes:     document.querySelector('[data-name="filmes"]'),
    categoria:  document.querySelector('[data-name="categoria"]'),
};

function criarListaFilmes(elemento, dados) {
    if (!elemento || !dados) return;

    const ulExistente = elemento.querySelector('ul');
    if (ulExistente) ulExistente.remove();

    const ul = document.createElement('ul');
    ul.className = 'lista';
    ul.innerHTML = dados.map(filme => `
        <li>
            <a href="detalhes-filmes.html?id=${filme.id}">
                <img src="${filme.poster}" alt="${filme.titulo}" loading="lazy">
                <span class="card-titulo">${filme.titulo}</span>
            </a>
        </li>
    `).join('');
    elemento.appendChild(ul);
}

function geraFilmes() {
    Promise.all([
        getDados('/filmes/top5'),
        getDados('/filmes/lancamentos'),
        getDados('/filmes'),
    ]).then(([top5, lancamentos, filmes]) => {
        criarListaFilmes(elementos.top5, top5);
        criarListaFilmes(elementos.lancamentos, lancamentos);
        criarListaFilmes(elementos.filmes, filmes);
    }).catch(() => console.error("Erro ao carregar filmes"));
}

// ── Filtro de categoria (estava faltando nesta página) ────────────────────────
const categoriaSelect = document.querySelector('[data-categorias]');
const sectionsNormais = document.querySelectorAll('.section:not([data-name="categoria"])');

if (categoriaSelect) {
    categoriaSelect.addEventListener('change', function () {
        const categoriaSelecionada = categoriaSelect.value;

        if (categoriaSelecionada === 'todos') {
            sectionsNormais.forEach(s => s.classList.remove('hidden'));
            elementos.categoria.classList.add('hidden');
            return;
        }

        sectionsNormais.forEach(s => s.classList.add('hidden'));
        elementos.categoria.classList.remove('hidden');
        elementos.categoria.querySelector('h2').textContent =
            `Filmes: ${categoriaSelecionada.charAt(0).toUpperCase() + categoriaSelecionada.slice(1)}`;

        getDados(`/filmes/categoria/${encodeURIComponent(categoriaSelecionada)}`)
            .then(data => criarListaFilmes(elementos.categoria, data))
            .catch(() => console.error('Erro ao carregar categoria de filmes'));
    });
}

geraFilmes();
