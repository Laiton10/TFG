package org.example.tfgbackend.Repository;

import org.example.tfgbackend.Model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritosRepository extends JpaRepository<Favorito, Integer> {

}
