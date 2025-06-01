package org.example.tfgbackend.Repository;


import org.example.tfgbackend.Model.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PeliculaRepository extends JpaRepository<Pelicula, String> {
    Optional<Pelicula> findById(String id);
}