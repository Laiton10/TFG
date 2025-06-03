package org.example.tfgbackend.Repository;

import org.example.tfgbackend.Model.Critica;
import org.example.tfgbackend.Model.Recomendacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriticasRepository extends JpaRepository<Critica, Integer> {
    List<Critica> findByUsuarioId(Integer usuario_id);
    List<Critica> findByPeliculaId(String pelicula_id);
}
