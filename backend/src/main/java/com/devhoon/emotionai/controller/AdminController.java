package com.devhoon.emotionai.controller;

import com.devhoon.emotionai.dto.UserDTO;
import com.devhoon.emotionai.service.AdminService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

  private final AdminService adminService;

  @GetMapping("/users")
  public ResponseEntity<List<UserDTO>> getAllUsers(@RequestHeader("Authorization") String authHeader) {
    // 이 메서드 자체는 JWT 인증 필터를 통해 보호되어 있다고 가정
    return ResponseEntity.ok(adminService.getAllUsers());
  }

  // @GetMapping("/stats")
  // public ResponseEntity<Map<String, Object>> getAdminStats() {
  // // 관리자를 제외한 통계 데이터 가져오기
  // return ResponseEntity.ok(adminService.getAdminStats());
  // }

  // @GetMapping("/logs")
  // public ResponseEntity<Page<FoodAnalysisResultDTO>> getLogsPaged(
  // @RequestParam(name = "page", defaultValue = "1") int page,
  // @RequestParam(name = "size", defaultValue = "10") int size) {
  // Page<FoodAnalysisResultDTO> logs =
  // foodAnalysisResultService.getLogsPaged(page - 1, size);
  // return ResponseEntity.ok(logs);
  // }
}
