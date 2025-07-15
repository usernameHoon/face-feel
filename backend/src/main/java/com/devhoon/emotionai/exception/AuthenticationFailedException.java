package com.devhoon.emotionai.exception;

public class AuthenticationFailedException extends RuntimeException {
  public AuthenticationFailedException(String message) {
    super(message);
  }
}
