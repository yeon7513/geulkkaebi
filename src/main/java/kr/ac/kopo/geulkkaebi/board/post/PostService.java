package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;

public interface PostService {

  Map<String, Object> selectList(String boardType, int page, int size);

  void increaseHitcount(Long postNo);

  List<Posts> selectPopularPosts();

  int insert(Posts posts);

  Map<String, Object> getPostDetail(String userId, Long postNo, String boardType);

}
