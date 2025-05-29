package org.example.tfgbackend.Services;

import org.example.tfgbackend.Model.Pelicula;
import org.example.tfgbackend.Repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PeliculaService {
    @Autowired
    private PeliculaRepository peliculaRepository;

    public List<Pelicula> findAll(){
        return peliculaRepository.findAll();
    }
    public Optional<Pelicula> findById(String id){
        return peliculaRepository.findById(id);
    }
    public Pelicula save(Pelicula pelicula){
        return peliculaRepository.save(pelicula);
    }

    public boolean existsById(String id) {
        return peliculaRepository.existsById(id);
    }

    public void insertNuevaPelicula(Pelicula pelicula) {
        if (!existsById(pelicula.getId())) {
            peliculaRepository.save(pelicula);
        }
    }

    public boolean update(Pelicula pelicula){
        Optional<Pelicula> peliculaOptional= peliculaRepository.findById(pelicula.getId());
        if (peliculaOptional.isPresent()){
            peliculaRepository.save(pelicula);
            return true;
        }else{
            return false;
        }
    }
    public boolean delete(String idPelicula){
        Optional<Pelicula> pelicula= peliculaRepository.findById(idPelicula);
        if (pelicula.isPresent()){
            peliculaRepository.deleteById(idPelicula);
            return true;
        }else{
            return false;
        }
    }
}
