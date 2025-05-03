package org.example.tfgbackend.Services;

import org.example.tfgbackend.Model.Favorito;
import org.example.tfgbackend.Repository.FavoritosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FavoritoService {
    @Autowired
    private FavoritosRepository favoritosRepository;
    public List<Favorito> findAll(){
        return favoritosRepository.findAll();
    }
    public Optional<Favorito> findById(Integer id){
        return favoritosRepository.findById(id);
    }
    public Favorito save(Favorito favorito){
        return favoritosRepository.save(favorito);
    }

    public boolean update(Favorito favorito){
        Optional<Favorito> favoritoOptional= favoritosRepository.findById(favorito.getId());
        if (favoritoOptional.isPresent()){
            favoritosRepository.save(favorito);
            return true;
        }else{
            return false;
        }
    }
    public boolean delete(Integer idFavorito){
        Optional<Favorito> favorito= favoritosRepository.findById(idFavorito);
        if (favorito.isPresent()){
            favoritosRepository.deleteById(idFavorito);
            return true;
        }else{
            return false;
        }
    }
}
