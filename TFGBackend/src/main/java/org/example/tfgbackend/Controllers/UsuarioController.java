package org.example.tfgbackend.Controllers;

import jakarta.servlet.ServletRequest;
import jakarta.validation.Valid;
import org.example.tfgbackend.DTO.NicknameUpdate;
import org.example.tfgbackend.Model.Usuario;
import org.example.tfgbackend.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.tfgbackend.DTO.LoginRequest;
import org.example.tfgbackend.JWT.JwtUtil;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CacheConfig(cacheNames = {"usuarios"})
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    @Cacheable
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try{
            Thread.sleep(3000);
            Optional<Usuario> usuario= usuarioService.findById(id);
            if(usuario.isPresent()){
                return ResponseEntity.ok(usuario);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        }catch (InterruptedException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/buscarUsuario")
    public ResponseEntity<List<Usuario>> buscarUsuarios(@RequestParam String nickname) {
        List<Usuario> resultados = usuarioService.findUser(nickname);
        return ResponseEntity.ok(resultados);
    }


    @PostMapping("/register")
    public ResponseEntity<Usuario> save(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.save(usuario));
    }

    @PutMapping
    public ResponseEntity<String> update(@Valid @RequestBody Usuario usuario, ServletRequest servletRequest) {
        Optional<Usuario> usuarioOptional= usuarioService.findById(usuario.getId());
        if(usuarioOptional.isPresent()){
            usuarioService.update(usuario);
            return ResponseEntity.ok("Usuario actualizado");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    @PutMapping("/nickname")
    public ResponseEntity<String> updateNickname(@RequestBody NicknameUpdate user) {
        Optional<Usuario> usuarioOptional = usuarioService.findById(user.getId());
        if (usuarioOptional.isPresent()) {
            usuarioService.updateNickname(user.getId(), user.getNickname());
            String newToken= JwtUtil.generateToken((user.getNickname()));
            return ResponseEntity.ok(newToken);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        Optional<Usuario> usuario= usuarioService.findById(id);
        if(usuario.isPresent()){
            usuarioService.delete(id);
            return ResponseEntity.ok("Usuario eliminado");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }




    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuario = usuarioService.login(request.getNickname(), request.getPassword());
        if (usuario.isPresent()) {
            String token = JwtUtil.generateToken(usuario.get().getNickname());
            return ResponseEntity.ok().body(Map.of("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }
    //Cuando haces una petición HTTP con un token de autenticación, se lo mandas al servidor en la cabecera
    //Authorization: Es la cabecera estándar para enviar credenciales.
    //Bearer: Tipo de autenticación Bearer Token, que significa "portador". Es decir, quien posee ese token está autenticado.
    @GetMapping("/auth/perfil")
    public ResponseEntity<?> getPerfil(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no proporcionado");
        }

        String token = authHeader.replace("Bearer ", "");
        String nickname = JwtUtil.validateToken(token);

        if (nickname == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }

        Optional<Usuario> usuario = usuarioService.findByNickname(nickname);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }






}
