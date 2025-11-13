package kr.ac.kopo.geulkkaebi.user;

import org.apache.ibatis.type.Alias;
import kr.ac.kopo.geulkkaebi.grobal.constants.Whether;

@Alias("usersDto")
public class User {
  private Long userNo; // 회원 식별 번호
  private String id; // 회원 아이디
  private String pw; // 회원 비밀번
  private String name; // 회원 이름
  private String nickname; // 회원 닉네임
  private String phone; // 회원 연락처
  private String email; // 회원의 이메일
  private String profileImg; // 회원의 프로필 사진
  private int grade; // 회원 등급
  private int score; // 회원이 푼 퀴즈들의 점수
  private String createdAt; // 가입한 날짜
  private String modifiedDate; // 개인정보를 수정한 날짜
  private String reportYn = Whether.NO; // 신고 여부
  private String suspendYn = Whether.NO; // 정지 여부
  private String adminYn = Whether.NO; // 관리자 여부
  private String deleteYn = Whether.NO; // 삭제 여부

  public Long getUserNo() {
    return userNo;
  }

  public void setUserNo(Long userNo) {
    this.userNo = userNo;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getPw() {
    return pw;
  }

  public void setPw(String pw) {
    this.pw = pw;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
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

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getModifiedDate() {
    return modifiedDate;
  }

  public void setModifiedDate(String modifiedDate) {
    this.modifiedDate = modifiedDate;
  }

  public String getReportYn() {
    return reportYn;
  }

  public void setReportYn(String reportYn) {
    this.reportYn = reportYn;
  }

  public String getSuspendYn() {
    return suspendYn;
  }

  public void setSuspendYn(String suspendYn) {
    this.suspendYn = suspendYn;
  }

  public String getAdminYn() {
    return adminYn;
  }

  public void setAdminYn(String adminYn) {
    this.adminYn = adminYn;
  }

  public String getDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(String deleteYn) {
    this.deleteYn = deleteYn;
  }

}
