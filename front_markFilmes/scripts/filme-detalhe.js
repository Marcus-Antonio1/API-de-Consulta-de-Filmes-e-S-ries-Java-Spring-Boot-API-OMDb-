import getDados from "./getDados.js";

const params = new URLSearchParams(window.location.search);
const filmeId = params.get('id');

const fichaDescricao = document.getElementById('ficha-descricao');

function carregarInfoFilme() {
    if (!filmeId || !fichaDescricao) return;

    getDados(`/filmes/${filmeId}`)
        .then(data => {
            const filme = Array.isArray(data) ? data[0] : data;

            fichaDescricao.innerHTML = `
        <img src="${filme.poster}" alt="${filme.titulo}" />
        <div>
            <h2>${filme.titulo}</h2>
            <div class="descricao-texto">
                <p><b>Média:</b> ${filme.avaliacao}</p>
                <p>${filme.sinopse}</p>
                <p><b>Gênero:</b> ${filme.genero}</p>
                <p><b>Elenco:</b> ${filme.atores}</p>
            </div>
        </div>
            `;
        })
        .catch(() => console.error('Erro ao carregar filme'));
}

carregarInfoFilme();