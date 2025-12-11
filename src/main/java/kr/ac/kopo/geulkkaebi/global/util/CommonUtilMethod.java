package kr.ac.kopo.geulkkaebi.global.util;

public class CommonUtilMethod {

  // 난이도 기반 점수 계산
  public static int calculateScore(double difficulty) {
    if (difficulty <= 10) {
      return 5;
    } else if (difficulty <= 30) {
      return 4;
    } else if (difficulty <= 50) {
      return 4;
    } else if (difficulty <= 70) {
      return 4;
    } else {
      return 1;
    }
  }

}
