package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;

public interface PostDao {

  List<Posts> selectNormalList(Map<String, Object> params);

  List<Posts> selectNoticeList(String boardType);

  void increaseHitcount(Long postNo);

  List<Posts> selectPopularPosts();

  int insert(Posts posts);

  int countNormalPosts(String boardType);

  Posts selectPostDetail(Long postNo);

  Posts selectPrevPost(Map<String, Object> params);

  Posts selectNextPost(Map<String, Object> params);

  int deletePost(Long postNo);

  int updatePost(Posts posts);


}
