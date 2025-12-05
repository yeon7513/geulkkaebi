import React from 'react';
import { FaLeaf, FaSeedling, FaTools, FaTree } from 'react-icons/fa';

// 날짜 포맷
export const formatCreatedAt = (createdAt) => {
  const createdDate = new Date(createdAt); // DB에서 받은 문자열을 Date 객체로
  const now = new Date();

  // 오늘인지 여부 확인
  const isToday =
    createdDate.getFullYear() === now.getFullYear() &&
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getDate() === now.getDate();

  if (isToday) {
    const diffMs = now - createdDate; // 밀리초
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}시간 전`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}분 전`;
    } else {
      return '방금 전';
    }
  } else {
    // 오늘이 아니면 "YYYY-MM-DD" 형식으로
    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, '0');
    const day = String(createdDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};

export const formatDate = (date) => {
  const str = String(date);

  const year = parseInt(str.slice(0, 4), 10);
  const month = parseInt(str.slice(4, 6), 10) - 1; // 0~11
  const day = parseInt(str.slice(6, 8), 10);

  return `${year}년 ${String(month + 1).padStart(2, '0')}월 ${String(
    day
  ).padStart(2, '0')}일`;
};

// 회원 등급 포맷 (숫자 -> 아이콘)
export const formatGrade = (grade) => {
  if (grade <= 3) return <FaSeedling color="#b2cf5d" />;
  if (grade <= 6) return <FaLeaf color="#8fb02f" />;
  if (grade <= 9) return <FaTree color="#6f8924" />;
  return <FaTools color="#666" />;
};

// 문자열 줄바꿈 변환
export const formatLineBreaks = (text) => {
  if (!text) {
    return null;
  }

  const temp = text.trim();

  const normalizedText = temp
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\\n/g, '\n');

  // 현재 문제 발생.
  // DB에 직접적으로 insert한 것이
  // 문제가 생김. -> 불필요한 공백과 빈 문자열이 포함됨.

  return normalizedText
    .split('\n')
    .map((line) => line.trim()) // 공백 제거
    .filter((line) => line !== '') // 빈 문자열 요소 삭제
    .map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ));
};
