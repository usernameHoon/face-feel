package com.devhoon.emotionai.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SigninResponseDTO {

  private String token;
  private UserResponseDTO user;

}
