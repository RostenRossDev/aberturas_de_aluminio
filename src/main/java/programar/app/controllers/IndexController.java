package programar.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @GetMapping("/inicio")
    public String index(Model model){

        return "index";
    }

    @GetMapping("/pay")
    public String pay(Model model){
        return "pay";
    }



    @GetMapping({"/", ""})
    public String goHome(){
        return "redirect:/inicio";
    }

    @PostMapping({"/", ""})
    public String redirectHome(){
        return "redirect:/inicio";
    }
}
