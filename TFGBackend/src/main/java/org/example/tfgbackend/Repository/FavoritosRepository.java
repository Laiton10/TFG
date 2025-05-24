package org.example.tfgbackend.Repository;

import org.example.tfgbackend.Model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoritosRepository extends JpaRepository<Favorito, Integer> {
    Optional<Favorito> findByUsuarioIdAndPeliculaId(Integer usuarioId, String peliculaId);
    void deleteByUsuarioIdAndPeliculaId(Integer usuarioId, String peliculaId);
    boolean existsByUsuario_IdAndPelicula_Id(Integer usuarioId, String peliculaId);
}
