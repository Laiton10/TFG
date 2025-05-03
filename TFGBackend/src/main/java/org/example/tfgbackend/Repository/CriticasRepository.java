package org.example.tfgbackend.Repository;

import org.example.tfgbackend.Model.Critica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriticasRepository extends JpaRepository<Critica, Integer> {

}
