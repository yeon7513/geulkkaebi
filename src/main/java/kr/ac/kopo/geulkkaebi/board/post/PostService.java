package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;

public interface PostService {

  Map<String, Object> selectList(Long postNo, String boardType, String writer, boolean isReport,
      int page, int size);

  void increaseHitcount(Long postNo);

  void addLikeToPost(Long postNo, String userId);

  List<Posts> selectPopularPosts();

  int insert(Posts posts);


}
