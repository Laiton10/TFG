package org.example.tfgbackend.Repository;

import org.example.tfgbackend.Model.Recomendacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecomendacionRepository extends JpaRepository<Recomendacion, Integer> {

}
