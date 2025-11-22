package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;

public interface PostDao {

  List<Posts> selectList(Map<String, Object> params);

  void increaseHitcount(Long postNo);

  void addLikeToPost(Map<String, Object> params);

  List<Posts> selectPopularPosts();

}
