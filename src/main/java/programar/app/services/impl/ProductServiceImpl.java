package programar.app.services.impl;

import org.springframework.stereotype.Service;
import programar.app.dtos.ProductFilter;
import programar.app.entities.Product;
import programar.app.services.ProductService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public List<Product> filterProducts(ProductFilter filter) {
        return List.of();
    }
}
