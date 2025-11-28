import { useMemo } from 'react';

export const usePostNumbering = (posts, page, size, totalPosts) => {
  return useMemo(() => {
    if (!posts) {
      return [];
    }

    // 공지글을 제외한 일반 글 수만 번호 붙이기
    const offset = (page - 1) * size;
    let counter = 0;

    return posts.map((item) => {
      if (item.noticeYn > 0) {
        return { ...item, displayNumber: 0 };
      } else {
        const displayNumber = totalPosts - offset - counter;
        const numberedItem = { ...item, displayNumber: displayNumber };
        counter++;
        return numberedItem;
      }
    });
  }, [posts, page, size, totalPosts]);
};
