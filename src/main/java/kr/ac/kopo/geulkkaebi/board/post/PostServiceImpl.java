package kr.ac.kopo.geulkkaebi.board.post;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.user.UserService;

@Service
public class PostServiceImpl implements PostService {

  @Autowired
  PostDao postDao;

  @Autowired
  UserService userService;

  @Override
  public Map<String, Object> selectList(Long postNo, String boardType, String writer,
      boolean isReport, int page, int size) {
    // 페이지네이션 수식
    int offset = (page - 1) * size;

    Map<String, Object> params = new HashMap<>();

    params.put("postNo", postNo);
    params.put("boardType", boardType);
    params.put("writer", writer);
    params.put("isReport", isReport);
    params.put("offset", offset);
    params.put("limit", offset + size);

    // 공지글 먼저 조회
    List<Posts> noticePosts = postDao.selectNoticeList(boardType);

    // 일반 게시글 조회
    List<Posts> normalPosts = postDao.selectNormalList(params);

    // 합쳐서 반환
    List<Posts> result = new ArrayList<>();
    result.addAll(noticePosts);
    result.addAll(normalPosts);

    int totalPosts = postDao.countNormalPosts(boardType);
    int totalPages = (int) Math.ceil((double) totalPosts / size);

    Map<String, Object> response = new HashMap<>();
    response.put("posts", result);
    response.put("totalPosts", totalPosts);
    response.put("totalPages", totalPages);

    return response;

  }

  // 오늘의 인기글 조회
  @Override
  public List<Posts> selectPopularPosts() {
    return postDao.selectPopularPosts();
  }

  // 조회수 증가
  @Override
  public void increaseHitcount(Long postNo) {
    postDao.increaseHitcount(postNo);
  }

  // 좋아요 증가
  @Override
  public void addLikeToPost(Long postNo, String userId) {
    Map<String, Object> params = new HashMap<>();
    params.put("table_name", "post_likes");
    params.put("identifier_number", postNo);
    params.put("user_id", userId);

    postDao.addLikeToPost(params);
  }

  // 게시글 등록
  @Override
  public int insert(Posts posts) {
    int result = postDao.insert(posts);

    if (result > 0) {
      String writerId = posts.getWriter();

      userService.updateUserGrade(writerId);

      Long longPostNo = posts.getPostNo();
      Integer postNo = longPostNo != null ? longPostNo.intValue() : null;

      return postNo;
    } else {
      return 0;
    }
  }



}
