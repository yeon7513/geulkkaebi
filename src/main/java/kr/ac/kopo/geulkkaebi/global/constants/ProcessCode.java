package kr.ac.kopo.geulkkaebi.global.constants;

// 처리 완료 코드
public class ProcessCode {

  // 퀴즈 오류
  public static class QuizErrorCode {
    // 수정: 오류의 내용을 확인 후 수정함
    public static final String MODIFY = "modify";

    // 기각: 사실 확인 했으나 오류가 없음
    public static final String DISMISS = "dismiss";

    // 중복: 신고가 중복됨 -> 오류를 해결하고 있는 관리자에게 위임
    public static final String DUPLICATED = "duplicated";

  }

  // 회원 신고
  public static class UserReportCode {
    // 제재: 사실 확인 후 회원에게 제재를 가함
    public static final String PENALTY = "penalty";

    // 기각: 악의적으로 신고 또는 사실 확인 했으나 문제가 없음
    // 단, 악의적으로 신고한 경우에는 신고자에게 제재를 가함
    public static final String DISMISS = "dismiss";

    // 중복: 신고가 중복됨 -> 신고를 해결하고 있는 관리자에게 위임
    public static final String DUPLICATED = "duplicated";
  }
}
