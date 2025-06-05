package org.example.tfgbackend.Services;

import org.example.tfgbackend.Config.CustomValidationException;
import org.example.tfgbackend.DTO.NicknameUpdate;
import org.example.tfgbackend.Model.Usuario;
import org.example.tfgbackend.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public List<Usuario> findAll(){
        return usuarioRepository.findAll();
    }
    public Optional<Usuario> findById(Integer id){
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
    public Optional<Usuario> findByNickname(String nickname) {
        return usuarioRepository.findByNickname(nickname);
    }

    public List<Usuario> findUser(String nickname) {
        return usuarioRepository.findUser(nickname);
    }

    public Optional<Usuario> findUserByNickname(String nickname) {
        return usuarioRepository.findByNickname(nickname);
    }

    public Usuario save(Usuario usuario) {
        usuario.setNickname(usuario.getNickname().toLowerCase());
        usuario.setEmail(usuario.getEmail().toLowerCase());
        String hashedPassword = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(hashedPassword);
        if (usuarioRepository.existsByNickname(usuario.getNickname())) {
            throw new CustomValidationException("nickname", "Ese nickname ya está en uso");
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new CustomValidationException("email", "Ese email ya está en uso");
        }
        usuario.setFechaRegistro(LocalDate.now());
        return usuarioRepository.save(usuario);
    }

    public boolean update(Usuario usuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuario.getId());
        if (usuarioOptional.isPresent()) {
            String hashedPassword = passwordEncoder.encode(usuario.getPassword());
            usuario.setPassword(hashedPassword);
            usuarioRepository.save(usuario);
            return true;
        } else {
            return false;
        }
    }

    public boolean updateNickname(Integer id, String nickname) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
        if(usuarioOptional.isPresent()) {
            Usuario userActualizado= usuarioOptional.get();
            userActualizado.setNickname(nickname);
            usuarioRepository.save(userActualizado);
            return true;
        }
        return false;
    }

    public boolean delete(Integer idUsuario){
        Optional<Usuario> usuario= usuarioRepository.findById(idUsuario);
        if (usuario.isPresent()){
            usuarioRepository.deleteById(idUsuario);
            return true;
        }else{
            return false;
        }
    }

    public Optional<Usuario> login(String nickname, String password) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByNickname(nickname);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (passwordEncoder.matches(password, usuario.getPassword())) {
                return Optional.of(usuario);
            }
        }
        return Optional.empty();
    }

    public void guardarImagenPerfil(Integer id, MultipartFile imagen) throws IOException {
        String originalExtension = imagen.getOriginalFilename()
                .substring(imagen.getOriginalFilename().lastIndexOf('.'));


        String filename = "perfil_usuario_" + id + "_" + UUID.randomUUID() + originalExtension;
        Path filepath = Paths.get("uploads", filename);
        Files.createDirectories(filepath.getParent());
        Files.write(filepath, imagen.getBytes());

        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();


            String previousImagePath = usuario.getImagenPerfil();
            if (previousImagePath != null && !previousImagePath.equals("uploads/" + filename)) {
                Path previousPath = Paths.get(previousImagePath);
                Files.deleteIfExists(previousPath);
            }

            usuario.setImagenPerfil("uploads/" + filename);
            usuarioRepository.save(usuario);
        } else {
            throw new FileNotFoundException("usuario no encontrado");
        }
    }



}
