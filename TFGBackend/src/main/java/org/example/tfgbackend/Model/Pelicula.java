    package org.example.tfgbackend.Model;

    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.Id;
    import jakarta.persistence.Table;

    @Entity
    @Table(name = "peliculas")
    public class Pelicula {
        @Id
        @Column(name = "id", nullable = false)
        private String id;

        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }

    }