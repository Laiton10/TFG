package org.example.tfgbackend.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Table(name = "seguimientos")
public class Seguimiento {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "seguidor_id", nullable = false)
    private Usuario seguidor;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "seguido_id", nullable = false)
    private Usuario seguido;

    @ColumnDefault("curdate()")
    @Column(name = "fecha_seguimiento")
    private LocalDate fechaSeguimiento;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Usuario getSeguidor() {
        return seguidor;
    }

    public void setSeguidor(Usuario seguidor) {
        this.seguidor = seguidor;
    }

    public Usuario getSeguido() {
        return seguido;
    }

    public void setSeguido(Usuario seguido) {
        this.seguido = seguido;
    }

    public LocalDate getFechaSeguimiento() {
        return fechaSeguimiento;
    }

    public void setFechaSeguimiento(LocalDate fechaSeguimiento) {
        this.fechaSeguimiento = fechaSeguimiento;
    }

}