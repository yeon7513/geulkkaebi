package kr.ac.kopo.geulkkaebi.global.likes;

import java.util.Map;

public interface LikesService {

  Map<String, Object> addPostLike(Long postNo, String userId);

  Map<String, Object> addCmtLike(Long cmtNo, String userId);

  Map<String, Object> deletePostLike(Long postNo, String userId);

  Map<String, Object> deleteCmtLike(Long cmtNo, String userId);

  int isPostLiked(Long postNo, String userId);

  int isCmtLiked(Long postNo, String userId);
}
