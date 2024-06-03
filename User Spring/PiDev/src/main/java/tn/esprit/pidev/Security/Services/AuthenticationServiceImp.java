package tn.esprit.pidev.Security.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import net.sf.jsqlparser.expression.StringValue;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.DTO.AuthenticationRequest;
import tn.esprit.pidev.DTO.AuthenticationResponse;
import tn.esprit.pidev.DTO.RegisterRequest;
import tn.esprit.pidev.Security.Jwt.JwtService;
import tn.esprit.pidev.entities.Enumeration.TokenType;
import tn.esprit.pidev.entities.Token;
import tn.esprit.pidev.repository.TokenRepository;
import tn.esprit.pidev.repository.UserRepository;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.services.EmailService;
import tn.esprit.pidev.tfa.TwoFactorAuthenticationService;
import tn.esprit.pidev.tfa.VerificationRequest;

import java.io.IOException;

@Service
@AllArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TwoFactorAuthenticationService  tfaService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .mdp(passwordEncoder.encode(request.getMdp()))
                .role(request.getRole())
                .cin(request.getCin())
                .dateNaissance(request.getDateNaissance())
                .numtel(request.getNumtel())
                .adresse(request.getAdresse())
                .mfEnabled(request.isMfEnabled())
                .banni(false)
                .build();

       //if MFA is enabled --> generate secret
        if(request.isMfEnabled())
        {

            user.setSecret(tfaService.generateNewSecret());
        }
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        var refreshToken =jwtService.generateRefreshToken(user) ;

        return AuthenticationResponse.builder()
                .secretImageUri(tfaService.generatrQrCodeImageUri(user.getSecret()))
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .mfEnabled(user.isMfEnabled())
                .build();

    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getMdp())
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        if(user.isMfEnabled()) {
            return AuthenticationResponse.builder()
                    .accessToken("")
                    .refreshToken("")
                    .mfEnabled(true)
                    .build();

        }


        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user,jwtToken);
        var refreshToken =jwtService.generateRefreshToken(user) ;
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .mfEnabled(false)
                .build();
    }
    private void revokeAllUserTokens(User user){
        var validUserTokens = tokenRepository.findAllValidTokenByUser((int) user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .userToken(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .role(user.getRole())
                .build();
        tokenRepository.save(token);
    }



    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        final String authHeader= request.getHeader("Authorization");
        final String refreshToken;
        final String userEmail;
        if(authHeader== null ||!authHeader.startsWith("Bearer ")) {

            return;
        }
        refreshToken=authHeader.substring(7);
        userEmail= jwtService.extractUsername(refreshToken);
        if(userEmail != null){
            var  userDetails = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken,userDetails)){
                var accessToken = jwtService.generateToken(userDetails);
                revokeAllUserTokens(userDetails);
                saveUserToken(userDetails,accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }

    }

    @Override
    public String forgetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("User not found with this email: " ));
        try {
            emailService.sendSetPasswordEmail(email);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send password email");
        }

        return "Please check your email to set new password ";
    }

    public String setPassword (String email,String newPassword) {
    User user = userRepository.findByEmail(email).orElseThrow(
            () -> new RuntimeException("User not found with this email: " ));

        user.setMdp(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return  "New Password is set ";
    }

    public AuthenticationResponse verifyCode(
            VerificationRequest verificationRequest
    ) {
        User user = userRepository
                .findByEmail(verificationRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("No user found with %S", verificationRequest.getEmail()))
                );
        System.out.println("verif code teb3ath");
        if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {

            throw new BadCredentialsException("Code is not correct");
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .mfEnabled(user.isMfEnabled())
                .build();
    }

}