package kr.ac.kopo.geulkkaebi.board.post;

import org.apache.ibatis.type.Alias;
import kr.ac.kopo.geulkkaebi.global.constants.BaseUrl;

@Alias("postsDto")
public class Posts {
  private Long postNo;
  private String boardType;
  private String writer;
  private String title;
  private String text;
  private int hitcount;
  private int noticeYn;
  private String createdAt;
  private String modifiedAt;
  private int reportYn;

  // JOIN용 컬럼 필드
  private String nickname;
  private String profileImg;
  private int grade;
  private int countLikes;
  private int countComments;

  // 좋아요 추가 및 삭제 확인용 필드
  private boolean isLiked;

  public boolean isLiked() {
    return isLiked;
  }

  public void setLiked(boolean isLiked) {
    this.isLiked = isLiked;
  }

  public int getGrade() {
    return grade;
  }

  public void setGrade(int grade) {
    this.grade = grade;
  }

  public String getProfileImg() {
    if (profileImg == null || profileImg.isEmpty()) {
      return null;
    }
    return BaseUrl.getImgUrl() + profileImg;
  }

  public void setProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

  public int getCountLikes() {
    return countLikes;
  }

  public void setCountLikes(int countLikes) {
    this.countLikes = countLikes;
  }

  public int getCountComments() {
    return countComments;
  }

  public void setCountComments(int countComments) {
    this.countComments = countComments;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

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

  public int getNoticeYn() {
    return noticeYn;
  }

  public void setNoticeYn(int noticeYn) {
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

  public int getReportYn() {
    return reportYn;
  }

  public void setReportYn(int reportYn) {
    this.reportYn = reportYn;
  }

}
