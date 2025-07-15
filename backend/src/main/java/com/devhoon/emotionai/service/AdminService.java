package com.devhoon.emotionai.service;

import com.devhoon.emotionai.dto.UserDTO;
import com.devhoon.emotionai.repository.UserRepository;
import com.devhoon.emotionai.constant.UserRole;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

  private final UserRepository userRepository;

  // public Map<String, Object> getAdminStats() {
  // Map<String, Object> stats = new HashMap<>();

  // 관리자를 제외한 사용자 수 카운트
  // long userCount = userRepository.countByRoleAndIsDeletedFalse(UserRole.USER);

  // 분석 요청 수 카운트
  // long analysisCount = foodAnalysisResultRepository.count();

  // 금일 분석 요청 수 카운트
  // long todayAnalysisCount =
  // foodAnalysisResultRepository.countByAnalyzedAtBetween(
  // LocalDate.now().atStartOfDay(), LocalDate.now().plusDays(1).atStartOfDay());

  // 결과를 맵에 추가
  // stats.put("userCount", userCount);
  // stats.put("analysisCount", analysisCount);
  // stats.put("todayAnalysisCount", todayAnalysisCount);

  // return stats;
  // }

  public List<UserDTO> getAllUsers() {
    return userRepository.findAllByOrderByIdAsc()
        .stream()
        .filter(user -> user.getRole() == UserRole.USER)
        .map(UserDTO::new)
        .collect(Collectors.toList());
  }
}
