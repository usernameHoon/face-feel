package com.devhoon.emotionai.dto;

import com.devhoon.emotionai.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

  private Long id;
  private String name;
  private String email;
  private String role;
  private String joinDate;

  @Builder.Default
  private boolean isDeleted = false;

  public UserDTO(User user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.role = user.getRole().name(); // enum to string
    this.joinDate = user.getJoinDate().toLocalDate().toString();
    this.isDeleted = user.isDeleted(); // 빠짐!
  }
}
