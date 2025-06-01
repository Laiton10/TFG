package org.example.tfgbackend.DTO;

import java.math.BigDecimal;

public class CriticaDTO {
    public String pelicula_id;
    public Integer usuario_id;
    public String comentario;
    public Integer puntuacion;

    public String getPelicula_id() {
        return pelicula_id;
    }

    public void setPelicula_id(String pelicula_id) {
        this.pelicula_id = pelicula_id;
    }

    public Integer getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Integer usuario_id) {
        this.usuario_id = usuario_id;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }
    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }
}
