package vn.edu.hcmuaf.nvtt.backend.services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Slf4j
@Service
public class JwtServiceImpl implements JwtService {

    @Value("${app.jwt.secretKey}")
    private String SECRET_KEY; //mã hóa
    @Value("${app.jwt.expiration-time-ms}") //tgian hết hạn
    private int EXPIRATION;

    @Override
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty");
        } catch (SignatureException e) {
            log.error("there is an error with the signature of you token ");
        }
        return false;
    }

    @Override
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    @Override
    public String generateToken(Map<String, Object> extractClaims,
                                UserDetails userDetails) {
        System.err.println(EXPIRATION);
        return Jwts.builder()
                .claims(extractClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .issuer(new Date().toString())
                .expiration(calculateExpirationDate())
                .signWith(getSecretKey())
                .compact();
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    private Date calculateExpirationDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, EXPIRATION);
        return calendar.getTime();
    }

    // TODO get All properties Claims
    @Override
    public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }


    private Claims extractAllClaims(String token) {
        System.err.println(token);
        return Jwts.parser()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
}