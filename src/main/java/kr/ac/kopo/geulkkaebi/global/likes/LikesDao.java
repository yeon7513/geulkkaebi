package kr.ac.kopo.geulkkaebi.global.likes;

import java.util.Map;

public interface LikesDao {

  void insertPostLikes(Map<String, Object> params);

  void insertCmtLikes(Map<String, Object> params);

  void deletePostLike(Map<String, Object> params);

  void deleteCmtLike(Map<String, Object> params);

  int isPostLiked(Map<String, Object> params);

  int isCmtLiked(Map<String, Object> params);

  int countLikesByCmt(Long cmtNo);

  int countLikesByPost(Long postNo);

}
