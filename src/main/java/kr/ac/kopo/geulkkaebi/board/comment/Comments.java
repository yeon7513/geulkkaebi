package kr.ac.kopo.geulkkaebi.board.comment;

import org.apache.ibatis.type.Alias;

@Alias("commentsDto")
public class Comments {
  private Long cmtNo;
  private Long postNo;
  private String writer;
  private String text;
  private String createdAt;
  private String modifiedAt;

  // JOIN용 컬럼 필드
  private String nickname;
  private String profileImg;
  private int grade;
  private int countLikes;

  // 좋아요 추가 및 삭제 확인용 필드
  private boolean isLiked;

  public boolean isLiked() {
    return isLiked;
  }

  public void setLiked(boolean isLiked) {
    this.isLiked = isLiked;
  }

  public Long getCmtNo() {
    return cmtNo;
  }

  public void setCmtNo(Long cmtNo) {
    this.cmtNo = cmtNo;
  }

  public Long getPostNo() {
    return postNo;
  }

  public void setPostNo(Long postNo) {
    this.postNo = postNo;
  }

  public String getWriter() {
    return writer;
  }

  public void setWriter(String writer) {
    this.writer = writer;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
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

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public String getProfileImg() {
    return profileImg;
  }

  public void setProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

  public int getGrade() {
    return grade;
  }

  public void setGrade(int grade) {
    this.grade = grade;
  }

  public int getCountLikes() {
    return countLikes;
  }

  public void setCountLikes(int countLikes) {
    this.countLikes = countLikes;
  }



}
