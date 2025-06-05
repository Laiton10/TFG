package org.example.tfgbackend.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.checkerframework.common.aliasing.qual.Unique;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Size(max = 100)
    @NotBlank(message = "El campo nombre es obligatorio")
    @Pattern(regexp = "^[a-zA-Záéíóúñ ]*$", message = "El nombre solo puede contener caracteres alfabéticos")
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Size(max = 50)
    @NotBlank(message = "El nickname es obligatorio")
    @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "El nickname solo puede contener caracteres alfanuméricos")
    @Unique()
    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Size(max = 150)
    @NotBlank(message = "El email es obligatorio")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "El formato email es incorrecto")
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Size(max = 255)
    @NotBlank(message = "La password es obligatoria")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$", message = "La password debe contener al menos una min, una mayus y un num, además de 8 caractéres")
    @Column(name = "password", nullable = false)
    private String password;

    @Size(max = 255)
    @Column(name = "imagen_perfil")
    private String imagenPerfil;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImagenPerfil() {
        return imagenPerfil;
    }

    public void setImagenPerfil(String imagenPerfil) {
        this.imagenPerfil = imagenPerfil;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

}