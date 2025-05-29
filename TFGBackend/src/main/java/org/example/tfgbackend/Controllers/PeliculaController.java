package org.example.tfgbackend.Controllers;

import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import org.example.tfgbackend.Model.Pelicula;
import org.example.tfgbackend.Services.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/peliculas")
@CacheConfig(cacheNames = {"peliculas"})
public class PeliculaController {
    @Autowired
    private PeliculaService peliculaService;

    @GetMapping
    public ResponseEntity<List<Pelicula>> findAll() {
        return ResponseEntity.ok(peliculaService.findAll());
    }

    @GetMapping("/{id}")
    @Cacheable
    public ResponseEntity<?> findById(@PathVariable String id) {
        try{
            Thread.sleep(3000);
            Optional<Pelicula> pelicula= peliculaService.findById(id);
            if(pelicula.isPresent()){
                return ResponseEntity.ok(pelicula);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
            }
        }catch (InterruptedException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Pelicula> save(@Valid @RequestBody Pelicula pelicula) {
        return ResponseEntity.ok(peliculaService.save(pelicula));
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insert(@Valid @RequestBody Pelicula pelicula) {
        boolean exists= peliculaService.existsById(pelicula.getId());
        if(exists){
            return ResponseEntity.ok("Película ya existente");
        }else{
            peliculaService.insertNuevaPelicula(pelicula);
            return ResponseEntity.ok("Película insertada");
        }
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Pelicula pelicula, ServletRequest servletRequest) {
        Optional<Pelicula> peliculaOptional= peliculaService.findById(pelicula.getId());
        if(peliculaOptional.isPresent()){
            peliculaService.update(pelicula);
            return ResponseEntity.ok("Película actualizada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathVariable String id) {
        Optional<Pelicula> pelicula= peliculaService.findById(id);
        if(pelicula.isPresent()){
            peliculaService.delete(id);
            return ResponseEntity.ok("Película eliminada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Película no encontrada");
        }
    }

}
