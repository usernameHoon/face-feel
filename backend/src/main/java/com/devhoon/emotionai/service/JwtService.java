package com.devhoon.emotionai.service;

import com.devhoon.emotionai.config.JwtConfig;
import com.devhoon.emotionai.entity.User;

import io.jsonwebtoken.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {

  private final JwtConfig jwtConfig;

  private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간

  public String generateToken(User user) {
    return Jwts.builder()
        .setSubject(user.getEmail())
        .claim("userId", user.getId())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(jwtConfig.getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  public String extractEmail(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(jwtConfig.getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(jwtConfig.getSigningKey()).build().parseClaimsJws(token);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }

  public Authentication getAuthentication(String token, UserDetails userDetails) {
    return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
  }
}
