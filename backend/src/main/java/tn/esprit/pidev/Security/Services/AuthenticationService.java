package tn.esprit.pidev.Security.Services;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import tn.esprit.pidev.DTO.AuthenticationRequest;
import tn.esprit.pidev.DTO.AuthenticationResponse;
import tn.esprit.pidev.DTO.RegisterRequest;
import tn.esprit.pidev.tfa.VerificationRequest;

import java.io.IOException;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request) ;
    AuthenticationResponse authenticate(AuthenticationRequest request) ;
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    String forgetPassword(String email);

    Object verifyCode(VerificationRequest verificationRequest);

    String setPassword(String email, String newPassword);
}