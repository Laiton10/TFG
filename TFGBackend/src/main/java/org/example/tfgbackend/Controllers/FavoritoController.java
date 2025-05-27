package org.example.tfgbackend.Controllers;


import jakarta.validation.Valid;
import org.example.tfgbackend.DTO.FavoritoDTO;
import org.example.tfgbackend.Model.Favorito;
import org.example.tfgbackend.Model.Pelicula;
import org.example.tfgbackend.Model.Usuario;
import org.example.tfgbackend.Services.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    @GetMapping("/getFavorito")
    public ResponseEntity<?> getFavoritoByIds(@RequestParam Integer usuarioId, @RequestParam String peliculaId) {
        Optional<Favorito> favorito = favoritoService.findByUsuarioAndPelicula(usuarioId, peliculaId);
        if (favorito.isPresent()) {
            return ResponseEntity.ok(favorito.get());
        } else {
            return ResponseEntity.ok()
                    .body(Map.of("msg", "Favorito no encontrado"));//para poder devolver un mensaje en el front
        }
    }


    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody FavoritoDTO favoritoDTO ) {
        try{
            if (favoritoService.existsByUsuarioAndPelicula(favoritoDTO.getUsuario_id(), favoritoDTO.getPelicula_id())) {
                return ResponseEntity.ok("Ya existe este favorito.");
            }
            Favorito favorito = new Favorito();

            Usuario usuario = new Usuario();
            usuario.setId(favoritoDTO.getUsuario_id());

            Pelicula pelicula = new Pelicula();
            pelicula.setId(favoritoDTO.getPelicula_id());

            favorito.setUsuario(usuario);
            favorito.setPelicula(pelicula);

            favoritoService.save(favorito);

            return ResponseEntity.ok("Favorito insertado correctamente");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al insertar el favorito: " + e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Favorito> favorito= favoritoService.findById(id);
        if(favorito.isPresent()){
            favoritoService.delete(id);
            return ResponseEntity.ok("Favorito eliminado");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Favorito no encontrado");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam Integer usuario_id, @RequestParam String pelicula_id) {
        favoritoService.deleteByUsuarioAndPelicula(usuario_id, pelicula_id);
        return ResponseEntity.ok("Favorito eliminado");
    }

}
