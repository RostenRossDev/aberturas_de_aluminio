package programar.app.entities;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CURSADAS", schema = "PROGRAMAR")
public class Cursada  implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "CURSO_ID", nullable = false)
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "DOCENTE_ID", nullable = false)
    private Docente docente;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    @ManyToMany
    @JoinTable(
            name = "CURSADA_DOCENTE_SUPLENTE",
            joinColumns = @JoinColumn(name = "cursada_id"),
            inverseJoinColumns = @JoinColumn(name = "docente_id")
    )
    private List<Docente> docentesSuplentes;

    // Getters and setters
}
