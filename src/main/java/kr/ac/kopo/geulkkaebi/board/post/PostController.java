package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {

  @Autowired
  private PostService postService;

  @GetMapping("/list")
  public List<Posts> displayPostList(@RequestParam String boardType,
      @RequestParam(required = false) String writer,
      @RequestParam(required = false, defaultValue = "false") boolean isReport) {
    return postService.selectList(boardType, writer, isReport);
  }



}
