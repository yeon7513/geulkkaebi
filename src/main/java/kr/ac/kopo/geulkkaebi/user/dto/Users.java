package kr.ac.kopo.geulkkaebi.user.dto;

import org.apache.ibatis.type.Alias;

@Alias("usersDto")
public class Users {
  private String id;
  private String pw;
  private String name;
  private String nickname;
  private String phone;
  private String email;
  private int grade;
  private int score;
  private String created_at;
  private String modified_at;
  private char report_yn;
  private char suspend_yn;
  private char admin_yn;
  private char delete_yn;

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
