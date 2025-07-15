package com.devhoon.emotionai.repository;

import com.devhoon.emotionai.constant.UserRole;
import com.devhoon.emotionai.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByEmail(String email);

  List<User> findAllByOrderByIdAsc();

  long countByRoleAndIsDeletedFalse(UserRole role); // "ADMIN" 제외한 사용자 수 카운트

  Optional<User> findByIdAndIsDeletedFalse(Long id);

  Optional<User> findByEmailAndIsDeletedFalse(String email);

}
