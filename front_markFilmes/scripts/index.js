import getDados from "./getDados.js";

const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    lancamentos: document.querySelector('[data-name="lancamentos"]'),
    series: document.querySelector('[data-name="series"]'),
    filmes: document.querySelector('[data-name="filmes"]')
};

function criarListaSeries(elemento, dados) {
    if (!elemento) return;

    const ul = document.createElement('ul');
    ul.className = 'lista';

    ul.innerHTML = dados.map(item => `
        <li>
            <a href="/detalhes.html?id=${item.id}">
                <img src="${item.poster}" alt="${item.titulo}">
            </a>
        </li>
    `).join('');

    elemento.innerHTML = '';
    elemento.appendChild(ul);
}

function criarListaFilmes(elemento, dados) {
    if (!elemento) return;

    const ul = document.createElement('ul');
    ul.className = 'lista';

    ul.innerHTML = dados.map(item => `
        <li>
            <a href="/detalhes-filmes.html?id=${item.id}">
                <img src="${item.poster}" alt="${item.titulo}">
            </a>
        </li>
    `).join('');

    elemento.innerHTML = '';
    elemento.appendChild(ul);
}

// SERIES
function carregarSeries() {
    const urls = ['/series/top5', '/series/lancamentos', '/series'];

    Promise.all(urls.map(url => getDados(url)))
        .then(data => {
            criarListaSeries(elementos.top5, data[0]);
            criarListaSeries(elementos.lancamentos, data[1]);
            criarListaSeries(elementos.series, data[2].slice(0, 5));
        });
}

//FILMES
function carregarFilmes() {
    if (!elementos.filmes) return;

    getDados('/filmes')
        .then(data => {
            criarListaFilmes(elementos.filmes, data.slice(0, 5));
        });
}

// EXECUTA
carregarSeries();
carregarFilmes();

// ERRO
function lidarComErro(mensagemErro) {
    console.error(mensagemErro);
}

// FILTRO
const categoriaSelect = document.querySelector('[data-categorias]');
const sectionsParaOcultar = document.querySelectorAll('.section');

categoriaSelect.addEventListener('change', function () {
    const categoria = document.querySelector('[data-name="categoria"]');
    const categoriaSelecionada = categoriaSelect.value;

    if (categoriaSelecionada === 'todos') {
        sectionsParaOcultar.forEach(section => section.classList.remove('hidden'));
        categoria.classList.add('hidden');
    } else {
        sectionsParaOcultar.forEach(section => section.classList.add('hidden'));
        categoria.classList.remove('hidden');

        getDados(`/series/categoria/${categoriaSelecionada}`)
            .then(data => {
                criarLista(categoria, data); // corrigido aqui
            })
            .catch(() => {
                lidarComErro("Erro ao carregar categoria");
            });
    }
});