package programar.app.entities;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DOCENTES", schema = "PROGRAMAR")
public class Docente  implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String especialidad;

    @OneToMany(mappedBy = "docente")

    private List<Cursada> cursadas;

    @ManyToMany(mappedBy = "docentesSuplentes")
    private List<Cursada> cursadasComoSuplente;
    // Getters and setters
}
