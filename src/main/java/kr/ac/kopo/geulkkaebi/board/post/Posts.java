package kr.ac.kopo.geulkkaebi.board.post;

import org.apache.ibatis.type.Alias;

@Alias("postsDto")
public class Posts {
  private Long postNo;
  private String boardType;
  private String writer;
  private String title;
  private String text;
  private int hitcount;
  private char noticeYn;
  private String createdAt;
  private String modifiedAt;
  private char reportYn;

  public Long getPostNo() {
    return postNo;
  }

  public void setPostNo(Long postNo) {
    this.postNo = postNo;
  }

  public String getBoardType() {
    return boardType;
  }

  public void setBoardType(String boardType) {
    this.boardType = boardType;
  }

  public String getWriter() {
    return writer;
  }

  public void setWriter(String writer) {
    this.writer = writer;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public int getHitcount() {
    return hitcount;
  }

  public void setHitcount(int hitcount) {
    this.hitcount = hitcount;
  }

  public char getNoticeYn() {
    return noticeYn;
  }

  public void setNoticeYn(char noticeYn) {
    this.noticeYn = noticeYn;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getModifiedAt() {
    return modifiedAt;
  }

  public void setModifiedAt(String modifiedAt) {
    this.modifiedAt = modifiedAt;
  }

  public char getReportYn() {
    return reportYn;
  }

  public void setReportYn(char reportYn) {
    this.reportYn = reportYn;
  }

}
