package programar.app.dtos;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    private String name;
    private String id;
    private double price;
    private double discount;
    private int quantity;
}
