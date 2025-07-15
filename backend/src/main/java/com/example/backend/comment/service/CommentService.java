package com.example.backend.comment.service;

import com.example.backend.board.entity.Board;
import com.example.backend.board.repository.BoardRepository;
import com.example.backend.comment.dto.CommentForm;
import com.example.backend.comment.dto.CommentListDto;
import com.example.backend.comment.entity.Comment;
import com.example.backend.comment.repository.CommentRepository;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    public void add(CommentForm comment, Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("권한이 없습니다.");
        }
        if (comment.getComment().trim().isBlank()) {
            throw new RuntimeException("내용이 없는 댓글을 작성할 수 없습니다.");
        }

        Board board = boardRepository.findById(comment.getBoardId()).get();
        Member member = memberRepository.findById(authentication.getName()).get();

        Comment db = new Comment();
        db.setBoard(board);
        db.setComment(comment.getComment());
        db.setAuthor(member);

        commentRepository.save(db);
    }

    public List<CommentListDto> listByBoardId(Integer boardId) {
        return commentRepository.listByBoardId(boardId);
    }
}
