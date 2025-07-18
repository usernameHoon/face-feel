package com.devhoon.emotionai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devhoon.emotionai.entity.EmotionLog;
import com.devhoon.emotionai.entity.User;

import java.util.List;

public interface EmotionLogRepository extends JpaRepository<EmotionLog, Long> {

  List<EmotionLog> findByUser(User user);

  List<EmotionLog> findTop5ByUserIdOrderByTimestampDesc(Long userId);

  List<EmotionLog> findByUserId(Long userId);
}