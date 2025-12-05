package kr.ac.kopo.geulkkaebi.board.post;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.global.likes.LikesService;
import kr.ac.kopo.geulkkaebi.user.UserService;

@Service
public class PostServiceImpl implements PostService {

  @Autowired
  PostDao postDao;

  @Autowired
  UserService userService;

  @Autowired
  LikesService likeService;

  // 전체 게시글 조회
  @Override
  public Map<String, Object> selectList(String boardType, int page, int size) {
    // 페이지네이션 수식
    int offset = (page - 1) * size;

    Map<String, Object> params = new HashMap<>();

    params.put("boardType", boardType);
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
    response.put("postList", result);
    response.put("totalPosts", totalPosts);
    response.put("totalPages", totalPages);

    return response;

  }

  // 단일 게시글 조회
  @Override
  public Map<String, Object> getPostDetail(String userId, Long postNo, String boardType) {
    Map<String, Object> result = new HashMap<>();

    // 단일 게시글 조회
    Posts postItem = postDao.selectPostDetail(postNo);

    // 좋아요 여부 검사
    boolean isLiked = userId == null ? false : likeService.isPostLiked(postNo, userId) > 0;
    postItem.setLiked(isLiked);

    // 이전, 다음글 조회를 위한 파라미터를 하나로 합침
    // SqlSession에는 하나의 전달값만 필요함.
    Map<String, Object> params = new HashMap<>();
    params.put("postNo", postNo);
    params.put("boardType", boardType);

    // 이전 게시글 정보 조회
    Posts prevPost = postDao.selectPrevPost(params);

    // 다음 게시글 정보 조회
    Posts nextPost = postDao.selectNextPost(params);

    // 전체 추가 후 반환
    result.put("postItem", postItem);
    result.put("prevPost", prevPost);
    result.put("nextPost", nextPost);

    return result;
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
