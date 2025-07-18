package com.devhoon.emotionai.dto;

import lombok.Data;

@Data
public class EmotionDTO {
  private String emotion;
  private Double confidence;
}