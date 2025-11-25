package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;

public interface PostService {

  List<Posts> selectList(Long postNo, String boardType, String writer, boolean isReport);

  void increaseHitcount(Long postNo);

  void addLikeToPost(Long postNo, String userId);

  List<Posts> selectPopularPosts();

  int insert(Posts posts);


}
