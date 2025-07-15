package com.devhoon.emotionai.dto;

import com.devhoon.emotionai.entity.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

  private Long id;
  private String email;
  private String name;
  private String role;
  private boolean isDeleted;

  // User 엔티티 기반 생성자
  public UserResponseDTO(User user) {
    this.id = user.getId();
    this.email = user.getEmail();
    this.name = user.getName();
    this.role = user.getRole().name();
    this.isDeleted = user.isDeleted();
  }
}
