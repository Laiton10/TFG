package org.example.tfgbackend.Controllers;


import jakarta.validation.Valid;
import org.example.tfgbackend.Model.Favorito;
import org.example.tfgbackend.Services.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/favoritos")
@CacheConfig(cacheNames = {"favoritos"})
public class FavoritoController {
    @Autowired
    private FavoritoService favoritoService;

    @GetMapping
    public ResponseEntity<List<Favorito>> findAll() {
        return ResponseEntity.ok(favoritoService.findAll());
    }

    @GetMapping("/{id}")
    @Cacheable
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try{
            Thread.sleep(3000);
            Optional<Favorito> favorito= favoritoService.findById(id);
            if(favorito.isPresent()){
                return ResponseEntity.ok(favorito);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorito no encontrado");
            }
        }catch (InterruptedException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Favorito> save(@Valid @RequestBody Favorito favorito) {
        return ResponseEntity.ok(favoritoService.save(favorito));
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Favorito> favorito= favoritoService.findById(id);
        if(favorito.isPresent()){
            favoritoService.delete(id);
            return ResponseEntity.ok("Favorito eliminada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorito no encontrado");
        }
    }

}
