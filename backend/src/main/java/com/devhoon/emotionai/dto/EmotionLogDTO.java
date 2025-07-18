package com.devhoon.emotionai.dto;

import java.time.LocalDateTime;

import com.devhoon.emotionai.entity.EmotionLog;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmotionLogDTO {
  private String emotion;
  private double confidence;
  private LocalDateTime timestamp;

  public static EmotionLogDTO from(EmotionLog log) {
    return new EmotionLogDTO(log.getEmotion(), log.getConfidence(), log.getTimestamp());
  }
}