package org.example.tfgbackend.Services;

import org.example.tfgbackend.Model.Recomendacion;
import org.example.tfgbackend.Repository.RecomendacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RecomendacionService {
    @Autowired
    private RecomendacionRepository recomendacionRepository;
    public List<Recomendacion> findAll(){
        return recomendacionRepository.findAll();
    }
    public Optional<Recomendacion> findById(Integer id){
        return recomendacionRepository.findById(id);
    }
    public Recomendacion save(Recomendacion recomendacion){
        return recomendacionRepository.save(recomendacion);
    }

    public boolean existsByUsuarioAndPelicula(Integer usuarioId, String peliculaId) {
        return recomendacionRepository.existsByUsuario_IdAndPelicula_Id(usuarioId, peliculaId);
    }

    public boolean update(Recomendacion recomendacion){
        Optional<Recomendacion> recomendacionOptional= recomendacionRepository.findById(recomendacion.getId());
        if (recomendacionOptional.isPresent()){
            recomendacionRepository.save(recomendacion);
            return true;
        }else{
            return false;
        }
    }
    public boolean delete(Integer idRecomendacion){
        Optional<Recomendacion> recomendacion= recomendacionRepository.findById(idRecomendacion);
        if (recomendacion.isPresent()){
            recomendacionRepository.deleteById(idRecomendacion);
            return true;
        }else{
            return false;
        }
    }

    @Transactional
    public void deleteByUsuarioAndPelicula(Integer usuario_id, String pelicula_id) {
        recomendacionRepository.deleteByUsuarioIdAndPeliculaId(usuario_id, pelicula_id);
    }
}
