package kr.ac.kopo.geulkkaebi.user;

import org.apache.ibatis.type.Alias;

@Alias("usersDto")
public class User {
  private String userId; // 회원 아이디 (PK)
  private String userPw; // 비밀번호
  private String name; // 회원 이름
  private String birth;
  private char gender;
  private String nickname; // 닉네임
  private String phone; // 연락처
  private String email; // 이메일
  private String profileImg; // 프로필 사진 경로
  private int grade; // 회원 등급
  private int score; // 퀴즈 점수
  private int reportYn; // 신고 여부
  private int suspendYn; // 정지(제재) 여부
  private int adminYn; // 관리자 여부
  private int deleteYn; // 탈퇴 여부
  private String createdAt; // 회원 가입일
  private String modifiedAt; // 정보 수정일

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getUserPw() {
    return userPw;
  }

  public void setUserPw(String userPw) {
    this.userPw = userPw;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getBirth() {
    return birth;
  }

  public void setBirth(String birth) {
    this.birth = birth;
  }

  public char getGender() {
    return gender;
  }

  public void setGender(char gender) {
    this.gender = gender;
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

  public int getReportYn() {
    return reportYn;
  }

  public void setReportYn(int reportYn) {
    this.reportYn = reportYn;
  }

  public int getSuspendYn() {
    return suspendYn;
  }

  public void setSuspendYn(int suspendYn) {
    this.suspendYn = suspendYn;
  }

  public int getAdminYn() {
    return adminYn;
  }

  public void setAdminYn(int adminYn) {
    this.adminYn = adminYn;
  }

  public int getDeleteYn() {
    return deleteYn;
  }

  public void setDeleteYn(int deleteYn) {
    this.deleteYn = deleteYn;
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


}
