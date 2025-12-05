package kr.ac.kopo.geulkkaebi.global.likes;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikesServiceImpl implements LikesService {

  @Autowired
  LikesDao likesDao;

  // 게시글 좋아요 추가
  @Override
  public Map<String, Object> addPostLike(Long postNo, String userId) {
    Map<String, Object> params = new HashMap<>();

    params.put("postNo", postNo);
    params.put("userId", userId);

    likesDao.insertPostLikes(params);

    int countLikes = likesDao.countLikesByPost(postNo);

    Map<String, Object> result = new HashMap<>();
    result.put("liked", true);
    result.put("countLikes", countLikes);

    return result;
  }

  // 게시글 좋아요 삭제
  @Override
  public Map<String, Object> deletePostLike(Long postNo, String userId) {
    Map<String, Object> params = new HashMap<>();

    params.put("postNo", postNo);
    params.put("userId", userId);

    likesDao.deletePostLike(params);

    int countLikes = likesDao.countLikesByPost(postNo);

    Map<String, Object> result = new HashMap<>();
    result.put("liked", false);
    result.put("countLikes", countLikes);

    return result;
  }

  // 게시글 좋아요 여부 검사
  public int isPostLiked(Long postNo, String userId) {
    Map<String, Object> params = new HashMap<>();

    params.put("postNo", postNo);
    params.put("userId", userId);

    return likesDao.isPostLiked(params);
  }

  // 댓글 좋아요 추가
  @Override
  public Map<String, Object> addCmtLike(Long cmtNo, String userId) {
    Map<String, Object> params = new HashMap<>();

    params.put("cmtNo", cmtNo);
    params.put("userId", userId);

    likesDao.insertCmtLikes(params);

    int countLikes = likesDao.countLikesByCmt(cmtNo);

    Map<String, Object> result = new HashMap<>();
    result.put("liked", true);
    result.put("countLikes", countLikes);

    return result;
  }

  // 댓글 좋아요 삭제
  @Override
  public Map<String, Object> deleteCmtLike(Long cmtNo, String userId) {
    Map<String, Object> params = new HashMap<>();

    params.put("cmtNo", cmtNo);
    params.put("userId", userId);

    likesDao.deleteCmtLike(params);

    int countLikes = likesDao.countLikesByCmt(cmtNo);

    Map<String, Object> result = new HashMap<>();
    result.put("liked", false);
    result.put("countLikes", countLikes);

    return result;
  }

  // 댓글 좋아요 여부 검사
  public int isCmtLiked(Long postNo, String userId) {
    Map<String, Object> params = new HashMap<>();

    params.put("postNo", postNo);
    params.put("userId", userId);

    return likesDao.isCmtLiked(params);
  }

}
