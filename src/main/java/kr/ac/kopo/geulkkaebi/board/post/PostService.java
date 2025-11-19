package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;

public interface PostService {

  List<Posts> selectList(String boardType, String writer, boolean isReport);

}
