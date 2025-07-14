package com.example.backend.board.repository;

import com.example.backend.board.dto.BoardListDto;
import com.example.backend.board.dto.BoardListInfo;
import com.example.backend.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    List<BoardListInfo> findAllByOrderByIdDesc();

    @Query(value = """
            SELECT b.id id,
                   b.title title,
                   b.inserted_at inserted_at,
                   m.nick_name nick_name
            FROM board b JOIN member m
                        ON b.author = m.email
            ORDER BY b.id DESC
            """, nativeQuery = true)
    List<BoardListDto> findAllBy();
}