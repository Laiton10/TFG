package org.example.tfgbackend.Services;

import org.example.tfgbackend.Model.Usuario;
import org.example.tfgbackend.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
    
    public Usuario save(Usuario usuario) {
        String hashedPassword = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(hashedPassword);
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


}
