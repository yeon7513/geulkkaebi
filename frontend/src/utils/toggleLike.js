import axios from 'axios';

export const toggleLike = async (page, targetNo, isLiked) => {
  const url = `/likes/${page}/${targetNo}`;

  const res = isLiked ? await axios.delete(url) : await axios.post(url);
  const data = res.data;

  return { liked: data.liked, countLikes: data.countLikes };
};
