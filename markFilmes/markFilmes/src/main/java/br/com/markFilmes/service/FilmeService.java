package br.com.markFilmes.service;

import br.com.markFilmes.dto.FilmeDTO;
import br.com.markFilmes.model.Categoria;
import br.com.markFilmes.model.Filme;
import br.com.markFilmes.repository.FilmeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FilmeService {

    @Autowired
    private FilmeRepository repositorio;

    private FilmeDTO converterParaDTO(Filme f) {
        return new FilmeDTO(
                f.getId(),
                f.getTitulo(),
                f.getAnoLancamento(),
                f.getDuracao(),
                f.getAvaliacao(),
                f.getGenero(),
                f.getAtores(),
                f.getPoster(),
                f.getSinopse()
        );
    }

    private List<FilmeDTO> converteDados(List<Filme> filmes) {
        return filmes.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public List<FilmeDTO> obterTodosOsFilmes() {
        return converteDados(repositorio.findAll());
    }

    // CORRIGIDO: retorna um único filme pelo id (antes o controller ignorava o id)
    public FilmeDTO obterPorId(Long id) {
        Optional<Filme> filme = repositorio.findById(id);
        return filme.map(this::converterParaDTO).orElse(null);
    }

    public List<FilmeDTO> obterTop5() {
        return converteDados(repositorio.findTop5ByOrderByAvaliacaoDesc());
    }

    public List<FilmeDTO> obterLancamentos() {
        return converteDados(repositorio.findTop2ByOrderByIdDesc());
    }

    // NOVO: filtro por categoria para o select do front-end
    public List<FilmeDTO> obterPorCategoria(String generoStr) {
        // Converte a string do front (ex: "ação") para o enum Categoria
        Categoria categoria;
        try {
            categoria = Categoria.fromPortugues(generoStr);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
        return converteDados(repositorio.findByGenero(categoria));
    }
}
