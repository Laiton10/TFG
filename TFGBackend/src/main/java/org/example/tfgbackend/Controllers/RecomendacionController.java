package org.example.tfgbackend.Controllers;

import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import org.example.tfgbackend.Model.Recomendacion;
import org.example.tfgbackend.Services.RecomendacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recomendaciones")
@CacheConfig(cacheNames = {"recomendaciones"})
public class RecomendacionController {
    @Autowired
    private RecomendacionService recomendacionService;

    @GetMapping
    public ResponseEntity<List<Recomendacion>> findAll() {
        return ResponseEntity.ok(recomendacionService.findAll());
    }

    @GetMapping("/{id}")
    @Cacheable
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try{
            Thread.sleep(3000);
            Optional<Recomendacion> recomendacion= recomendacionService.findById(id);
            if(recomendacion.isPresent()){
                return ResponseEntity.ok(recomendacion);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recomendacion no encontrada");
            }
        }catch (InterruptedException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Recomendacion> save(@Valid @RequestBody Recomendacion recomendacion) {
        return ResponseEntity.ok(recomendacionService.save(recomendacion));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Recomendacion recomendacion, ServletRequest servletRequest) {
        Optional<Recomendacion> recomendacionOptional= recomendacionService.findById(recomendacion.getId());
        if(recomendacionOptional.isPresent()){
            recomendacionService.update(recomendacion);
            return ResponseEntity.ok("Recomendacion actualizada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recomendacion no encontrada");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Recomendacion> recomendacion= recomendacionService.findById(id);
        if(recomendacion.isPresent()){
            recomendacionService.delete(id);
            return ResponseEntity.ok("Recomendacion eliminada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recomendacion no encontrada");
        }
    }

}
