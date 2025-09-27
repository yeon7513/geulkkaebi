package kr.ac.kopo.geulkkaebi.user.dto;

import org.apache.ibatis.type.Alias;
import kr.ac.kopo.geulkkaebi.grobal.constants.Whether;

@Alias("usersDto")
public class Users {
  private Long userNo; // 회원 식별 번호
  private String id; // 회원 아이디
  private String pw; // 회원 비밀번
  private String name; // 회원 이름
  private String nickname; // 회원 닉네임
  private String phone; // 회원 연락처
  private String email; // 회원의 이메일
  private String profile_img; // 회원의 프로필 사진
  private int grade; // 회원 등급
  private int score; // 회원이 푼 퀴즈들의 점수
  private String created_at; // 가입한 날짜
  private String modified_at; // 개인정보를 수정한 날짜
  private char report_yn = Whether.NO; // 신고 여부
  private char suspend_yn = Whether.NO; // 정지 여부
  private char admin_yn = Whether.NO; // 관리자 여부
  private char delete_yn = Whether.NO; // 삭제 여부

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

  public String getProfile_img() {
    return profile_img;
  }

  public void setProfile_img(String profile_img) {
    this.profile_img = profile_img;
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

  public String getCreated_at() {
    return created_at;
  }

  public void setCreated_at(String created_at) {
    this.created_at = created_at;
  }

  public String getModified_at() {
    return modified_at;
  }

  public void setModified_at(String modified_at) {
    this.modified_at = modified_at;
  }

  public char getReport_yn() {
    return report_yn;
  }

  public void setReport_yn(char report_yn) {
    this.report_yn = report_yn;
  }

  public char getSuspend_yn() {
    return suspend_yn;
  }

  public void setSuspend_yn(char suspend_yn) {
    this.suspend_yn = suspend_yn;
  }

  public char getAdmin_yn() {
    return admin_yn;
  }

  public void setAdmin_yn(char admin_yn) {
    this.admin_yn = admin_yn;
  }

  public char getDelete_yn() {
    return delete_yn;
  }

  public void setDelete_yn(char delete_yn) {
    this.delete_yn = delete_yn;
  }



}
