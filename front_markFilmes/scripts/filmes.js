import getDados from "./getDados.js";

const elementos = {
    top5: document.querySelector('[data-name="top5"]'),
    lancamentos: document.querySelector('[data-name="lancamentos"]'),
    filmes: document.querySelector('[data-name="filmes"]')
};

function criarListaFilmes(elemento, dados) {
    if (!elemento) return;

    const ulExistente = elemento.querySelector('ul');
    if (ulExistente) elemento.removeChild(ulExistente);

    const ul = document.createElement('ul');
    ul.className = 'lista';

    ul.innerHTML = dados.map(filme => `
        <li>
            <a href="detalhes-filmes.html?id=${filme.id}">
                <img src="${filme.poster}" alt="${filme.titulo}">
            </a>
        </li>
    `).join('');

    elemento.appendChild(ul);
}

function geraFilmes() {
    const urls = ['/filmes/top5', '/filmes/lancamentos', '/filmes'];

    Promise.all(urls.map(url => getDados(url)))
        .then(data => {
            criarListaFilmes(elementos.top5, data[0]);
            criarListaFilmes(elementos.lancamentos, data[1]);
            criarListaFilmes(elementos.filmes, data[2].slice(0, 5));
        })
        .catch(() => console.error("Erro ao carregar filmes"));
}

geraFilmes();