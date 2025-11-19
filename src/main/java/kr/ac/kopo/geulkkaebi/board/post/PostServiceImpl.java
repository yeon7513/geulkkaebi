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
  public List<Posts> selectList(String boardType, String writer, boolean isReport) {
    Map<String, Object> params = new HashMap<>();

    params.put("boardType", boardType);
    params.put("writer", writer);
    params.put("isReport", isReport);

    return postDao.selectList(params);
  }

}
