package tn.esprit.pidev.Security.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tn.esprit.pidev.entities.User;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service

public class JwtServiceImp implements JwtService {
    private static final String SECRET_KEY="N4wVToDYua3CfN9P+riGydGmH06C3vpH86jPePKTcK++bzyWZiyZe4f8Oo7j+0CzCF8KkzwI526eo9rvtUY4/z8EEqTOPk1tFvmtG5DDcyvXRAVGhwG5lFRg2xF0ghdxBNJx1vfl/Gc38tQm3zVsl3RPpJz20KvlIjdqxWxzAOrFEq8kDKODcrF9J+TUVBZss0+kgBQmVlrcPtKNgdUSq61CCEkqt6Yw1zT3IaPtsLAB9kgculbQJA7TY8SbvJBxK+SCVfHNW0cytI9WNUHevxNV/UKX5q5bB1PdmB1/iBD97svqa1zaY/PNqr+p++z0EABWM3gC+bKoY286PydqBORfOyli+ufLkDGCASkNFTw=\n";


    //"uVGfepRnks1GDljuy5IzQR90+YtPwbvuHqotP1ABiXjmOEiMeYBNilWyY00bFv5o7GtTQGK1vhiId8CxaoC+KNrRdS5dMUjeLoQ5P2nUzwsgSsdg1DvTk7yGKi9xsml85oZkZbI0o15Tt+nYySg1fUVkwkIBUhXu9jS3xiXY9+5CWbT9pBi5H5LqyLE+M0Hyst4w8uPfmJ9NHdAT++faP+K6U0136ltuXVWUdalemZgZx5MjeYnLWuvicrnS81SLVTvk25R70eg8BIws6YNfdLYuWZrKo/F0DY6dLNBsVMzMWERVgJPqJEJN+S7ogKb3572GaAqu0BNTa3IKZTDrUpunnrIc+tI8JZzLK/KlbOu5TTKD80ZhDA12yvIlTQZ3N49ZLkjsRQJF6CZx53iXSsGFLrn9pYg4jTXTSMpmlV52RR9CqlQv1dWKgv9WyhUWt5tzTODoEGMqmorVcFQ8ElQ//k/ZnYnlSQTUAVY9fwoKU+0AaDTIVmAiKjgDzsxmvOHnVHIkgUp7NzC9RNQatGZNZgNGq0BS236dqD4H6bDF7yxDiYkCVORbJd+WrmM+TCoojY9THjBG5hnCemWqjUKfBSDfdD3lrRELyuOLpT0Uzu5u/M23OZDk2Z1MV3Pg9z0lkk297kCMw7HJkKxms+5dOAlMbs5TAw9pX4CSg+YIVpcCLTLYwtBzIYP9ISCc\n";
    private static final long jwtExpiration = 86400000; //a day
    private static final long refreshExpiration=604800000; //7 days

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username =extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    @Override
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims ::getSubject);
    }

    @Override
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(),userDetails,refreshExpiration);
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    @Override
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        return buildToken(extraClaims,userDetails,jwtExpiration);

    }
    @Override
    public String buildToken (Map<String, Object> extraClaims, UserDetails userDetails,long expiration){

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .claim("role",((User)userDetails).getRole().toString())
//                .setHeaderParam("role", userDetails.getAuthorities().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInkey(), SignatureAlgorithm.HS256)
                .compact();
    }



    @Override
    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInkey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public Key getSignInkey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
