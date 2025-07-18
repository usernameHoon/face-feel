package com.devhoon.emotionai.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devhoon.emotionai.dto.EmotionDTO;
import com.devhoon.emotionai.dto.EmotionLogDTO;
import com.devhoon.emotionai.dto.EmotionStatsDTO;
import com.devhoon.emotionai.service.EmotionService;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmotionController {

  private final EmotionService emotionService;

  @PostMapping("/save-emotion")
  public ResponseEntity<String> saveEmotion(@RequestBody EmotionDTO dto, Principal principal) {
    String userEmail = principal.getName(); // 현재 로그인한 사용자 이메일
    emotionService.saveEmotion(userEmail, dto);
    return ResponseEntity.ok("감정 저장 완료");
  }

  @GetMapping("/emotion-log")
  public ResponseEntity<List<EmotionLogDTO>> getRecentEmotionLogs(@RequestParam("userId") Long userId) {
    return ResponseEntity.ok(emotionService.getRecentEmotionLogs(userId));
  }

  @GetMapping("/emotion-stats")
  public ResponseEntity<EmotionStatsDTO> getEmotionStats(@RequestParam("userId") Long userId) {
    return ResponseEntity.ok(emotionService.getEmotionStats(userId));
  }

  @GetMapping("/emotion-feedback")
  public ResponseEntity<String> getFeedback(@RequestParam("userId") Long userId) {
    return ResponseEntity.ok(emotionService.getFeedbackMessage(userId));
  }
}