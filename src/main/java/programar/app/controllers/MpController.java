package programar.app.controllers;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import programar.app.entities.UserBuyer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
public class MpController {

    @Value("${codigo.mercadoLibre}")
    private String mercadolibreToken;

    @RequestMapping(value="create_preference", method = RequestMethod.POST)
    public String getList(@RequestBody UserBuyer userBuyer){
        log.info(userBuyer);

        if(userBuyer == null){
            return "error json:/";
        }

        log.info(userBuyer);
        String title = userBuyer.getTitle();
        Integer quaintity = userBuyer.getQuantity();
        Integer price = userBuyer.getUnit_price();

        try {
            MercadoPagoConfig.setAccessToken(mercadolibreToken);
            //-------------------------------------------------------------------Creacion de preferencias

            // 1 - preferencias de venta
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(title)
                    .quantity(quaintity)
                    .unitPrice(new BigDecimal(price))
                    .currencyId("ARS")
                    .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            //2 - Preferencia de control de sucesos
            PreferenceBackUrlsRequest backUrls= PreferenceBackUrlsRequest
                    .builder().success("https://localhost:8080/inicio")
                    .pending("https://youtube.com")
                    .failure("https://localhost:8080/error_403")
                    .build();

            //-----------------------------------------------------------------------


            //----------------------------------------------------------------------- ENSAMBLE DE PREFERENCIAS

            //Creo una preferencia que contenga todas las preferencias que haya creado
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .build();

            //Creo un objeto tipo cliente para comunicarce con MP
            PreferenceClient client = new PreferenceClient();
            //Creo una nueva preferencia que sera igual a la respuesta que nuestro cliente nos crearar a partir de la informacion quye le enviamos
            Preference preference = client.create(preferenceRequest);

            //----------------------------------------------------------------------- retornamos preferencia
            //retornamos esa prefrencia al frontend
            return preference.getId();
        } catch (MPException | MPApiException e){
            return e.toString();
        }

    }

}
