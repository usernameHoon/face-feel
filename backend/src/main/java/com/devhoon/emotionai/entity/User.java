package com.devhoon.emotionai.entity;

import java.time.LocalDateTime;

import com.devhoon.emotionai.constant.UserRole;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 회원 ID

  @Column(nullable = false, unique = true)
  private String email; // 회원 이메일

  @Column(nullable = false)
  private String password; // 비밀번호

  @Column(nullable = false)
  private String name; // 회원 이름

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserRole role; // 사용자 역할 (USER / ADMIN)

  @Column(name = "joinDate", nullable = false)
  private LocalDateTime joinDate;

  @Column(nullable = false)
  @Builder.Default
  private boolean isDeleted = false;

  public void withdraw() {
    this.isDeleted = true;
  }
}