package com.practice.backend.enums;

public enum Category {
    NOTICE("공지사항"),
    ALL_BOARD("전체게시판"),
    FREE_BOARD("자유게시판"),
    QUESTION_BOARD("질문게시판");

    private final String displayCategory;

    Category(String displayCategory) {
        this.displayCategory = displayCategory;
    }

    public String getDisplayCategory() {
        return displayCategory;
    }
}
