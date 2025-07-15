package com.devhoon.emotionai.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {

  private final JwtConfig jwtConfig;

  private final long TOKEN_EXPIRATION_MS = 1000 * 60 * 60 * 24; // 24시간

  // 이메일을 기반으로 토큰 생성
  public String generateToken(String email) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + TOKEN_EXPIRATION_MS);

    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(now)
        .setExpiration(expiry)
        .signWith(jwtConfig.getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  // 토큰에서 이메일(subject) 추출
  public String extractEmail(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(jwtConfig.getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  // 토큰 유효성 검사
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(jwtConfig.getSigningKey())
          .build()
          .parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
