package br.com.markFilmes.controller;

import br.com.markFilmes.dto.FilmeDTO;
import br.com.markFilmes.model.Filme;
import br.com.markFilmes.repository.FilmeRepository;
import br.com.markFilmes.service.FilmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/filmes")
public class FilmeController {

    @Autowired
    private FilmeRepository repositorio;
    private FilmeService servico;

    @GetMapping("/{id}")
    public FilmeDTO obterFilmePorId(@PathVariable Long id) {
        return servico.obterPorId(id);
    }

    @GetMapping("/top5")
    public List<Filme> top5() {
        return repositorio.findTop5ByOrderByAvaliacaoDesc();
    }

    @GetMapping("/lancamentos")
    public List<Filme> lancamentos() {
        return repositorio.findTop2ByOrderByIdDesc();
    }

    @GetMapping("/categoria/{genero}")
    public List<FilmeDTO> filmePorCategoria(@PathVariable String genero) {
        return servico.obterPorCategoria(genero);
    }


}

