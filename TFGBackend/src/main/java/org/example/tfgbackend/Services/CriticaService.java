package org.example.tfgbackend.Services;

import org.example.tfgbackend.Model.Critica;
import org.example.tfgbackend.Repository.CriticasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CriticaService {
    @Autowired
    private CriticasRepository criticaRepository;
    public List<Critica> findAll(){
        return criticaRepository.findAll();
    }
    public Optional<Critica> findById(Integer id){
        return criticaRepository.findById(id);
    }
    public Critica save(Critica critica){
        return criticaRepository.save(critica);
    }

    public boolean update(Critica critica){
        Optional<Critica> criticaOptional= criticaRepository.findById(critica.getId());
        if (criticaOptional.isPresent()){
            criticaRepository.save(critica);
            return true;
        }else{
            return false;
        }
    }
    public boolean delete(Integer idCritica){
        Optional<Critica> critica= criticaRepository.findById(idCritica);
        if (critica.isPresent()){
            criticaRepository.deleteById(idCritica);
            return true;
        }else{
            return false;
        }
    }
}
