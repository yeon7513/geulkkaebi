package kr.ac.kopo.geulkkaebi.auth;

import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

  private final static String SECRET_KEY = "mySecretKeyMySecretKeyMySecretKey123"; // 256-bit 이상

  private final static long EXPIRATION = 1000 * 60 * 60; // 1시간

  private static Key getSigningKey() {
    return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
  }

  public static String generateToken(String username, String role) {
    return Jwts.builder().setSubject(username).claim("role", role).setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
  }

  public Claims parseToken(String token) {
    return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
        .getBody();
  }

}
