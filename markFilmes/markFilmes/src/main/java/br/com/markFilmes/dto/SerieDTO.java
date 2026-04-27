package br.com.markFilmes.dto;

import br.com.markFilmes.model.Categoria;
import jakarta.persistence.*;

public record SerieDTO(Long id,
                       String titulo,
                       Integer totalTemporadas,
                       Double avaliacao,
                       Categoria genero,
                       String atores,
                       String poster,
                       String sinopse) {

}
