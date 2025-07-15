package com.devhoon.emotionai.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDTO {

  private String token;
  private UserResponseDTO user;

}
