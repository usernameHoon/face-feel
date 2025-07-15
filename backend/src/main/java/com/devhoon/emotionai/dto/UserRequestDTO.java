package com.devhoon.emotionai.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRequestDTO {

  @NotBlank
  @Email
  private String email; // 이메일

  @NotBlank
  private String password; // 비밀번호

  @NotBlank
  private String name; // 이름
}
