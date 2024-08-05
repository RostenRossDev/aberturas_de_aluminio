package programar.app.services;

import programar.app.dtos.ProductFilter;
import programar.app.entities.Product;

import java.util.List;

public interface ProductService {
    List<Product> filterProducts(ProductFilter filter);
}
