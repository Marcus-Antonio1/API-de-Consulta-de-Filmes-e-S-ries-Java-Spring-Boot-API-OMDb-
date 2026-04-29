package br.com.markFilmes.model;

public enum Categoria {
    ACAO("Action", "ação"),
    ROMANCE("Romance", "romance"),
    COMEDIA("Comedy", "comédia"),
    DRAMA("Drama", "drama"),
    CRIME("Crime", "crime"),
    AVENTURA("Adventure", "aventura");

    private final String categoriaOmdb;
    private final String categoriaPortugues;

    Categoria(String categoriaOmdb, String categoriaPortugues) {
        this.categoriaOmdb = categoriaOmdb;
        this.categoriaPortugues = categoriaPortugues;
    }

    public static Categoria fromString(String text) {
        for (Categoria categoria : Categoria.values()) {
            if (categoria.categoriaOmdb.equalsIgnoreCase(text)) {
                return categoria;
            }
        }
        throw new IllegalArgumentException("Nenhuma categoria encontrada para: " + text);
    }

    public static Categoria fromPortugues(String text) {
        for (Categoria categoria : Categoria.values()) {
            if (categoria.categoriaPortugues.equalsIgnoreCase(text.trim())) {
                return categoria;
            }
        }
        throw new IllegalArgumentException("Nenhuma categoria encontrada para: " + text);
    }
}
