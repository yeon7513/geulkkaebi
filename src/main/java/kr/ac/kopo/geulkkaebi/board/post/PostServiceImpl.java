package kr.ac.kopo.geulkkaebi.board.post;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

  @Autowired
  PostDao postDao;

  @Override
  public List<Posts> selectList(Long postNo, String boardType, String writer, boolean isReport) {
    Map<String, Object> params = new HashMap<>();

    params.put("postNo", postNo);
    params.put("boardType", boardType);
    params.put("writer", writer);
    params.put("isReport", isReport);

    return postDao.selectList(params);
  }

  @Override
  public List<Posts> selectPopularPosts() {
    return postDao.selectPopularPosts();
  }

  @Override
  public void increaseHitcount(Long postNo) {
    postDao.increaseHitcount(postNo);
  }

  @Override
  public void addLikeToPost(Long postNo, String userId) {
    Map<String, Object> params = new HashMap<>();
    params.put("table_name", "post_likes");
    params.put("identifier_number", postNo);
    params.put("user_id", userId);

    postDao.addLikeToPost(params);
  }

  @Override
  public int insert(Posts posts) {
    int result = postDao.insert(posts);

    if (result > 0) {
      Long longPostNo = posts.getPostNo();
      Integer postNo = longPostNo != null ? longPostNo.intValue() : null;

      return postNo;
    } else {
      return 0;
    }
  }



}
