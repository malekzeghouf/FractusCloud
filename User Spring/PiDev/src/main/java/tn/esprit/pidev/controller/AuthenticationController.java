package tn.esprit.pidev.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pidev.DTO.AuthenticationRequest;
import tn.esprit.pidev.DTO.AuthenticationResponse;
import tn.esprit.pidev.DTO.RegisterRequest;
import tn.esprit.pidev.Security.Services.AuthenticationService;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.services.UserService;
import tn.esprit.pidev.tfa.VerificationRequest;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request){
        var response = authenticationService.register(request);
        if(request.isMfEnabled()) {
        return  ResponseEntity.ok(response);
        }        return ResponseEntity.accepted().build();

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));

    }
    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request,response);
    }


    @PutMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@RequestParam String email)
    {
        return new ResponseEntity<>(authenticationService.forgetPassword(email), HttpStatus.OK);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(
            @RequestBody VerificationRequest verificationRequest
    ) {
        return ResponseEntity.ok(authenticationService.verifyCode(verificationRequest));
    }

    @PutMapping("/set-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestHeader String newPassword )
    {
        System.out.println("el mdp el jdid "+ newPassword);
        System.out.println("el email  "+ email);
        authenticationService.setPassword(email, newPassword);
        return ResponseEntity.ok().body("success");

    }

    @GetMapping("/afficher_user")
    public Optional<User> getUser(@RequestParam String email)
    {
        return userService.getUser(email);
    }



    @GetMapping("/exist_user")
    public ResponseEntity<String> checkUser(@RequestParam String email)
    {
        boolean userEx =userService.userExist(email);
        if(userEx){
            return ResponseEntity.status(201).body("Ce compte existe");
        }
        return ResponseEntity.status(200).body("Email accepté ");
    }

    }


