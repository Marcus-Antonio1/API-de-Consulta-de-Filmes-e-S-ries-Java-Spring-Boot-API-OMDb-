package br.com.markFilmes.service;

import br.com.markFilmes.dto.EpisodioDTO;
import br.com.markFilmes.dto.SerieDTO;
import br.com.markFilmes.model.Categoria;
import br.com.markFilmes.model.Serie;
import br.com.markFilmes.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SerieService {

    @Autowired
    private SerieRepository repositorio;

    public List<SerieDTO> obterTodasAsSeries() {
        return converteDados(repositorio.findAll());
    }

    public List<SerieDTO> obterTop5Series() {
        return converteDados(repositorio.findTop5ByOrderByAvaliacaoDesc());
    }

    public List<SerieDTO> obterLancamentos() {
        return converteDados(repositorio.findTop2ByOrderByIdDesc());
    }

    public SerieDTO obterPorId(Long id) {
        Optional<Serie> serie = repositorio.findById(id);
        if (serie.isPresent()) {
            Serie s = serie.get();
            return toDTO(s);
        }
        return null;
    }

    // NOVO: filtro por categoria para o select do front-end
    public List<SerieDTO> obterPorCategoria(String generoStr) {
        Categoria categoria;
        try {
            categoria = Categoria.fromPortugues(generoStr);
        } catch (IllegalArgumentException e) {
            return List.of();
        }
        return converteDados(repositorio.findByGenero(categoria));
    }

    public List<EpisodioDTO> obterTemporadas(Long id) {
        Optional<Serie> serie = repositorio.findById(id);
        if (serie.isEmpty()) return List.of();
        return serie.get().getEpisodios().stream()
                .map(e -> new EpisodioDTO(e.getTemporada(), e.getTitulo(), e.getNumeroEpisodio()))
                .collect(Collectors.toList());
    }

    private SerieDTO toDTO(Serie s) {
        return new SerieDTO(s.getId(), s.getTitulo(), s.getTotalTemporadas(),
                s.getAvaliacao(), s.getGenero(), s.getAtores(), s.getPoster(), s.getSinopse());
    }

    private List<SerieDTO> converteDados(List<Serie> series) {
        return series.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
