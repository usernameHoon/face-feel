package com.devhoon.emotionai.dto;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.devhoon.emotionai.entity.EmotionLog;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmotionStatsDTO {
  private Map<String, Long> emotionCounts;
  private Map<String, Double> averageConfidence;

  public static EmotionStatsDTO from(List<EmotionLog> logs) {
    Map<String, List<EmotionLog>> grouped = logs.stream()
        .collect(Collectors.groupingBy(EmotionLog::getEmotion));

    Map<String, Long> counts = grouped.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey, e -> (long) e.getValue().size()));

    Map<String, Double> avgConfidence = grouped.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey,
            e -> e.getValue().stream().mapToDouble(EmotionLog::getConfidence).average().orElse(0)));

    EmotionStatsDTO dto = new EmotionStatsDTO();
    dto.setEmotionCounts(counts);
    dto.setAverageConfidence(avgConfidence);
    return dto;
  }
}