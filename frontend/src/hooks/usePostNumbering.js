import { useMemo } from 'react';

export const usePostNumbering = (posts) => {
  return useMemo(() => {
    // 공지글을 제외한 일반 글 수만 번호 붙이기
    const normalPostsCount = posts.filter((p) => p.noticeYn === 0).length;
    let counter = normalPostsCount;

    return posts.map((item) => {
      if (item.noticeYn > 0) {
        return { ...item, displayNumber: 0 };
      } else {
        const numberedItem = { ...item, displayNumber: counter };
        counter--;
        return numberedItem;
      }
    });
  }, [posts]);
};
