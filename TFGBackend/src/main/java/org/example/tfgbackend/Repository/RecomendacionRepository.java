package org.example.tfgbackend.Repository;

import org.example.tfgbackend.Model.Favorito;
import org.example.tfgbackend.Model.Recomendacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecomendacionRepository extends JpaRepository<Recomendacion, Integer> {
    boolean existsByUsuario_IdAndPelicula_Id(Integer usuarioId, String peliculaId);
    void deleteByUsuarioIdAndPeliculaId(Integer usuario_id, String pelicula_id);
}
