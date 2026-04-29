package br.com.markFilmes.dto;

import br.com.markFilmes.model.Categoria;

public record FilmeDTO(
        Long id,
        String titulo,
        Integer anoLancamento,
        String duracao,
        Double avaliacao,
        Categoria genero,
        String atores,
        String poster,
        String sinopse
) {}
