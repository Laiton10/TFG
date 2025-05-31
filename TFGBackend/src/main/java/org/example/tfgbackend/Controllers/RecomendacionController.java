package org.example.tfgbackend.Controllers;

import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import org.example.tfgbackend.DTO.FavoritoDTO;
import org.example.tfgbackend.DTO.RecomendacionDTO;
import org.example.tfgbackend.Model.Favorito;
import org.example.tfgbackend.Model.Pelicula;
import org.example.tfgbackend.Model.Recomendacion;
import org.example.tfgbackend.Model.Usuario;
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
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recomendación no encontrada");
            }
        }catch (InterruptedException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody RecomendacionDTO recomendacionDTO ) {
        try {
            if (recomendacionService.existsByUsuarioAndPelicula(recomendacionDTO.getUsuario_id(), recomendacionDTO.getPelicula_id())) {
                return ResponseEntity.ok("Ya has recomendado esta película.");
            }
            Recomendacion recomendacion = new Recomendacion();

            Usuario usuario = new Usuario();
            usuario.setId(recomendacionDTO.getUsuario_id());

            Pelicula pelicula = new Pelicula();
            pelicula.setId(recomendacionDTO.getPelicula_id());

            recomendacion.setUsuario(usuario);
            recomendacion.setPelicula(pelicula);

            recomendacionService.save(recomendacion);

            return ResponseEntity.ok("Recomendación agregada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al hacer recomendación: " + e.getMessage());
        }
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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Recomendacion> recomendacion= recomendacionService.findById(id);
        if(recomendacion.isPresent()){
            recomendacionService.delete(id);
            return ResponseEntity.ok("Recomendacion eliminada");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recomendacion no encontrada");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam Integer usuario_id, @RequestParam String pelicula_id) {
        recomendacionService.deleteByUsuarioAndPelicula(usuario_id, pelicula_id);
        return ResponseEntity.ok("Recomencdación eliminada");
    }

}
