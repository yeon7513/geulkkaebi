package kr.ac.kopo.geulkkaebi.global.constants;

// 경로 캡슐화
public class BaseUrl {
  private static final String IMG_URL = "http://localhost:8090/images";
  private static final String BASE_UPLOAD_PATH = "D:/2507110307/spring/spring-project/uploads";
  private static final String NAVER_BOOK_API_URL =
      "https://openapi.naver.com/v1/search/book_adv.xml?";

  public static String getImgUrl() {
    return IMG_URL;
  }

  public static String getBaseUploadPath() {
    return BASE_UPLOAD_PATH;
  }

  public static String getNaverBookApiUrl() {
    return NAVER_BOOK_API_URL;
  }

}
