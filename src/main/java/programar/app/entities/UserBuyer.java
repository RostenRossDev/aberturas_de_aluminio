package programar.app.entities;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserBuyer {
    private String title;
    private Integer quantity;
    private Integer unit_price;
}
