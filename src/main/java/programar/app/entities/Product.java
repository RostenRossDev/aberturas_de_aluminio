package programar.app.entities;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String img;
    private Integer stock;
    private Double price;
    private Boolean enabled;
    private String tag;
    private String material;
    private Integer sale;
}
