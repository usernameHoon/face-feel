package com.devhoon.emotionai.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.devhoon.emotionai.dto.EmotionDTO;
import com.devhoon.emotionai.dto.EmotionLogDTO;
import com.devhoon.emotionai.dto.EmotionStatsDTO;
import com.devhoon.emotionai.entity.EmotionLog;
import com.devhoon.emotionai.entity.User;
import com.devhoon.emotionai.repository.EmotionLogRepository;
import com.devhoon.emotionai.repository.UserRepository;
import com.devhoon.util.EmotionFeedbackUtil;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmotionService {

  private final EmotionLogRepository emotionLogRepository;
  private final UserRepository userRepository;

  public void saveEmotion(String email, EmotionDTO dto) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

    EmotionLog log = EmotionLog.builder()
        .user(user)
        .timestamp(LocalDateTime.now())
        .emotion(dto.getEmotion())
        .confidence(dto.getConfidence())
        .build();

    emotionLogRepository.save(log);
  }

  public List<EmotionLogDTO> getRecentEmotionLogs(Long userId) {
    return emotionLogRepository.findTop5ByUserIdOrderByTimestampDesc(userId)
        .stream()
        .map(EmotionLogDTO::from)
        .toList();
  }

  public EmotionStatsDTO getEmotionStats(Long userId) {
    List<EmotionLog> logs = emotionLogRepository.findByUserId(userId);
    return EmotionStatsDTO.from(logs);
  }

  public String getFeedbackMessage(Long userId) {
    List<EmotionLog> recentLogs = emotionLogRepository.findTop5ByUserIdOrderByTimestampDesc(userId);
    return EmotionFeedbackUtil.generateFeedback(recentLogs);
  }
}