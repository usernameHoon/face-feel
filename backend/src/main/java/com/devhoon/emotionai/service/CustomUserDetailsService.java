package com.devhoon.emotionai.service;

import com.devhoon.emotionai.entity.User;
import com.devhoon.emotionai.repository.UserRepository;
import com.devhoon.emotionai.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

    User user = userRepository.findByEmailAndIsDeletedFalse(email)
        .orElseThrow(() -> new UsernameNotFoundException("탈퇴했거나 존재하지 않는 사용자입니다: " + email));

    return new CustomUserDetails(user); // ✅ 커스텀 UserDetails 반환
  }
}
