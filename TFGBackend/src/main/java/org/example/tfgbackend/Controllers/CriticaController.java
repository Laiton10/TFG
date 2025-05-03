package org.example.tfgbackend.Controllers;

import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import org.example.tfgbackend.Model.Critica;
import org.example.tfgbackend.Services.CriticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/criticas")
@CacheConfig(cacheNames = {"criticas"})
public class CriticaController {
    @Autowired
    private CriticaService criticaService;

    @GetMapping
    public ResponseEntity<List<Critica>> findAll() {
        return ResponseEntity.ok(criticaService.findAll());
    }

    @GetMapping("/{id}")
    @Cacheable
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try{
            Thread.sleep(3000);
            Optional<Critica> critica= criticaService.findById(id);
            if(critica.isPresent()){
                return ResponseEntity.ok(critica);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Critica no encontrada");
            }
        }catch (InterruptedException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Critica> save(@Valid @RequestBody Critica critica) {
        return ResponseEntity.ok(criticaService.save(critica));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Critica critica, ServletRequest servletRequest) {
        Optional<Critica> criticaOptional= criticaService.findById(critica.getId());
        if(criticaOptional.isPresent()){
            criticaService.update(critica);
            return ResponseEntity.ok("Crítica actualizada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Crítica no encontrada");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Critica> critica= criticaService.findById(id);
        if(critica.isPresent()){
            criticaService.delete(id);
            return ResponseEntity.ok("Crítica eliminada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Crítica no encontrada");
        }
    }

}
