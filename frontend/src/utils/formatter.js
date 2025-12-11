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

// 생년월일 포맷
export const formatBirth = (date) => {
  if (!date) return '';

  // "1996-07-05 00:00:00" → "1996-07-05"
  const onlyDate = date.slice(0, 10);
  const [year, month, day] = onlyDate.split('-');

  return `${year}년 ${month}월 ${day}일`;
};

// 날짜 & 시간 포맷
export const formatDateTimeKorean = (dateTimeString) => {
  if (!dateTimeString) return '';

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, '0');
  const ampm = hour < 12 ? '오전' : '오후';

  // 24시간 → 12시간
  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hour}시 ${minute}분`;
};

// 회원 등급 포맷 (숫자 -> 아이콘)
export const formatGrade = (grade) => {
  if (grade <= 3) return <FaSeedling color="#b2cf5d" />;
  if (grade <= 6) return <FaLeaf color="#8fb02f" />;
  if (grade <= 9) return <FaTree color="#6f8924" />;
  return <FaTools color="#666" />;
};

// 회원 등급 (숫자 -> 문자열)
export const formatGradeBylabel = (grade) => {
  if (grade <= 3) return '🌱 글새싹 - 이제 막 피어나는 단계';
  if (grade <= 6) return '🍃 글잎새 - 실력이 쑥쑥 자라는 중';
  if (grade <= 9) return '🌳 글나무 - 모두가 인정하는 실력자';
  return '🦉 글지기 - 지식의 숲을 지키는 관리자';
};

// 점수 포맷
export const formatScoreByLabel = (score) => {
  if (score <= 500) return '🌱 시작의 씨앗 - 이제 막 퀴즈를 시작했어요.';
  if (score <= 1000) return '🍃 자라는 새싹 - 꾸준히 성장 중이에요.';
  if (score <= 1500) return '🌿 무성한 잎 - 실력이 눈에 띄게 좋아지고 있어요.';
  if (score <= 2500) return '🌳 단단한 나무 - 누구에게도 뒤지지 않는 실력자!';
  if (score <= 4000)
    return '🌲 지혜의 숲 - 퀴즈 세계를 깊이 이해한 상위 플레이어';
  if (score <= 5000) return '🏆 글깨비 마스터 - 랭킹 상위권의 퀴즈 고수';
  return '🐉 글깨비 현자 - 글의 세계를 완전히 깨우친 지혜로운 존재';
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
