package com.practice.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "updateDate")
    private Date updateDate;

    @Column(name = "publishDate")
    private Date publishDate;

    @Column(name = "parentCommentId")
    private Long parentCommentId;

}
