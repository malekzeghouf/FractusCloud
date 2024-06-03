package tn.esprit.pidev.controller;

import lombok.AllArgsConstructor;
import tn.esprit.pidev.services.IServiceUser;
import tn.esprit.pidev.entities.User;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth/user")
@CrossOrigin("*")

// Controller pour l'admin

public class UserController {

    private IServiceUser serviceUser;



    @PostMapping("/create")
    public User create(@RequestBody User user){
        return serviceUser.creer(user);
    }

    @GetMapping("/all")
    public List<User> read(){return serviceUser.lire();}

    @GetMapping("/{id}")
    public User findUserById (@PathVariable long id){
        return serviceUser.getUserById(id);
    }

    @PutMapping("/update/{id}")
    public User update(@PathVariable long id,@RequestBody User user){
        return serviceUser.modifier(id,user);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
         serviceUser.supprimer(id);
    }

    @PostMapping("/ban/{userId}")
    public void banUser(@PathVariable long userId) {
        serviceUser.banUser(userId);
    }

    @PostMapping("/deban/{userId}")
    public void debanUser(@PathVariable long userId) {
        serviceUser.debanUser(userId);
    }
}
