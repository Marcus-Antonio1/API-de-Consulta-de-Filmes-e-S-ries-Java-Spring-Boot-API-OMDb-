import getDados from "./getDados.js";

const params     = new URLSearchParams(window.location.search);
const filmeId    = params.get('id');
const fichaDescricao = document.getElementById('ficha-descricao');

function estrelas(avaliacao) {
    const nota = Math.round((avaliacao / 2)); // de 10 para 5 estrelas
    return '★'.repeat(nota) + '☆'.repeat(5 - nota);
}

function carregarInfoFilme() {
    if (!filmeId || !fichaDescricao) return;

    // CORRIGIDO: a URL agora bate no endpoint GET /filmes/{id} que retorna um único objeto
    getDados(`/filmes/${filmeId}`)
        .then(filme => {
            if (!filme) {
                fichaDescricao.innerHTML = '<p>Filme não encontrado.</p>';
                return;
            }

            document.title = `${filme.titulo} - MarkFilmes`;

            fichaDescricao.innerHTML = `
                <img src="${filme.poster}" alt="${filme.titulo}" class="ficha-poster">
                <div class="ficha-info">
                    <h2>${filme.titulo}</h2>
                    <p class="ficha-genero">${filme.genero ?? ''} · ${filme.anoLancamento ?? ''} · ${filme.duracao ?? ''}</p>
                    <p class="ficha-estrelas" title="${filme.avaliacao}/10">${estrelas(filme.avaliacao)} <span>${filme.avaliacao}/10</span></p>
                    <p class="ficha-sinopse">${filme.sinopse ?? ''}</p>
                    <p class="ficha-elenco"><strong>Elenco:</strong> ${filme.atores ?? ''}</p>
                    <a href="filmes.html" class="btn-voltar">← Voltar para Filmes</a>
                </div>
            `;
        })
        .catch(() => {
            fichaDescricao.innerHTML = '<p>Erro ao carregar o filme.</p>';
        });
}

carregarInfoFilme();
